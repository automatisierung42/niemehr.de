import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Typ-Definitionen für den Request Body
interface SignaturePayload {
  signatureNames: string[];
  signatureStyle: 'friendly' | 'professional' | 'witty' | 'none';
  signatureTemplate: string;
}

// TODO: Implementiere echte Session-Authentifizierung
function getUserId(request: NextRequest): string | null {
  const userId = request.headers.get('x-user-id') || 
                 new URL(request.url).searchParams.get('userId');
  return userId;
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { signatureNames, signatureStyle, signatureTemplate }: SignaturePayload = await request.json();
    
    if (!signatureStyle) {
      return NextResponse.json({ error: 'Signature Style is required' }, { status: 400 });
    }

    // 1. Validierung der Daten
    const validNames = signatureNames.filter(name => name.trim().length > 0);
    
    // 2. Datenbank-Update
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        signatureNames: validNames,
        signatureStyle: signatureStyle,
        signatureTemplate: signatureTemplate,
        hasCompletedSignatureOnboarding: true, // WICHTIG: Onboarding abgeschlossen
      },
    });

    return NextResponse.json({ 
      message: 'Signatur erfolgreich gespeichert.', 
      user: { 
        id: updatedUser.id, 
        hasCompletedSignatureOnboarding: updatedUser.hasCompletedSignatureOnboarding 
      }
    });
  } catch (error: any) {
    console.error('Failed to save signature:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
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
        signatureNames: true,
        signatureStyle: true,
        signatureTemplate: true,
        hasCompletedSignatureOnboarding: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Failed to get signature:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

