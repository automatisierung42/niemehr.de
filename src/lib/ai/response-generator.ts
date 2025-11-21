import OpenAI from 'openai'
import { generateHardConstraintPrompt } from '@/lib/config/aiRules'

const MODEL = 'gpt-4o-mini'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

type SupportedTone = 'professional' | 'friendly' | 'casual'

// Off-Topic Keywords Mapping für verschiedene Business-Typen
const OFF_TOPIC_KEYWORDS: Record<string, string[]> = {
  dentist: ['burger', 'pizza', 'schnitzel', 'essen', 'food', 'restaurant', 'kellner', 'küche', 'koch'],
  restaurant: ['zahnreinigung', 'zahnarzt', 'plombe', 'karies', 'dental', 'zahn', 'behandlung'],
  lawyer: ['haarschnitt', 'friseur', 'dauerwelle', 'färben', 'frisur', 'haare'],
  mechanic: ['massage', 'yoga', 'entspannung', 'meditation', 'wellness', 'sauna'],
  doctor: ['reparatur', 'werkstatt', 'auto', 'motor', 'bremsen', 'ölwechsel'],
  yoga: ['reparatur', 'werkstatt', 'auto', 'motor', 'bremsen', 'ölwechsel', 'mechaniker'],
  hairdresser: ['steuer', 'steuerberater', 'buchhaltung', 'rechnung', 'finanzen'],
  accountant: ['haarschnitt', 'friseur', 'dauerwelle', 'färben', 'frisur', 'haare'],
}

function ensureApiKey() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set')
  }
}

/**
 * Prüft ob eine Review off-topic ist (keinen Bezug zum Business hat)
 * @param reviewText Der Review-Text
 * @param businessType Der Business-Typ (z.B. 'dentist', 'restaurant', 'lawyer')
 * @returns true wenn die Review off-topic ist
 */
export function isOffTopicReview(reviewText: string, businessType?: string): boolean {
  if (!businessType) return false

  const text = reviewText.toLowerCase()
  const keywords = OFF_TOPIC_KEYWORDS[businessType.toLowerCase()] || []

  if (keywords.length === 0) return false

  // Prüfe ob mindestens 2 Off-Topic Keywords vorkommen
  const matches = keywords.filter((kw) => text.includes(kw))
  return matches.length >= 2
}

/**
 * Erstellt einen speziellen Prompt für Off-Topic Reviews
 */
function buildOffTopicPrompt(
  reviewText: string,
  language: string,
  businessName: string,
  businessType?: string,
) {
  // Hard-Constraints einbinden (höchste Priorität)
  const hardConstraints = generateHardConstraintPrompt(language)
  
  return `Du bist ein Review-Response-Assistent für ${businessName}${businessType ? `, ein ${businessType}` : ''}.

SZENARIO: Der Kunde hat eine Review hinterlassen, die offensichtlich NICHTS mit dem Business zu tun hat.

${hardConstraints}

AUFGABE: Erstelle eine kurze (2-3 Sätze), humorvolle Antwort, die:
1. Die Verwechslung mit leichtem Humor aufgreift
2. Zurück zum eigentlichen Service lenkt
3. Eine freundliche Einladung ausspricht

TONALITÄT:
- Freundlich & humorvoll (NIE sarkastisch!)
- Kurz & prägnant (maximal 50 Wörter)
- Professionell trotz Absurdität
- 1-2 Emojis erlaubt (😊 😄 ✨)
- Sprache: ${language} (MUSS mit der Review-Sprache übereinstimmen!)

WICHTIGE REGELN:
- NIEMALS vorwurfsvoll sein
- NIEMALS "Das gehört nicht zu uns" sagen (klingt unhöflich)
- NIEMALS um Löschung bitten
- NIEMALS den Reviewer bloßstellen
- KEIN "Mit freundlichen Grüßen" oder formelles Ende

Review: "${reviewText}"

Antwort:`
}

