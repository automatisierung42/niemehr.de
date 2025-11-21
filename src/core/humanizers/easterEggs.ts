/**
 * Easter Eggs für Review-Antworten
 * 
 * Erkennt spezielle Phrasen in Reviews und generiert passende, menschliche Antworten.
 * 
 * Easter Eggs:
 * - "bester Döner ever" → "Bester ever? Na dann legen wir nächstes Mal noch einen drauf!"
 * - "wie bei Oma" → "Wie bei Oma? Das ist das schönste Kompliment, das wir bekommen können!"
 * - "derbe" → "Derbe? Das freut uns richtig!"
 * - "krank geil" → "Krank geil? Boah, danke dir!"
 */

/**
 * Erkennt Easter Egg Phrasen in Review-Text
 * 
 * @param reviewText Review-Text
 * @param languageCode Sprache der Review
 * @returns Easter Egg Info oder null
 */
export function detectEasterEggs(
  reviewText: string,
  languageCode: string = 'de'
): {
  type: 'bester_doener_ever' | 'wie_bei_oma' | 'derbe' | 'krank_geil' | null
  response: string
} | null {
  const textLower = reviewText.toLowerCase()
  const isGerman = languageCode.toLowerCase() === 'de'
  
  // "bester Döner ever" Detection
  if (
    (textLower.includes('bester') || textLower.includes('best')) &&
    (textLower.includes('döner') || textLower.includes('kebab') || textLower.includes('burger')) &&
    (textLower.includes('ever') || textLower.includes('jemals') || textLower.includes('je'))
  ) {
    return {
      type: 'bester_doener_ever',
      response: isGerman
        ? 'Bester ever? Na dann legen wir nächstes Mal noch einen drauf!'
        : 'Best ever? Then we\'ll add even more next time!'
    }
  }
  
  // "wie bei Oma" Detection
  if (
    textLower.includes('wie bei oma') ||
    textLower.includes('wie bei oma') ||
    textLower.includes('schmeckt wie bei oma') ||
    textLower.includes('wie bei mutter') ||
    textLower.includes('wie bei mama')
  ) {
    return {
      type: 'wie_bei_oma',
      response: isGerman
        ? 'Wie bei Oma? Das ist das schönste Kompliment, das wir bekommen können!'
        : 'Like grandma\'s? That\'s the best compliment we could receive!'
    }
  }
  
  // "derbe" Detection (Berliner/Umgangssprache)
  if (
    textLower.includes('derbe') ||
    textLower.includes('derb') ||
    (textLower.includes('mega') && textLower.includes('geil'))
  ) {
    return {
      type: 'derbe',
      response: isGerman
        ? 'Derbe? Das freut uns richtig!'
        : 'Awesome? That makes us really happy!'
    }
  }
  
  // "krank geil" Detection (Jugendsprache)
  if (
    textLower.includes('krank geil') ||
    textLower.includes('krankgeil') ||
    textLower.includes('krass geil') ||
    textLower.includes('mega geil')
  ) {
    return {
      type: 'krank_geil',
      response: isGerman
        ? 'Krank geil? Boah, danke dir!'
        : 'Sick awesome? Wow, thanks!'
    }
  }
  
  return null
}

/**
 * Generiert eine Easter Egg Antwort basierend auf Typ und Kiez-Score
 * 
 * @param easterEggType Easter Egg Typ
 * @param kiezScore Kiez-Score (0-100)
 * @param languageCode Sprache
 * @returns Passende Easter Egg Antwort
 */
export function generateEasterEggResponse(
  easterEggType: 'bester_doener_ever' | 'wie_bei_oma' | 'derbe' | 'krank_geil',
  kiezScore: number,
  languageCode: string = 'de'
): string {
  const isGerman = languageCode.toLowerCase() === 'de'
  
  switch (easterEggType) {
    case 'bester_doener_ever':
      if (kiezScore <= 40) {
        return isGerman
          ? 'Bester ever? Das freut uns sehr – wir werden beim nächsten Mal noch besser sein!'
          : 'Best ever? We\'re very happy – we\'ll be even better next time!'
      } else if (kiezScore <= 75) {
        return isGerman
          ? 'Bester ever? Na dann legen wir nächstes Mal noch einen drauf!'
          : 'Best ever? Then we\'ll add even more next time!'
      } else {
        return isGerman
          ? 'Bester ever? Na dann legen wir nächstes Mal noch einen drauf!'
          : 'Best ever? Then we\'ll add even more next time!'
      }
    
    case 'wie_bei_oma':
      if (kiezScore <= 40) {
        return isGerman
          ? 'Wie bei Oma? Das ist das schönste Kompliment, das wir bekommen können – vielen Dank!'
          : 'Like grandma\'s? That\'s the best compliment we could receive – thank you!'
      } else if (kiezScore <= 75) {
        return isGerman
          ? 'Wie bei Oma? Das ist das schönste Kompliment, das wir bekommen können!'
          : 'Like grandma\'s? That\'s the best compliment we could receive!'
      } else {
        return isGerman
          ? 'Wie bei Oma? Boah, das ist das geilste Kompliment überhaupt!'
          : 'Like grandma\'s? Wow, that\'s the best compliment ever!'
      }
    
    case 'derbe':
      if (kiezScore <= 40) {
        return isGerman
          ? 'Derbe? Das freut uns sehr!'
          : 'Awesome? That makes us very happy!'
      } else if (kiezScore <= 75) {
        return isGerman
          ? 'Derbe? Das freut uns richtig!'
          : 'Awesome? That makes us really happy!'
      } else {
        return isGerman
          ? 'Derbe? Ey, das freut uns richtig!'
          : 'Awesome? Hey, that makes us really happy!'
      }
    
    case 'krank_geil':
      if (kiezScore <= 40) {
        return isGerman
          ? 'Krank geil? Das freut uns sehr!'
          : 'Sick awesome? That makes us very happy!'
      } else if (kiezScore <= 75) {
        return isGerman
          ? 'Krank geil? Boah, danke dir!'
          : 'Sick awesome? Wow, thanks!'
      } else {
        return isGerman
          ? 'Krank geil? Boah, danke dir – das freut uns richtig!'
          : 'Sick awesome? Wow, thanks – that makes us really happy!'
      }
    
    default:
      return ''
  }
}

