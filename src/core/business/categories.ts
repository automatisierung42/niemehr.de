/**
 * Business-Kategorien basierend auf Google Place Types
 * 
 * Kategorisiert Businesses in drei Gruppen:
 * - REPEAT_BUSINESS: Kunden kommen regelmäßig wieder (Restaurant, Friseur, etc.)
 * - ONE_TIME_BUSINESS: Kunden kommen normalerweise nicht wieder (Behörden, Anwalt, Bestatter)
 * - MIXED: Kann beides sein (Zahnarzt, Apotheke, Schule)
 */

export type BusinessCategory = 'REPEAT_BUSINESS' | 'ONE_TIME_BUSINESS' | 'MIXED'

/**
 * Google Place Types → Business-Kategorien Mapping
 * 
 * Basierend auf Google Places API Types:
 * https://developers.google.com/maps/documentation/places/web-service/supported_types
 */
export const PLACE_TYPE_CATEGORIES: Record<string, BusinessCategory> = {
  // REPEAT_BUSINESS: Kunden kommen regelmäßig wieder
  'restaurant': 'REPEAT_BUSINESS',
  'meal_takeaway': 'REPEAT_BUSINESS',
  'meal_delivery': 'REPEAT_BUSINESS',
  'cafe': 'REPEAT_BUSINESS',
  'bar': 'REPEAT_BUSINESS',
  'night_club': 'REPEAT_BUSINESS',
  'bakery': 'REPEAT_BUSINESS',
  'food': 'REPEAT_BUSINESS',
  'hair_care': 'REPEAT_BUSINESS',
  'beauty_salon': 'REPEAT_BUSINESS',
  'spa': 'REPEAT_BUSINESS',
  'gym': 'REPEAT_BUSINESS',
  'store': 'REPEAT_BUSINESS',
  'clothing_store': 'REPEAT_BUSINESS',
  'supermarket': 'REPEAT_BUSINESS',
  'gas_station': 'REPEAT_BUSINESS',
  'car_wash': 'REPEAT_BUSINESS',
  'car_repair': 'REPEAT_BUSINESS',
  'laundry': 'REPEAT_BUSINESS',
  'dry_cleaner': 'REPEAT_BUSINESS',
  
  // ONE_TIME_BUSINESS: Kunden kommen normalerweise nicht wieder
  'courthouse': 'ONE_TIME_BUSINESS',
  'local_government_office': 'ONE_TIME_BUSINESS',
  'city_hall': 'ONE_TIME_BUSINESS',
  'lawyer': 'ONE_TIME_BUSINESS',
  'funeral_home': 'ONE_TIME_BUSINESS',
  'cemetery': 'ONE_TIME_BUSINESS',
  'embassy': 'ONE_TIME_BUSINESS',
  'insurance_agency': 'ONE_TIME_BUSINESS',
  'real_estate_agency': 'ONE_TIME_BUSINESS',
  'accounting': 'ONE_TIME_BUSINESS',
  'tax_advisor': 'ONE_TIME_BUSINESS',
  'notary': 'ONE_TIME_BUSINESS',
  'moving_company': 'ONE_TIME_BUSINESS',
  
  // MIXED: Kann beides sein
  'dentist': 'MIXED',
  'doctor': 'MIXED',
  'hospital': 'MIXED',
  'pharmacy': 'MIXED',
  'veterinary_care': 'MIXED',
  'physiotherapist': 'MIXED',
  'school': 'MIXED',
  'university': 'MIXED',
  'library': 'MIXED',
  'museum': 'MIXED',
  'park': 'MIXED',
  'tourist_attraction': 'MIXED',
  'lodging': 'MIXED',
  'hotel': 'MIXED',
  'bank': 'MIXED',
  'atm': 'MIXED',
  'post_office': 'MIXED',
  'police': 'MIXED',
  'fire_station': 'MIXED',
  'church': 'MIXED',
  'mosque': 'MIXED',
  'synagogue': 'MIXED',
  'hindu_temple': 'MIXED',
  'stadium': 'MIXED',
  'amusement_park': 'MIXED',
  'zoo': 'MIXED',
  'aquarium': 'MIXED',
  'movie_theater': 'MIXED',
  'bowling_alley': 'MIXED',
  'casino': 'MIXED',
}

/**
 * Erkennt Business-Kategorie aus Business-Name und Google Place Types
 * 
 * @param businessName Business-Name
 * @param placeTypes Array von Google Place Types (optional)
 * @returns Business-Kategorie
 */
export function detectBusinessCategory(
  businessName: string,
  placeTypes?: string[]
): BusinessCategory {
  const nameLower = businessName.toLowerCase()
  
  // Prüfe zuerst nach expliziten Keywords im Namen
  // ONE_TIME_BUSINESS Keywords
  if (
    nameLower.includes('gesundheitsamt') ||
    nameLower.includes('behörde') ||
    nameLower.includes('amt') ||
    nameLower.includes('rathaus') ||
    nameLower.includes('anwalt') ||
    nameLower.includes('rechtsanwalt') ||
    nameLower.includes('bestatter') ||
    nameLower.includes('bestattung') ||
    nameLower.includes('steuerberater') ||
    nameLower.includes('notar') ||
    nameLower.includes('courthouse') ||
    nameLower.includes('lawyer') ||
    nameLower.includes('funeral')
  ) {
    return 'ONE_TIME_BUSINESS'
  }
  
  // REPEAT_BUSINESS Keywords
  if (
    nameLower.includes('restaurant') ||
    nameLower.includes('café') ||
    nameLower.includes('cafe') ||
    nameLower.includes('döner') ||
    nameLower.includes('kebab') ||
    nameLower.includes('imbiss') ||
    nameLower.includes('friseur') ||
    nameLower.includes('salon') ||
    nameLower.includes('bäckerei') ||
    nameLower.includes('bäcker') ||
    nameLower.includes('bar') ||
    nameLower.includes('pizzeria')
  ) {
    return 'REPEAT_BUSINESS'
  }
  
  // MIXED Keywords
  if (
    nameLower.includes('zahnarzt') ||
    nameLower.includes('arzt') ||
    nameLower.includes('praxis') ||
    nameLower.includes('apotheke') ||
    nameLower.includes('pharmacy') ||
    nameLower.includes('krankenhaus') ||
    nameLower.includes('hospital') ||
    nameLower.includes('schule') ||
    nameLower.includes('school') ||
    nameLower.includes('hotel')
  ) {
    return 'MIXED'
  }
  
  // Falls Place Types vorhanden sind, nutze diese
  if (placeTypes && placeTypes.length > 0) {
    for (const type of placeTypes) {
      const category = PLACE_TYPE_CATEGORIES[type]
      if (category) {
        return category
      }
    }
  }
  
  // Default: REPEAT_BUSINESS (sicherste Annahme)
  return 'REPEAT_BUSINESS'
}

