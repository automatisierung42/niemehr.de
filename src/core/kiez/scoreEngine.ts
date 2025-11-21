/**
 * Kiez-Score Engine
 * 
 * Berechnet einen Score von 0-100 basierend auf dem Standort eines Businesses.
 * 
 * Der Score repräsentiert die "Lockerheit" eines Ortes:
 * - 0-30: Sehr formell, "Herzlichen Dank" Standard
 * - 30-50: Formell, respektvoll
 * - 50: Default (sicheres Mittel)
 * - 50-70: Locker, lässig
 * - 70-100: Sehr locker, "Ey" ist Standard
 * 
 * Default bei fehlenden Daten: 50 (sicheres Mittel – nie peinlich, nie steif)
 */

import {
  CITY_SCORES,
  POSTAL_CODE_SCORES,
  STATE_SCORES,
  normalizeCityName,
  extractPostalCode,
  extractPostalCodePrefix,
} from './lookups'

/**
 * Business-Interface für Score-Berechnung
 * 
 * Enthält die minimalen Informationen, die für die Berechnung benötigt werden
 */
export interface BusinessForScore {
  name?: string
  address?: string
  city?: string
  postalCode?: string
  state?: string
  googlePlaceId?: string
}

/**
 * Berechnet den Kiez-Score für ein Business
 * 
 * @param business Business-Objekt mit Standort-Informationen
 * @returns Score von 0-100 (Default: 50)
 * 
 * @example
 * ```typescript
 * const score = calculateKiezScore({
 *   name: "Kiez Döner",
 *   address: "Sonnenallee 123, 12059 Berlin",
 *   city: "Berlin",
 *   postalCode: "12059"
 * })
 * // Returns: 90 (Neukölln = +40, Basis 50)
 * ```
 */
export function calculateKiezScore(business: BusinessForScore): number {
  // Basis-Score: 50 (sicheres Mittel – nie peinlich, nie steif)
  let score = 50

  // 1. Versuche Stadtname-Lookup (höchste Priorität)
  if (business.city) {
    const normalizedCity = normalizeCityName(business.city)
    const cityModifier = CITY_SCORES[normalizedCity]
    
    if (cityModifier !== undefined) {
      score += cityModifier
      // Clamp auf 0-100
      score = Math.max(0, Math.min(100, score))
      return score
    }
  }

  // 2. Versuche Adresse nach Stadtname zu durchsuchen
  if (business.address) {
    const addressLower = business.address.toLowerCase()
    
    // Suche nach bekannten Stadtnamen in der Adresse
    for (const [cityName, modifier] of Object.entries(CITY_SCORES)) {
      if (addressLower.includes(cityName)) {
        score += modifier
        score = Math.max(0, Math.min(100, score))
        return score
      }
    }
  }

  // 3. Versuche Postleitzahl-Lookup
  let postalCode: string | null = null
  
  if (business.postalCode) {
    postalCode = business.postalCode
  } else if (business.address) {
    postalCode = extractPostalCode(business.address)
  }

  if (postalCode) {
    // Versuche exakte PLZ
    const exactModifier = POSTAL_CODE_SCORES[postalCode]
    if (exactModifier !== undefined) {
      score += exactModifier
      score = Math.max(0, Math.min(100, score))
      return score
    }

    // Versuche PLZ-Präfix (erste 2 Ziffern)
    const prefix = extractPostalCodePrefix(postalCode)
    const prefixModifier = POSTAL_CODE_SCORES[prefix]
    if (prefixModifier !== undefined) {
      score += prefixModifier
      score = Math.max(0, Math.min(100, score))
      return score
    }
  }

  // 4. Versuche Bundesland-Lookup (niedrigste Priorität)
  if (business.state) {
    const normalizedState = normalizeCityName(business.state)
    const stateModifier = STATE_SCORES[normalizedState]
    
    if (stateModifier !== undefined) {
      score += stateModifier
      score = Math.max(0, Math.min(100, score))
      return score
    }
  }

  // 5. Keine Daten gefunden → Default: 50 (sicheres Mittel)
  return 50
}

/**
 * Interpretiert den Kiez-Score in lesbare Kategorien
 * 
 * @param score Kiez-Score (0-100)
 * @returns Kategorie-String
 */
