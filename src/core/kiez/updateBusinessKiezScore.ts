/**
 * Utility-Funktion zum Aktualisieren des Kiez-Scores für ein Business
 * 
 * Wird beim Onboarding oder wenn Business-Daten aktualisiert werden aufgerufen.
 */

import { prisma } from '@/lib/prisma'
import { calculateKiezScore, BusinessForScore } from './scoreEngine'

/**
 * Aktualisiert den Kiez-Score für ein Business basierend auf verfügbaren Standort-Daten
 * 
 * @param businessId Business-ID
 * @param businessData Optionale Business-Daten (wenn nicht vorhanden, werden sie aus DB geladen)
 * @returns Berechneter Kiez-Score
 */
export async function updateBusinessKiezScore(
  businessId: string,
  businessData?: {
    name?: string
    address?: string
    city?: string
    postalCode?: string
    state?: string
    googlePlaceId?: string
  }
): Promise<number> {
  // Lade Business-Daten aus DB, falls nicht übergeben
  let business: BusinessForScore
  
  if (businessData) {
    business = businessData
  } else {
    const dbBusiness = await prisma.business.findUnique({
      where: { id: businessId },
      select: {
        name: true,
        googlePlaceId: true,
      },
    })
    
    if (!dbBusiness) {
      throw new Error(`Business ${businessId} not found`)
    }
    
    business = {
      name: dbBusiness.name,
      googlePlaceId: dbBusiness.googlePlaceId,
    }
  }
  
  // Berechne Kiez-Score
  const kiezScore = calculateKiezScore(business)
  
  // Speichere Score in DB
  await prisma.business.update({
    where: { id: businessId },
    data: {
      kiezScore,
    },
  })
  
  return kiezScore
}

/**
 * Aktualisiert den Kiez-Score basierend auf Google Places API Daten
 * 
 * @param businessId Business-ID
 * @param googlePlacesData Google Places API Response-Daten
 * @returns Berechneter Kiez-Score
 */
export async function updateKiezScoreFromGooglePlaces(
  businessId: string,
  googlePlacesData: {
    displayName?: { text?: string }
    formattedAddress?: string
    name?: string
  }
): Promise<number> {
  const business: BusinessForScore = {
    name: googlePlacesData.displayName?.text || googlePlacesData.name,
    address: googlePlacesData.formattedAddress,
  }
  
  return updateBusinessKiezScore(businessId, business)
}

