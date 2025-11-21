import { NextRequest, NextResponse } from 'next/server'
import { handleGoogleCallback } from '@/lib/google/oauth'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const businessId = searchParams.get('state')
  const errorParam = searchParams.get('error')

  if (errorParam) {
    return NextResponse.redirect(`${origin}/dashboard?googleError=${encodeURIComponent(errorParam)}`)
  }

  if (!code || !businessId) {
    return NextResponse.redirect(`${origin}/dashboard?googleError=missing_params`)
  }

  try {
    await handleGoogleCallback(code, businessId)
    return NextResponse.redirect(`${origin}/dashboard?google=connected`)
  } catch (error) {
    const message = (error as Error).message ?? 'callback_failed'
    return NextResponse.redirect(`${origin}/dashboard?googleError=${encodeURIComponent(message)}`)
  }
}

