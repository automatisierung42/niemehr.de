import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuthUrl } from '@/lib/google/oauth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get('businessId')

  if (!businessId) {
    return NextResponse.json(
      { error: 'businessId query parameter is required' },
      { status: 400 },
    )
  }

  try {
    const authUrl = getGoogleAuthUrl(businessId)
    return NextResponse.redirect(authUrl)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? 'Failed to generate Google OAuth URL' },
      { status: 500 },
    )
  }
}

