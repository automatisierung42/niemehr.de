/**
 * AI Hard Constraints - Zentrale, nicht verhandelbare Regeln für KI-Antwort-Generierung
 * 
 * Diese Constraints müssen in allen AI-Generierungsprozessen befolgt werden.
 * Sie haben höchste Priorität und dürfen nicht überschrieben werden.
 */

export const AI_HARD_CONSTRAINTS = {
  /**
   * ZWINGEND: Muss in der Sprache der Original-Review geantwortet werden (höchste Priorität)
   * 
   * Wenn eine Review auf Englisch ist, MUSS die Antwort auf Englisch sein.
   * Wenn eine Review auf Deutsch ist, MUSS die Antwort auf Deutsch sein.
   * 
   * Diese Regel hat absolute Priorität über alle anderen Einstellungen.
   */
  LANGUAGE_MATCH: true,

  /**
   * Formatierungsregeln für die Signatur
   */
  MAX_EMOJIS: 1,
  SIGNATURE_REQUIRED: true,

  /**
   * Content-Filter für die Generierung
   * 
   * TONE_WARMTH_MIN: Mindest-Wärme-Level (0.0 - 1.0)
   * 0.9 bedeutet 90% Warmth - Antworten müssen freundlich und einladend sein
   */
  TONE_WARMTH_MIN: 0.9,

  /**
   * Weitere Hard-Constraints können hier hinzugefügt werden
   */
} as const;

/**
 * Validiert ob eine Antwort den Hard-Constraints entspricht
 * 
 * @param responseText Die generierte Antwort
 * @param reviewLanguage Die Sprache der Original-Review (z.B. 'en', 'de')
 * @returns true wenn alle Constraints erfüllt sind, false sonst
 */
export function validateHardConstraints(
  responseText: string,
  reviewLanguage: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Prüfe LANGUAGE_MATCH (vereinfachte Prüfung - in Produktion sollte ein Language-Detection-Service verwendet werden)
  if (AI_HARD_CONSTRAINTS.LANGUAGE_MATCH) {
    // Diese Prüfung ist vereinfacht - in Produktion sollte ein Language-Detection-Service verwendet werden
    // Hier nur als Beispiel für die Architektur
    const detectedLanguage = detectLanguage(responseText);
    if (detectedLanguage !== reviewLanguage) {
      errors.push(
        `LANGUAGE_MATCH violation: Response is in ${detectedLanguage}, but review is in ${reviewLanguage}`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Vereinfachte Language-Detection (für Demo-Zwecke)
 * In Produktion sollte ein Language-Detection-Service verwendet werden
 */
function detectLanguage(text: string): string {
  // Vereinfachte Heuristik - in Produktion sollte ein Language-Detection-Service verwendet werden
  const germanIndicators = ['der', 'die', 'das', 'und', 'ist', 'für', 'mit', 'auf', 'sind', 'wir', 'Sie'];
  const englishIndicators = ['the', 'and', 'is', 'for', 'with', 'on', 'are', 'we', 'you', 'thank', 'very'];

  const lowerText = text.toLowerCase();
  const germanCount = germanIndicators.filter(word => lowerText.includes(word)).length;
  const englishCount = englishIndicators.filter(word => lowerText.includes(word)).length;

  return germanCount > englishCount ? 'de' : 'en';
}

/**
 * Generiert einen Prompt-Teil für die AI-Generierung, der die Hard-Constraints durchsetzt
 * 
 * @param reviewLanguage Die Sprache der Original-Review
 * @returns Prompt-String der die Constraints beschreibt
 */
export function generateHardConstraintPrompt(reviewLanguage: string): string {
  const languageName = reviewLanguage === 'en' ? 'English' : reviewLanguage === 'de' ? 'German' : reviewLanguage;
  
  return `
CRITICAL HARD CONSTRAINTS (MUST FOLLOW - HIGHEST PRIORITY):

1. LANGUAGE MATCH (ABSOLUTE PRIORITY):
   - The review is written in ${languageName} (${reviewLanguage}).
   - You MUST respond in ${languageName} (${reviewLanguage}).
   - This rule has absolute priority over all other settings.
   - Never respond in a different language than the review.

2. TONE WARMTH:
   - Minimum warmth level: ${AI_HARD_CONSTRAINTS.TONE_WARMTH_MIN * 100}%
   - Responses must be friendly, inviting, and warm.

3. SIGNATURE:
   - Signature is required: ${AI_HARD_CONSTRAINTS.SIGNATURE_REQUIRED}
   - Maximum emojis in signature: ${AI_HARD_CONSTRAINTS.MAX_EMOJIS}

These constraints are NON-NEGOTIABLE and must be followed in all responses.
`.trim();
}

