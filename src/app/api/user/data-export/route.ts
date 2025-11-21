import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/session'
import { prisma } from '@/lib/prisma'
import { rateLimits } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

/**
 * API Route für Datenexport gemäß Art. 15 DSGVO
 * Exportiert alle Daten des angemeldeten Users
 */
export async function GET() {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate Limiting: Max 10 Export-Anfragen pro Stunde
    const limit = rateLimits.dataExport(user.email)
    if (!limit.success) {
      return NextResponse.json(
        {
          error: 'Zu viele Anfragen',
          message: 'Sie können maximal 10 Export-Anfragen pro Stunde stellen.',
          resetAt: limit.resetAt,
        },
        { status: 429 }
      )
    }

    // TODO: Implementiere echte Datenabfrage wenn User-Model existiert
    // Aktuell: Beispiel-Struktur

    const exportData = {
      user: {
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
      businesses: [],
      reviews: [],
      responses: [],
      exportDate: new Date().toISOString(),
      format: 'JSON',
      version: '1.0',
    }

    // TODO: Wenn User-Model existiert:
    // const businesses = await prisma.business.findMany({
    //   where: { userId: user.id },
    //   include: {
    //     reviews: {
    //       include: {
    //         // Response-Daten falls vorhanden
    //       },
    //     },
    //   },
    // })

    return NextResponse.json(exportData, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="niemehr-datenexport-${Date.now()}.json"`,
      },
    })
  } catch (error) {
    logger.error('Data export error', {
      code: error instanceof Error ? error.message : 'Unknown error',
    })
    return NextResponse.json(
      { error: 'Fehler beim Export der Daten' },
      { status: 500 }
    )
  }
}

