import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendSMS } from '@/lib/twilio';

// TODO: Implementiere echte Session-Authentifizierung
// Für jetzt: userId aus Header oder Query Parameter
function getUserId(request: NextRequest): string | null {
  // Beispiel: Header oder Query Parameter
  const userId = request.headers.get('x-user-id') || 
                 new URL(request.url).searchParams.get('userId');
  return userId;
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        autoPilotEnabled: true,
        autoPilotActivatedAt: true,
        autoRepliesCount: true,
        manualRepliesCount: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { enabled } = await request.json();

    // TODO: Check subscription (nur Pro Plan)
    // if (user.subscription !== 'pro') {
    //   return NextResponse.json({ error: 'Pro Plan required' }, { status: 403 });
    // }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        autoPilotEnabled: enabled,
        autoPilotActivatedAt: enabled ? new Date() : null,
      },
      include: {
        businesses: {
          select: { phoneNumber: true },
          take: 1,
        },
      },
    });

    // SMS Benachrichtigung
    if (enabled && user.businesses[0]?.phoneNumber) {
      await sendSMS({
        to: user.businesses[0].phoneNumber,
        body: `Auto-Pilot AN! 🚀



Ab jetzt antworten wir automatisch auf 4-5★ Reviews.



Kritische Reviews (≤3★ oder sensible Inhalte) kommen weiterhin zur Freigabe.



Du sparst ab jetzt ~3-5 Std/Woche.



niemehr.de`,
      });
    }

    return NextResponse.json({ success: true, enabled });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