export function interpretKiezScore(score: number): {
  category: 'sehr_formell' | 'formell' | 'neutral' | 'locker' | 'sehr_locker'
  description: string
  openerStyle: 'sehr_formell' | 'formell' | 'neutral' | 'locker' | 'sehr_locker'
  signatureStyle: 'sehr_formell' | 'formell' | 'neutral' | 'locker' | 'sehr_locker'
  echoAllowed: boolean
} {
  if (score <= 30) {
    return {
      category: 'sehr_formell',
      description: 'Sehr formell, "Herzlichen Dank" Standard',
      openerStyle: 'sehr_formell',
      signatureStyle: 'sehr_formell',
      echoAllowed: false, // Echo-Technik zu locker für sehr formelle Orte
    }
  } else if (score <= 45) {
    return {
      category: 'formell',
      description: 'Formell, respektvoll',
      openerStyle: 'formell',
      signatureStyle: 'formell',
      echoAllowed: false, // Echo-Technik zu locker für formelle Orte
    }
  } else if (score <= 55) {
    return {
      category: 'neutral',
      description: 'Neutral, ausgewogen',
      openerStyle: 'neutral',
      signatureStyle: 'neutral',
      echoAllowed: true, // Echo-Technik erlaubt bei neutralen Orten
    }
  } else if (score <= 70) {
    return {
      category: 'locker',
      description: 'Locker, lässig',
      openerStyle: 'locker',
      signatureStyle: 'locker',
      echoAllowed: true, // Echo-Technik erlaubt bei lockeren Orten
    }
  } else {
    return {
      category: 'sehr_locker',
      description: 'Sehr locker, "Ey" ist Standard',
      openerStyle: 'sehr_locker',
      signatureStyle: 'sehr_locker',
      echoAllowed: true, // Echo-Technik erlaubt bei sehr lockeren Orten
    }
  }
}

/**
 * Bestimmt die Opener-Lockerheit basierend auf Kiez-Score
 * 
 * @param score Kiez-Score (0-100)
 * @returns Opener-Style-String für Prompt
 */
export function getOpenerStyle(score: number): string {
  const interpretation = interpretKiezScore(score)
  
  switch (interpretation.openerStyle) {
    case 'sehr_formell':
      return 'Sehr formell und höflich. Verwende "Herzlichen Dank" statt "Danke". Keine Umgangssprache.'
    case 'formell':
      return 'Formell und respektvoll. Verwende höfliche Ansprache. Keine Umgangssprache.'
    case 'neutral':
      return 'Ausgewogen und freundlich. Verwende natürliche, respektvolle Sprache.'
    case 'locker':
      return 'Locker und lässig. Du kannst eine etwas entspanntere Sprache verwenden, bleibe aber respektvoll.'
    case 'sehr_locker':
      return 'Sehr locker und lässig. "Ey" ist okay, Umgangssprache ist erlaubt, bleibe aber respektvoll.'
    default:
      return 'Ausgewogen und freundlich. Verwende natürliche, respektvolle Sprache.'
  }
}

/**
 * Bestimmt die Signatur-Vorschläge basierend auf Kiez-Score
 * 
 * @param score Kiez-Score (0-100)
 * @returns Signatur-Style-String für Prompt
 */
export function getSignatureStyle(score: number): string {
  const interpretation = interpretKiezScore(score)
  
  switch (interpretation.signatureStyle) {
    case 'sehr_formell':
      return 'Signatur: Formell, z.B. "Mit freundlichen Grüßen, [Name]" oder "Ihr [Name] & Team"'
    case 'formell':
      return 'Signatur: Respektvoll, z.B. "Herzliche Grüße, [Name]" oder "[Name] & Team"'
    case 'neutral':
      return 'Signatur: Freundlich, z.B. "Viele Grüße, [Name]" oder "[Name] & Team"'
    case 'locker':
      return 'Signatur: Locker, z.B. "Liebe Grüße, [Name]" oder "Dein [Name]" oder "[Name] & die Jungs"'
    case 'sehr_locker':
      return 'Signatur: Sehr locker, z.B. "Bis bald, [Name]" oder "Dein [Name]" oder "[Name] & die Jungs vom Kiez"'
    default:
      return 'Signatur: Freundlich, z.B. "Viele Grüße, [Name]" oder "[Name] & Team"'
  }
}

/**
 * Prüft ob Echo-Technik erlaubt ist basierend auf Kiez-Score
 * 
 * Echo-Technik: Wiederholung von Wörtern aus der Review für lockeren, persönlichen Ton
 * 
 * @param score Kiez-Score (0-100)
 * @returns true wenn Echo-Technik erlaubt ist
 */
export function isEchoAllowed(score: number): boolean {
  return interpretKiezScore(score).echoAllowed
}

/**
 * Erstellt einen Prompt-Teil für die Antwort-Generierung basierend auf Kiez-Score
 * 
 * @param score Kiez-Score (0-100)
 * @returns Prompt-String mit allen relevanten Anweisungen
 */
export function buildKiezPrompt(score: number): string {
  const interpretation = interpretKiezScore(score)
  const openerStyle = getOpenerStyle(score)
  const signatureStyle = getSignatureStyle(score)
  const echoAllowed = isEchoAllowed(score)
  
  let prompt = `\nLOKALKOLORIT-SCORE: ${score}/100 (${interpretation.description})\n\n`
  prompt += `OPENER-STIL: ${openerStyle}\n\n`
  prompt += `SIGNATUR-STIL: ${signatureStyle}\n\n`
  
  if (echoAllowed) {
    prompt += `ECHO-TECHNIK: Erlaubt. Du kannst Wörter aus der Review wiederholen für einen lockeren, persönlichen Ton.\n`
    prompt += `Beispiel: Review sagt "super lecker" → Antwort kann "super lecker" verwenden.\n\n`
  } else {
    prompt += `ECHO-TECHNIK: Nicht erlaubt. Verwende eigene Formulierungen, keine Wiederholung von Review-Wörtern.\n\n`
  }
  
  return prompt
}

