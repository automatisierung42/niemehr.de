/**
 * Dynamische Signatur-Templates für Review-Antworten
 * 
 * Generiert menschliche Signaturen basierend auf:
 * - Kiez-Score (Lockerheit)
 * - Branche (Döner, Friseur, Bäckerei, Hotel, etc.)
 * - Eingegebene Namen (aus User-Onboarding)
 * 
 * Jede Signatur fühlt sich an wie von einem echten Menschen geschrieben.
 */

/**
 * Branchen-Erkennung aus Business-Name oder Typ
 */
export function detectBusinessType(businessName: string, businessType?: string): string {
  const nameLower = businessName.toLowerCase()
  const typeLower = businessType?.toLowerCase() || ''
  
  // Döner / Imbiss
  if (nameLower.includes('döner') || nameLower.includes('kebab') || nameLower.includes('imbiss') || typeLower.includes('restaurant')) {
    return 'doener'
  }
  
  // Friseur
  if (nameLower.includes('friseur') || nameLower.includes('haar') || nameLower.includes('salon') || typeLower.includes('hair')) {
    return 'friseur'
  }
  
  // Bäckerei
  if (nameLower.includes('bäckerei') || nameLower.includes('bäcker') || nameLower.includes('backerei') || typeLower.includes('bakery')) {
    return 'baeckerei'
  }
  
  // Hotel
  if (nameLower.includes('hotel') || nameLower.includes('pension') || typeLower.includes('hotel')) {
    return 'hotel'
  }
  
  // Restaurant
  if (nameLower.includes('restaurant') || nameLower.includes('gaststätte') || nameLower.includes('wirtshaus')) {
    return 'restaurant'
  }
  
  // Café
  if (nameLower.includes('café') || nameLower.includes('cafe') || nameLower.includes('kaffee')) {
    return 'cafe'
  }
  
  // Default
  return 'default'
}

/**
 * Generiert eine Signatur basierend auf Score, Branche und Namen
 * 
 * @param kiezScore Kiez-Score (0-100)
 * @param businessName Business-Name
 * @param businessType Optional: Business-Typ
 * @param signatureNames Array von Namen (aus User-Onboarding)
 * @returns Generierte Signatur
 */
export function generateSignature(
  kiezScore: number,
  businessName: string,
  businessType?: string,
  signatureNames: string[] = []
): string {
  const branch = detectBusinessType(businessName, businessType)
  
  // Extrahiere erste Namen (max. 3)
  const names = signatureNames.slice(0, 3).filter(name => name && name.trim().length > 0)
  
  // Score-basierte Gruppierung
  if (kiezScore <= 40) {
    // Formell
    return generateFormalSignature(branch, names, businessName)
  } else if (kiezScore <= 75) {
    // Freundlich-locker
    return generateFriendlySignature(branch, names, businessName)
  } else {
    // Sehr locker
    return generateCasualSignature(branch, names, businessName)
  }
}

/**
 * Formelle Signaturen (Score 0-40)
 */
function generateFormalSignature(branch: string, names: string[], businessName: string): string {
  if (names.length === 0) {
    // Keine Namen → Generische formelle Signatur
    switch (branch) {
      case 'hotel':
        return `Ihr Team vom ${businessName}`
      case 'baeckerei':
        return `Ihr Team der Bäckerei ${businessName}`
      case 'restaurant':
        return `Ihr Team vom ${businessName}`
      default:
        return `Ihr Team vom ${businessName}`
    }
  }
  
  if (names.length === 1) {
    return `Mit freundlichen Grüßen, ${names[0]}`
  }
  
  if (names.length === 2) {
    return `Mit freundlichen Grüßen, ${names[0]} & ${names[1]}`
  }
  
  // 3+ Namen
  return `Mit freundlichen Grüßen, ${names[0]}, ${names[1]} & Team`
}

/**
 * Freundlich-lockere Signaturen (Score 41-75)
 */
function generateFriendlySignature(branch: string, names: string[], businessName: string): string {
  if (names.length === 0) {
    // Keine Namen → Generische freundliche Signatur
    switch (branch) {
      case 'doener':
        return `Dein Team vom ${businessName}`
      case 'friseur':
        return `Lisa, Maria & die Mädels vom ${businessName}`
      case 'cafe':
        return `Dein Team vom ${businessName}`
      default:
        return `Dein Team vom ${businessName}`
    }
  }
  
  if (names.length === 1) {
    return `Viele Grüße, ${names[0]}`
  }
  
  if (names.length === 2) {
    return `Viele Grüße, ${names[0]} & ${names[1]}`
  }
  
  // 3+ Namen
  return `Viele Grüße, ${names[0]}, ${names[1]} & Team`
}

/**
 * Sehr lockere Signaturen (Score 76-100)
 */
function generateCasualSignature(branch: string, names: string[], businessName: string): string {
  if (names.length === 0) {
    // Keine Namen → Generische lockere Signatur
    switch (branch) {
      case 'doener':
        return `Achmed & die Dönermafia vom ${businessName}`
      case 'friseur':
        return `Lisa, Maria & die Mädels vom ${businessName}`
      case 'cafe':
        return `Dein Team vom ${businessName}`
      case 'restaurant':
        return `Die Jungs & Mädels vom ${businessName}`
      default:
        return `Dein Team vom ${businessName}`
    }
  }
  
  if (names.length === 1) {
    // Ein Name → Locker
    const templates = [
      `Dein ${names[0]}`,
      `${names[0]} & die Jungs`,
      `Bis bald, ${names[0]}`,
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }
  
  if (names.length === 2) {
    // Zwei Namen → Sehr locker
    const templates = [
      `${names[0]} & ${names[1]}`,
      `Dein ${names[0]} & ${names[1]}`,
      `${names[0]} & ${names[1]} vom Kiez`,
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }
  
  // 3+ Namen → Sehr locker mit Team
  return `${names[0]}, ${names[1]} & die Jungs`
}

/**
 * Easter Egg: Spezielle Signaturen für bestimmte Branchen + hohe Scores
 */
export function getEasterEggSignature(
  branch: string,
  kiezScore: number,
  names: string[]
): string | null {
  if (kiezScore < 80) return null
  
  switch (branch) {
    case 'doener':
      if (names.length > 0) {
        return `${names[0]} & die Dönermafia`
      }
      return 'Achmed & die Dönermafia'
    
    case 'friseur':
      if (names.length >= 2) {
        return `${names[0]}, ${names[1]} & die Mädels`
      }
      return 'Lisa, Maria & die Mädels'
    
    case 'cafe':
      return 'Dein Team vom Kiez'
    
    default:
      return null
  }
}

