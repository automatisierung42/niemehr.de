/**
 * API Route zum Aktualisieren des Kiez-Scores für ein Business
 * 
 * Wird beim Onboarding oder wenn Business-Daten aktualisiert werden aufgerufen.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateBusinessKiezScore, updateKiezScoreFromGooglePlaces } from '@/core/kiez/updateBusinessKiezScore';

export async function POST(request: NextRequest) {
  try {
    // 1. Request Body parsen
    const body = await request.json();
    const { businessId, businessData, googlePlacesData } = body;

    // 2. Validierung
    if (!businessId || typeof businessId !== 'string') {
      return NextResponse.json(
        { error: 'businessId is required' },
        { status: 400 }
      );
    }

    // 3. Prüfe ob Business existiert
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      select: { id: true },
    });

    if (!business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }

    // 5. Berechne und speichere Kiez-Score
    let kiezScore: number;
    
    if (googlePlacesData) {
      // Verwende Google Places Daten
      kiezScore = await updateKiezScoreFromGooglePlaces(businessId, googlePlacesData);
    } else if (businessData) {
      // Verwende übergebene Business-Daten
      kiezScore = await updateBusinessKiezScore(businessId, businessData);
    } else {
      // Versuche aus vorhandenen Business-Daten zu berechnen
      kiezScore = await updateBusinessKiezScore(businessId);
    }

    // 6. Erfolgreiche Response
    return NextResponse.json({
      success: true,
      kiezScore,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating Kiez-Score:', error);
    return NextResponse.json(
      {
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

