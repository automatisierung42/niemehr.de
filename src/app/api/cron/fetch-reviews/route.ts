import { NextResponse } from 'next/server'

const CRON_HEADER = 'x-cron-secret'

export async function GET(request: Request) {
  const providedSecret = request.headers.get(CRON_HEADER)
  const expectedSecret = process.env.CRON_SECRET

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Placeholder logic – implemented in späteren Prompts
  return NextResponse.json({ success: true, processed: 0 })
}

