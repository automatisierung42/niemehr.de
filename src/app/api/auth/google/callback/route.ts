import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/auth/session'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = 'http://localhost:3000/api/auth/google/callback'

interface GoogleTokenResponse {
  access_token: string
  expires_in: number
  refresh_token?: string
  scope: string
  token_type: string
  id_token?: string
}

interface GoogleUserInfo {
  id: string
  email: string
  verified_email: boolean
  name: string
  picture: string
  given_name: string
  family_name: string
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    // Check for OAuth error
    if (error) {
      console.error('OAuth error:', error)
      return NextResponse.redirect(
        new URL('/?error=auth_failed', request.url)
      )
    }

    // Validate required parameters
    if (!code || !state) {
      console.error('Missing code or state parameter')
      return NextResponse.redirect(
        new URL('/?error=auth_failed', request.url)
      )
    }

    // Verify state (CSRF protection)
    const cookieStore = await request.cookies
    const storedState = cookieStore.get('oauth_state')?.value
    
    if (!storedState || storedState !== state) {
      console.error('Invalid state parameter')
      return NextResponse.redirect(
        new URL('/?error=auth_failed', request.url)
      )
    }

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      console.error('Missing Google OAuth credentials')
      return NextResponse.redirect(
        new URL('/?error=auth_failed', request.url)
      )
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('Token exchange failed:', errorText)
      return NextResponse.redirect(
        new URL('/?error=auth_failed', request.url)
      )
    }

    const tokenData: GoogleTokenResponse = await tokenResponse.json()

    // Get user info from Google
    const userInfoResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    )

    if (!userInfoResponse.ok) {
      console.error('Failed to fetch user info')
      return NextResponse.redirect(
        new URL('/?error=auth_failed', request.url)
      )
    }

    const userInfo: GoogleUserInfo = await userInfoResponse.json()

    // Erstelle oder finde User in der Datenbank
    const { prisma } = await import('@/lib/prisma')
    
    const user = await prisma.user.upsert({
      where: { email: userInfo.email },
      update: {
        name: userInfo.name,
        image: userInfo.picture,
      },
      create: {
        email: userInfo.email,
        name: userInfo.name,
        image: userInfo.picture,
      },
    })

    // Create session mit DB User ID
    const sessionToken = createSession({
      id: user.id, // Verwende DB ID, nicht Google ID!
      email: user.email,
      name: user.name || userInfo.name,
      picture: user.image || userInfo.picture,
    })

    // Set session cookie and redirect
    const response = NextResponse.redirect(
      new URL('/dashboard', request.url)
    )
    
    // Set session cookie
    response.cookies.set('niemehr_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    
    // Clear OAuth state cookie
    response.cookies.delete('oauth_state')

    return response
  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.redirect(
      new URL('/?error=auth_failed', request.url)
    )
  }
}

