import { google } from 'googleapis'
import { prisma } from '@/lib/prisma'

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

function ensureEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`)
  }
  return value
}

function createOAuthClient() {
  const clientId = ensureEnv('GOOGLE_CLIENT_ID')
  const clientSecret = ensureEnv('GOOGLE_CLIENT_SECRET')
  const redirectUri = ensureEnv('GOOGLE_REDIRECT_URI')

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri)
}

export function getGoogleAuthUrl(businessId: string) {
  const oauth2Client = createOAuthClient()
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: GOOGLE_SCOPES,
    state: businessId,
  })

  return authUrl
}

export async function handleGoogleCallback(code: string, businessId: string) {
  const oauth2Client = createOAuthClient()
  const { tokens } = await oauth2Client.getToken(code)

  if (!tokens.access_token) {
    throw new Error('Failed to retrieve Google access token')
  }

  await prisma.business.update({
    where: { id: businessId },
    data: {
      googleAccessToken: tokens.access_token,
      googleRefreshToken: tokens.refresh_token ?? undefined,
      googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
    },
  })

  return tokens
}

export async function refreshGoogleToken(businessId: string) {
  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: {
      googleRefreshToken: true,
    },
  })

  if (!business?.googleRefreshToken) {
    throw new Error('No refresh token stored for business')
  }

  const oauth2Client = createOAuthClient()
  oauth2Client.setCredentials({
    refresh_token: business.googleRefreshToken,
  })

  const { credentials } = await oauth2Client.refreshAccessToken()

  await prisma.business.update({
    where: { id: businessId },
    data: {
      googleAccessToken: credentials.access_token ?? null,
      googleTokenExpiry: credentials.expiry_date ? new Date(credentials.expiry_date) : null,
    },
  })

  return credentials
}

