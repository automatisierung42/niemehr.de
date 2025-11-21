import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/session'

/**
 * API Route für Datenschutz-Einstellungen
 * GET: Abrufen der Einstellungen
 * POST: Aktualisieren der Einstellungen
 */
export async function GET() {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Implementiere echte Einstellungen wenn User-Model existiert
    // Aktuell: Beispiel-Struktur

    const settings = {
      smsNotifications: false, // Opt-in für SMS
      marketingEmails: false, // Opt-in für Marketing
      dataProcessingConsent: true, // Erforderlich für Service
      analyticsConsent: false, // Opt-in für Analytics
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Privacy settings error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Einstellungen' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // TODO: Implementiere echte Speicherung wenn User-Model existiert
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: {
    //     smsNotifications: body.smsNotifications,
    //     marketingEmails: body.marketingEmails,
    //     analyticsConsent: body.analyticsConsent,
    //   },
    // })

    return NextResponse.json({
      message: 'Einstellungen wurden aktualisiert',
      settings: body,
    })
  } catch (error) {
    console.error('Privacy settings update error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren der Einstellungen' },
      { status: 500 }
    )
  }
}