function buildPrompt(
  reviewText: string,
  rating: number,
  tone: SupportedTone,
  language: string,
  businessName: string,
) {
  // Hard-Constraints einbinden (höchste Priorität)
  const hardConstraints = generateHardConstraintPrompt(language)
  
  const complianceRules = `
KRITISCHE COMPLIANCE-REGELN:
- Sei respektvoll und professionell zu jeder Zeit
- NIEMALS diskriminierende, beleidigende oder stereotype Sprache verwenden
- NIEMALS medizinische Ratschläge oder Diagnosen geben
- NIEMALS Rechtsberatung geben
- NIEMALS Versprechen über Rabatte oder Angebote ohne explizite Freigabe machen
- Halte Antworten prägnant und authentisch
- Passe den Ton basierend auf Review-Sentiment an
- Der Nutzer wird diese Antwort manuell überprüfen und genehmigen, bevor sie veröffentlicht wird
`

  return `Du bist der Inhaber von ${businessName}. Schreibe eine authentische, ${tone} Antwort auf diese Google-Bewertung.

Bewertung: ${rating}/5 Sterne
"${reviewText}"

${hardConstraints}

${complianceRules}

Regeln:
- Sprache: ${language} (MUSS mit der Review-Sprache übereinstimmen!)
- Länge: 2-3 Sätze, maximal 50 Wörter
- Ton: ${tone}
- Bei negativen Reviews: Empathie zeigen, Lösung anbieten
- Bei positiven Reviews: Danken, einladend bleiben
- KEIN "Mit freundlichen Grüßen" oder formelles Ende
- Persönlich, nicht corporate

Antwort:`
}

/**
 * Generiert eine Antwort für eine Off-Topic Review
 */
export async function generateOffTopicResponse(
  reviewText: string,
  language: string,
  businessName: string,
  businessType?: string,
): Promise<string> {
  ensureApiKey()

  const prompt = buildOffTopicPrompt(reviewText, language, businessName, businessType)

  try {
    const completion = await client.responses.create({
      model: MODEL,
      input: prompt,
      max_output_tokens: 240,
      temperature: 0.8, // Etwas höhere Temperatur für kreativere/humorvollere Antworten
    })

    const text = completion.output_text?.trim()
    if (!text) {
      throw new Error('OpenAI returned an empty response')
    }

    return text
  } catch (error) {
    // Sicheres Error Handling - keine sensiblen Daten in Logs
    console.error('OpenAI API error', {
      errorCode: error instanceof Error ? error.message : 'Unknown error',
      // KEINE Review-Daten oder andere personenbezogene Daten loggen!
    })

    // Generische Fehlermeldung für User
    throw new Error('Fehler bei der Generierung der Antwort. Bitte versuchen Sie es erneut.')
  }
}

export async function generateResponse(
  reviewText: string,
  rating: number,
  tone: SupportedTone,
  language: string,
  businessName: string,
  businessType?: string,
): Promise<string> {
  ensureApiKey()

  // Prüfe ob Review off-topic ist
  if (businessType && isOffTopicReview(reviewText, businessType)) {
    return generateOffTopicResponse(reviewText, language, businessName, businessType)
  }

  const prompt = buildPrompt(reviewText, rating, tone, language, businessName)

  try {
    const completion = await client.responses.create({
      model: MODEL,
      input: prompt,
      max_output_tokens: 240,
      temperature: 0.7,
    })

    const text = completion.output_text?.trim()
    if (!text) {
      throw new Error('OpenAI returned an empty response')
    }

    return text
  } catch (error) {
    // Sicheres Error Handling - keine sensiblen Daten in Logs
    console.error('OpenAI API error', {
      errorCode: error instanceof Error ? error.message : 'Unknown error',
      // KEINE Review-Daten oder andere personenbezogene Daten loggen!
    })

    // Generische Fehlermeldung für User
    throw new Error('Fehler bei der Generierung der Antwort. Bitte versuchen Sie es erneut.')
  }
}

