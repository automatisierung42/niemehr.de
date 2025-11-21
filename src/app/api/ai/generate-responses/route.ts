import { NextRequest, NextResponse } from 'next/server';
import { generateHardConstraintPrompt } from '@/lib/config/aiRules';
import { buildKiezPrompt } from '@/core/kiez/scoreEngine';
import { prisma } from '@/lib/prisma';
import { getContextualOpener } from '@/core/humanizers/openers';
import { generateSignature, getEasterEggSignature, detectBusinessType } from '@/core/humanizers/signatures';
import { getInvitationLine, getInvitationLineEnglish } from '@/core/humanizers/invitation';
import { detectBusinessCategory } from '@/core/business/categories';
import { detectEasterEggs, generateEasterEggResponse } from '@/core/humanizers/easterEggs';

// Anthropic (Claude) API Konfiguration - EINDEUTIG
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';

// Logging: API Key Status
if (!ANTHROPIC_API_KEY) {
  console.error('[ANTHROPIC CONFIG] ANTHROPIC_API_KEY ist nicht gesetzt. Verwende Mock-Antworten.');
} else {
  console.log('[ANTHROPIC CONFIG] API Key gefunden. Anthropic (Claude) wird verwendet.');
}

// Request Interface
interface GenerateResponsesRequest {
  reviewText: string;
  reviewRating: number;
  businessName: string;
  languageCode: string;
  businessId?: string; // Optional: Für Kiez-Score Lookup
  signatureNames?: string[]; // Optional: Namen für Signatur
  businessType?: string; // Optional: Business-Typ für Signatur-Generierung
  placeTypes?: string[]; // Optional: Google Place Types für Kategorie-Erkennung
}

// Response Interface
interface GenerateResponsesResponse {
  responses: {
    friendly: string;
    professional: string;
    witty: string;
  };
}

// Claude API Request Interface
interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeRequest {
  model: string;
  max_tokens: number;
  messages: ClaudeMessage[];
}

// Claude API Response Interface
interface ClaudeResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
  stop_reason?: string;
  error?: {
    message: string;
    type: string;
  };
}

// Helper: Generiere Mock-Antworten (Fallback)
function generateMockResponse(
  reviewText: string,
  reviewRating: number,
  businessName: string,
  tone: 'friendly' | 'professional' | 'witty'
): string {
  const isPositive = reviewRating >= 4;
  const isNegative = reviewRating <= 2;
  
  // Kürze Review-Text für Kontext (max 50 Zeichen)
  const reviewPreview = reviewText.length > 50 
    ? reviewText.substring(0, 50) + '...' 
    : reviewText;

  if (tone === 'friendly') {
    if (isPositive) {
      return `Vielen Dank für dein tolles Feedback! 🙏 Es freut uns riesig, dass dir ${businessName} so gut gefallen hat. Wir freuen uns auf deinen nächsten Besuch!`;
    } else if (isNegative) {
      return `Das tut uns wirklich leid, dass du nicht zufrieden warst. 😔 Wir nehmen dein Feedback sehr ernst und würden gerne mit dir sprechen, um es besser zu machen. Bitte melde dich bei uns!`;
    } else {
      return `Danke für dein Feedback! 😊 Wir schätzen jeden Kommentar und arbeiten kontinuierlich daran, ${businessName} zu verbessern.`;
    }
  }

  if (tone === 'professional') {
    if (isPositive) {
      return `Sehr geehrte/r ${reviewPreview ? 'Kunde/in' : 'Besucher/in'}, vielen Dank für Ihre positive Bewertung. Wir freuen uns, dass Sie mit unserem Service zufrieden waren und hoffen, Sie bald wieder bei ${businessName} begrüßen zu dürfen. Mit freundlichen Grüßen`;
    } else if (isNegative) {
      return `Sehr geehrte/r Kunde/in, wir bedauern sehr, dass Sie nicht zufrieden waren. Bitte kontaktieren Sie uns direkt, damit wir Ihre Anliegen persönlich besprechen und eine Lösung finden können. Mit freundlichen Grüßen, Ihr Team von ${businessName}`;
    } else {
      return `Vielen Dank für Ihre Bewertung. Wir nehmen jedes Feedback ernst und nutzen es zur kontinuierlichen Verbesserung unseres Services. Mit freundlichen Grüßen, ${businessName}`;
    }
  }

  // witty
  if (isPositive) {
    return `Wow, ${reviewRating} Sterne! 🎉 Das macht uns richtig glücklich! Danke, dass du ${businessName} so toll findest. Bis zum nächsten Mal! 😄`;
  } else if (isNegative) {
    return `Oh nein, das tut uns wirklich leid! 😅 Wir wollen es beim nächsten Mal besser machen. Lass uns reden – wir finden bestimmt eine Lösung! 💪`;
  } else {
    return `Danke für dein Feedback! 👍 Wir arbeiten daran, ${businessName} noch besser zu machen. Schau gerne wieder vorbei! 😊`;
  }
}

