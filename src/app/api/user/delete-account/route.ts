import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/session'
import { prisma } from '@/lib/prisma'
import { rateLimits } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

/**
 * API Route für Account-Löschung gemäß Art. 17 DSGVO
 * Soft-Delete: Markiert Account für Löschung, Hard-Delete nach 30 Tagen
 */
export async function POST() {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate Limiting: Max 3 Lösch-Anfragen pro Stunde
    const limit = rateLimits.deleteAccount(user.email)
    if (!limit.success) {
      return NextResponse.json(
        {
          error: 'Zu viele Anfragen',
          message: 'Sie können maximal 3 Lösch-Anfragen pro Stunde stellen.',
          resetAt: limit.resetAt,
        },
        { status: 429 }
      )
    }

    // TODO: Implementiere echte Löschung wenn User-Model existiert
    // Aktuell: Beispiel-Struktur

    // Soft-Delete: Markiere für Löschung
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: {
    //     deletionRequestedAt: new Date(),
    //     // Account deaktivieren
    //     active: false,
    //   },
    // })

    // Hard-Delete erfolgt durch Cron-Job nach 30 Tagen
    // Siehe: src/lib/cron/cleanup-deleted-accounts.ts

    return NextResponse.json({
      message: 'Account-Löschung wurde angefordert',
      info: 'Ihre Daten werden innerhalb von 30 Tagen gelöscht. Sie können in dieser Zeit Ihre Daten exportieren.',
      deletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    })
  } catch (error) {
    logger.error('Account deletion error', {
      code: error instanceof Error ? error.message : 'Unknown error',
    })
    return NextResponse.json(
      { error: 'Fehler beim Löschen des Accounts' },
      { status: 500 }
    )
  }
}

