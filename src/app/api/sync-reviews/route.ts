import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const MOCK_REVIEW_DATA = {
  googleReviewId: `mock_${Date.now()}`,
  authorName: 'Sarah K.',
  rating: 4,
  text: 'Der Chilicheeseburger war super, aber die dreckigen Sitzplätze haben uns den Appetit verdorben.',
  time: new Date(),
  kiSummary:
    'Sarah fand das Essen gut (Burger), war aber enttäuscht von der Sauberkeit (Sitze).',
  kiResponseText:
    'Das freut uns sehr mit dem Burger! Gleichzeitig tut es uns leid wegen der Sitze. Das haben wir sofort an unser Team weitergegeben. Beim nächsten Mal ist alles top!',
};

export async function GET() {
  try {
    const businessId = 'mock-business-id-123';
    console.log(`[DB] Suche nach Business ${businessId}...`);

    const newReview = await prisma.review.create({
      data: {
        ...MOCK_REVIEW_DATA,
        businessId,
        responseStatus: 'READY_TO_APPROVE',
      },
    });

    await prisma.business.update({
      where: { id: businessId },
      data: { lastSyncAt: new Date() },
    });

    console.log(`[DB] Review gespeichert. Status: ${newReview.responseStatus}`);

    return NextResponse.json({
      success: true,
      message: 'Review Sync erfolgreich simuliert.',
      reviewsAdded: 1,
      reviewData: newReview,
    });
  } catch (error) {
    console.error('Sync Error:', error);

    return NextResponse.json(
      { success: false, message: 'Fehler beim Sync.' },
      { status: 500 },
    );
  }
}