// Helper: Berechne dynamische Länge basierend auf Review-Länge
function calculateTargetLength(reviewWordCount: number): { min: number; max: number } {
  if (reviewWordCount === 0) {
    return { min: 8, max: 18 };
  } else if (reviewWordCount <= 30) {
    return { min: 20, max: 40 };
  } else if (reviewWordCount <= 60) {
    return { min: 35, max: 55 };
  } else {
    return { min: 50, max: 70 };
  }
}

// Helper: Zähle Wörter in Text
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Helper: Prüfe ob Sprache DE oder EN ist
function isGermanOrEnglish(languageCode: string): boolean {
  const code = languageCode.toLowerCase();
  return code === 'de' || code === 'en';
}

// Helper: Generiere Antwort für einen bestimmten Ton
async function generateResponseForTone(
  reviewText: string,
  reviewRating: number,
  businessName: string,
  languageCode: string,
  tone: 'friendly' | 'professional' | 'witty',
  kiezScore?: number, // Optional: Kiez-Score für Lokalkolorit-Anpassung
  signatureNames?: string[], // Optional: Namen für Signatur
  businessType?: string, // Optional: Business-Typ
  placeTypes?: string[] // Optional: Google Place Types
): Promise<string> {
  const reviewWordCount = countWords(reviewText);
  const targetLength = calculateTargetLength(reviewWordCount);
  const needsEnglishTag = !isGermanOrEnglish(languageCode);
  const isNegative = reviewRating <= 3;
  const isPositive = reviewRating >= 4;
  const isStarsOnly = reviewWordCount === 0;
  
  // Hard-Constraints einbinden (höchste Priorität)
  const hardConstraints = generateHardConstraintPrompt(languageCode);
  
  // Kiez-Score Prompt hinzufügen (falls verfügbar)
  const kiezPrompt = kiezScore !== undefined ? buildKiezPrompt(kiezScore) : '';
  
  // Opener generieren (falls Kiez-Score verfügbar)
  const opener = kiezScore !== undefined ? getContextualOpener(kiezScore, isPositive) : '';
  
  // Signatur generieren (falls Kiez-Score verfügbar)
  const signature = kiezScore !== undefined 
    ? generateSignature(kiezScore, businessName, businessType, signatureNames || [])
    : '';
  
  // Easter Egg: Spezielle Signaturen für hohe Scores
  const easterEggSignature = kiezScore !== undefined && kiezScore >= 80
    ? getEasterEggSignature(detectBusinessType(businessName, businessType), kiezScore, signatureNames || [])
    : null;
  
  const finalSignature = easterEggSignature || signature;
  
  // Easter Egg: "bester Döner ever" Detection
  const hasBesterDoenerEver = reviewText.toLowerCase().includes('bester') && 
    (reviewText.toLowerCase().includes('döner') || reviewText.toLowerCase().includes('kebab'));
  
  // Business-Kategorie erkennen für passende Einladung
  const businessCategory = detectBusinessCategory(businessName, body.placeTypes);
  const invitationLine = kiezScore !== undefined
    ? (languageCode.toLowerCase() === 'en' 
        ? getInvitationLineEnglish(businessCategory, kiezScore, isPositive)
        : getInvitationLine(businessCategory, kiezScore, isPositive))
    : '';
  
  const prompt = `Du bist die psychologische Review-Antwort-Engine von niemehr.de für "${businessName}".

Review: ${reviewRating} Sterne
"${reviewText}"

${hardConstraints}
${kiezPrompt}
ABSOLUTE REGELN (keine Ausnahme):

1. SPRACHE: Deine gesamte Antwort MUSS exakt in der Sprache der Original-Review verfasst werden (ISO-Code: ${languageCode}).
   - Deutsch → Deutsch, Türkisch → Türkisch, Arabisch → Arabisch, Polnisch → Polnisch, Englisch → Englisch, Russisch → Russisch, Spanisch → Spanisch usw.
   - Diese Regel hat ABSOLUTE PRIORITÄT über alle anderen Einstellungen!

2. ENGLISCHER TAG: ${needsEnglishTag ? `Wenn die Review NICHT auf Deutsch oder Englisch ist → am Ende einen kurzen englischen Einzeiler (max. 10 Wörter) hinzufügen, der den Kern der Review zusammenfasst.
   Beispiele: türkische Review über "sos" → "Yes, our sauces are delicious!", arabische Review über "الضيافة" → "Thank you for loving our hospitality!"` : 'NICHT anwenden - Review ist auf Deutsch oder Englisch'}

3. LÄNGE: Dynamisch an Review-Länge anpassen:
   - Review hat ${reviewWordCount} Wörter
   - Ziel: ${targetLength.min}-${targetLength.max} Wörter Antwort
   - NIEMALS länger als das 1,5-fache der Original-Review (max ${Math.ceil(reviewWordCount * 1.5)} Wörter)

4. STRUKTUR (immer exakt):
   ${opener ? `- OPENER: Beginne mit: "${opener}"` : '- Satz 1: Emotion des Kunden spiegeln (Dank oder Empathie)'}
   - Satz 2: Wertschätzung zeigen ODER konkrete Lösung nennen
   ${easterEggResponse ? `- EASTER EGG: Review enthält "${easterEgg.type}" → Verwende diese Antwort: "${easterEggResponse}"` : ''}
   ${invitationLine ? `- EINLADUNG: Verwende diese Einladungs-Zeile: "${invitationLine}"` : '- Satz 3 (falls Platz): persönliche Einladung (NICHT "Come back soon" bei Behörden/Anwälten/Bestattern!)'}
   ${finalSignature ? `- SIGNATUR: Beende mit: "${finalSignature}"` : '- Signatur: echter Vorname oder "& Team"'}
   
   WICHTIG: 
   - Die Einladungs-Zeile ist bereits passend für die Business-Kategorie gewählt. Verwende sie EXAKT so.
   - Bei Easter Eggs: Integriere die Easter Egg Antwort natürlich in den Textfluss.

5. TON: 90% warm & freundlich, 10% professionell – niemals steif, abweisend oder belehrend

6. EMOJI: Genau 1 Emoji pro Antwort (😊 🙂 😄 😉 – passend zur Stimmung)

7. UNTERSCHRIFT: Immer echter Vorname oder "& Team" (z.B. "Dr. Müller & Team", "Dein Max", "Deine Sarah")

8. SPEZIALFÄLLE:
   ${isNegative ? '- 1-3 Sterne: Empathie zuerst + konkrete Lösung + persönlicher Kontakt ("Ich rufe dich an", "Komm gerne vorbei")' : ''}
   ${isStarsOnly ? '- Nur Sterne: ultra-kurz, aber herzlich (keine Überladung)' : ''}
   - Irrelevante Reviews ("Burger" beim Zahnarzt etc.): leichter, freundlicher Humor + zurück zum echten Service

9. VERBOTEN:
   - Rechtfertigen, streiten, "Leider", "Bedauerlicherweise", "Tut mir leid, dass..." ohne konkrete Maßnahme
   - Mehr als 1 Emoji
   - Generische Floskeln ("Ihr Feedback ist uns wichtig")
   - Englische Hauptantwort bei nicht-englischen Reviews

10. AUSGABE: Antworte NUR mit der fertigen Antwort – kein zusätzlicher Text, keine Anführungszeichen, keine Erklärung, keine Markierung.

Antwort:`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API Error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.content[0]?.text || '';
    
    return generatedText.replace(/^["']|["']$/g, '').trim();
  } catch (error) {
    console.error(`Error generating ${tone} response:`, error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  // Variablen für Error Handler (außerhalb try-catch)
  let reviewText = '';
  let reviewRating = 3;
  let businessName = 'Unser Business';
  let languageCode = 'de';

  try {
    // 1. Request Body parsen
    const body: GenerateResponsesRequest = await request.json();
    reviewText = body.reviewText;
    reviewRating = body.reviewRating;
    businessName = body.businessName;
    languageCode = body.languageCode;

    // 2. Validierung: Alle Parameter vorhanden?
    if (!reviewText || typeof reviewText !== 'string' || reviewText.trim() === '') {
      return NextResponse.json(
        { error: 'reviewText is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (
      !reviewRating ||
      typeof reviewRating !== 'number' ||
      reviewRating < 1 ||
      reviewRating > 5 ||
      !Number.isInteger(reviewRating)
    ) {
      return NextResponse.json(
        { error: 'reviewRating is required and must be an integer between 1 and 5' },
        { status: 400 }
      );
    }

    if (
      !businessName ||
      typeof businessName !== 'string' ||
      businessName.trim() === ''
    ) {
      return NextResponse.json(
        { error: 'businessName is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!languageCode || typeof languageCode !== 'string') {
      return NextResponse.json(
        { error: 'languageCode is required' },
        { status: 400 }
      );
    }

    // 3. Generiere Antworten mit Fallback auf Mock
    let friendly: string;
    let professional: string;
    let witty: string;
    let usedMock = false;

    // Lade Kiez-Score und User-Daten aus Business (falls businessId vorhanden)
    let kiezScore: number | undefined = undefined;
    let signatureNames: string[] = body.signatureNames || [];
    let businessType: string | undefined = body.businessType;
    
    if (body.businessId) {
      try {
        const business = await prisma.business.findUnique({
          where: { id: body.businessId },
          select: { 
            kiezScore: true,
            userId: true,
          },
        });
        kiezScore = business?.kiezScore ?? undefined;
        
        // Lade User-Daten für Signaturen (falls userId vorhanden)
        if (business?.userId && signatureNames.length === 0) {
          try {
            const user = await prisma.user.findUnique({
              where: { id: business.userId },
              select: { signatureNames: true },
            });
            signatureNames = user?.signatureNames || [];
          } catch (error) {
            console.warn('[AI GENERATION] Konnte User-Daten nicht laden:', error);
          }
        }
      } catch (error) {
        console.warn('[AI GENERATION] Konnte Business-Daten nicht laden:', error);
        // Weiter ohne Kiez-Score
      }
    }

    // Versuche echte Anthropic (Claude) KI-Antworten zu generieren, falls API Key vorhanden
    if (ANTHROPIC_API_KEY && ANTHROPIC_API_KEY.trim() !== '') {
      try {
        console.log('[AI GENERATION] Starte Anthropic (Claude) API Calls für alle 3 Töne...');
        [friendly, professional, witty] = await Promise.all([
          generateResponseForTone(reviewText, reviewRating, businessName, languageCode, 'friendly', kiezScore, signatureNames, businessType, body.placeTypes),
          generateResponseForTone(
            reviewText,
            reviewRating,
            businessName,
            languageCode,
            'professional',
            kiezScore,
            signatureNames,
            businessType,
            body.placeTypes
          ),
          generateResponseForTone(reviewText, reviewRating, businessName, languageCode, 'witty', kiezScore, signatureNames, businessType, body.placeTypes),
        ]);
        console.log('[AI GENERATION SUCCESS] Antworten für alle 3 strategischen Reviews erstellt und gesendet.');
      } catch (aiError: any) {
        console.error('[AI GENERATION ERROR] Anthropic API fehlgeschlagen, verwende Mock-Antworten:', {
          error: aiError.message,
          stack: process.env.NODE_ENV === 'development' ? aiError.stack : undefined,
        });
        // Fallback auf Mock-Antworten
        usedMock = true;
        friendly = generateMockResponse(reviewText, reviewRating, businessName, 'friendly');
        professional = generateMockResponse(reviewText, reviewRating, businessName, 'professional');
        witty = generateMockResponse(reviewText, reviewRating, businessName, 'witty');
        console.log('[AI GENERATION] Mock-Antworten generiert als Fallback');
      }
    } else {
      console.log('[AI GENERATION] Kein ANTHROPIC_API_KEY gefunden, verwende Mock-Antworten');
      usedMock = true;
      // Kein API Key: Verwende Mock-Antworten
      friendly = generateMockResponse(reviewText, reviewRating, businessName, 'friendly');
      professional = generateMockResponse(reviewText, reviewRating, businessName, 'professional');
      witty = generateMockResponse(reviewText, reviewRating, businessName, 'witty');
    }

    // 4. Erfolgreiche Response zurückgeben - IMMER 200 OK
    const response: GenerateResponsesResponse = {
      responses: {
        friendly,
        professional,
        witty,
      },
    };

    console.log(`[AI GENERATION COMPLETE] Response gesendet (Mock: ${usedMock ? 'Ja' : 'Nein'})`);

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    // Error Handling: IMMER Mock-Antworten zurückgeben statt Fehler
    console.error('Error in ai/generate-responses API, using mock responses:', {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });

    // Generiere Mock-Antworten als Fallback (verwendet Parameter aus try-Block oder Defaults)
    const mockResponses: GenerateResponsesResponse = {
      responses: {
        friendly: generateMockResponse(reviewText, reviewRating, businessName, 'friendly'),
        professional: generateMockResponse(reviewText, reviewRating, businessName, 'professional'),
        witty: generateMockResponse(reviewText, reviewRating, businessName, 'witty'),
      },
    };

    // IMMER 200 OK mit Mock-Antworten zurückgeben
    return NextResponse.json(mockResponses, { status: 200 });
  }
}

