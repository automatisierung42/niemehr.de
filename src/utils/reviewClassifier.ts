export interface CriticalCheck {
  isCritical: boolean;
  reason: string | null;
}

export function isCriticalReview(
  reviewText: string,
  rating: number
): CriticalCheck {
  // Automatisch kritisch bei Rating ≤ 3
  if (rating <= 3) {
    return {
      isCritical: true,
      reason: `Niedrige Bewertung (${rating}★)`,
    };
  }

  // Kritische Keywords
  const criticalKeywords = [
    // Rechtlich
    'anzeige', 'rechtsanwalt', 'anwalt', 'klage', 'gericht',
    'polizei', 'gesundheitsamt', 'ordnungsamt', 'verbraucherschutz',
    
    // Schwere Vorwürfe
    'betrug', 'abzocke', 'diskriminierung', 'rassistisch', 'rassismus',
    'sexistisch', 'sexismus', 'beleidigung', 'verleumdung',
    
    // Hygiene/Gesundheit (Restaurant/Praxis)
    'schimmel', 'ungeziefer', 'ratten', 'kakerlaken', 'verdorben',
    'lebensmittelvergiftung', 'salmonellen', 'dreck', 'ekelhaft',
    
    // Hass-Sprache
    'scheisse', 'scheiß', 'fick', 'arschloch', 'idiot',
  ];

  const textLower = reviewText.toLowerCase();
  
  for (const keyword of criticalKeywords) {
    if (textLower.includes(keyword)) {
      return {
        isCritical: true,
        reason: `Kritisches Keyword: "${keyword}"`,
      };
    }
  }

  return {
    isCritical: false,
    reason: null,
  };
}

export function calculateTimeSaved(reviewCount: number): number {
  // 7.5 Min pro Review durchschnittlich
  return Math.round((reviewCount * 7.5) / 60 * 10) / 10; // Stunden, 1 Dezimale
}

