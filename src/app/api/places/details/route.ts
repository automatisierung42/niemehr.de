import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// TypeScript Interfaces für Google Places API Response
interface GooglePlaceReview {
  name?: string;
  relativePublishTimeDescription?: string;
  rating: number;
  text?: {
    text: string;
    languageCode?: string;
  };
  originalText?: {
    text: string;
    languageCode?: string;
  };
  authorAttribution?: {
    displayName: string;
    uri?: string;
    photoUri?: string;
    isOwner?: boolean;
  };
  publishTime?: string;
  ownerReply?: any; // Owner response object
  photos?: any[]; // Review photos
}

interface GooglePlaceResponse {
  // Google Places API gibt Daten direkt auf Root-Ebene zurück (kein place-Subobjekt)
  displayName?: {
    text: string;
    languageCode: string;
  };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  reviews?: GooglePlaceReview[];
  name?: string; // Place ID oder Name
  id?: string; // Place ID
}

// Response Interface für unsere API
interface Review {
  id: string;
  text: string;
  rating: number;
  authorName: string;
  publishedAt: string;
  relativeTime: string;
  languageCode?: string;
  hasPhotos?: boolean;
  ownerResponse?: boolean;  // NEU!
  // Legacy fields für Kompatibilität
  author?: string;
  date?: string;
}

interface BusinessDetailsResponse {
  business: {
    name: string;
    address: string;
    rating: number;
    totalReviews: number;
  };
  strategicReviews: {
    latest: Review | null;
    best: Review | null;
    critical: Review | null;
  };
  allReviews: Review[];
}

// Helper: Formatiere Datum relativ (z.B. "vor 3 Tagen")
function formatRelativeDate(publishTime?: string, relativeDescription?: string): string {
  if (relativeDescription) {
    return relativeDescription;
  }
  
  if (!publishTime) {
    return 'Unbekannt';
  }

  try {
    const publishDate = new Date(publishTime);
    const now = new Date();
    const diffMs = now.getTime() - publishDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return diffMinutes <= 1 ? 'gerade eben' : `vor ${diffMinutes} Minuten`;
      }
      return diffHours === 1 ? 'vor einer Stunde' : `vor ${diffHours} Stunden`;
    } else if (diffDays === 1) {
      return 'vor einem Tag';
    } else if (diffDays < 7) {
      return `vor ${diffDays} Tagen`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? 'vor einer Woche' : `vor ${weeks} Wochen`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? 'vor einem Monat' : `vor ${months} Monaten`;
    } else {
      const years = Math.floor(diffDays / 365);
      return years === 1 ? 'vor einem Jahr' : `vor ${years} Jahren`;
    }
  } catch {
    return 'Unbekannt';
  }
}

// Helper: Generiere Review-ID aus Autor und Datum
function generateReviewId(author: string, publishTime?: string): string {
  const timestamp = publishTime ? new Date(publishTime).getTime() : Date.now();
  const authorHash = author.toLowerCase().replace(/\s+/g, '-').substring(0, 20);
  return `review_${authorHash}_${timestamp}`;
}

// Helper: Strategische Reviews auswählen
function selectStrategicReviews(reviews: Review[]): {
  latest: Review | null;
  best: Review | null;
  critical: Review | null;
} {
  if (!reviews || reviews.length === 0) {
    return { latest: null, best: null, critical: null };
  }

  console.log('=== SELECT STRATEGIC REVIEWS START ===');
  console.log('Total reviews:', reviews.length);
  console.log('All ratings:', reviews.map(r => `${r.authorName}: ${r.rating}★`));

  const usedIds = new Set<string>();
  
  // 1. LATEST: Neueste Review nach Datum
  const sortedByDate = [...reviews].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const latest = sortedByDate[0];
  usedIds.add(latest.id);
  console.log('✓ Latest selected:', latest.authorName, `(${latest.rating}★)`);
  
  // 2. BEST: 5-Sterne-Review mit längstem Text (NICHT latest)
  const fiveStarReviews = reviews
    .filter(r => r.rating === 5 && !usedIds.has(r.id))
    .sort((a, b) => b.text.length - a.text.length);
  
  const best = fiveStarReviews.length > 0 ? fiveStarReviews[0] : null;
  if (best) {
    usedIds.add(best.id);
    console.log('✓ Best selected:', best.authorName, `(${best.rating}★, ${best.text.length} chars)`);
  } else {
    console.log('⚠ No 5-star review found for Best');
  }
  
  // 3. CRITICAL: NIEDRIGSTES Rating (nicht verwendet)
  const unusedReviews = reviews.filter(r => !usedIds.has(r.id));
  console.log('Unused reviews for critical:', unusedReviews.map(r => `${r.authorName}: ${r.rating}★`));
  
  // Sortiere nach Rating (niedrigste zuerst), dann nach Datum
  const sortedByRating = [...unusedReviews].sort((a, b) => {
    if (a.rating !== b.rating) {
      return a.rating - b.rating;  // NIEDRIGSTES Rating zuerst!
    }
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
  
  const critical = sortedByRating.length > 0 ? sortedByRating[0] : null;
  if (critical) {
    console.log('✓ Critical selected:', critical.authorName, `(${critical.rating}★)`);
  } else {
    console.log('⚠ No unused review for Critical');
  }
  
  console.log('=== SELECT STRATEGIC REVIEWS END ===');
  console.log('Unique selections:', usedIds.size, 'of', reviews.length, 'reviews');
  
  return { latest, best, critical };
}

export async function POST(request: NextRequest) {
  try {
    // Logging am Anfang
    console.log('=== Places Details API Called ===');
    
    // Request Body parsen
    const body = await request.json();
    console.log('Request body:', body);
    console.log('API Key exists:', !!GOOGLE_PLACES_API_KEY);
    
    const { placeId } = body;

    // 2. Validierung: placeId vorhanden?
    if (!placeId || typeof placeId !== 'string' || placeId.trim() === '') {
      return NextResponse.json(
        { error: 'placeId is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // 3. Validierung: API Key vorhanden?
    if (!GOOGLE_PLACES_API_KEY) {
      console.error('GOOGLE_PLACES_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Google Places API key is not configured' },
        { status: 500 }
      );
    }

    // 4. Google Places API aufrufen
    const apiUrl = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
    
    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'displayName,formattedAddress,rating,userRatingCount,reviews,photos',
      },
    });

    // Logging nach fetch() Call
    console.log('Google API Response Status:', apiResponse.status);
    console.log('Google API Response OK:', apiResponse.ok);

    const data: GooglePlaceResponse = await apiResponse.json();
    console.log('Google API Response Data:', JSON.stringify(data, null, 2));

    // Debug: RAW GOOGLE REVIEWS (vor Mapping)
    console.log('');
    console.log('🔍 RAW GOOGLE REVIEWS:');
    if (data.reviews) {
      data.reviews.forEach((review: any, idx: number) => {
        console.log(`${idx + 1}. ${review.authorAttribution?.displayName || 'Unknown'} (${review.rating}★)`);
        console.log(`   Has photos: ${review.photos ? 'YES (' + review.photos.length + ')' : 'NO'}`);
      });
    } else {
      console.log('❌ NO REVIEWS IN RESPONSE');
    }
    console.log('');

    // Debug: RAW GOOGLE RESPONSE
    console.log('=== RAW GOOGLE RESPONSE ===');
    console.log('Reviews count:', data.reviews?.length);
    console.log('First review sample:', JSON.stringify(data.reviews?.[0], null, 2));

    // 5. API Response prüfen
    if (!apiResponse.ok) {
      console.error('Google API Error Response:', data);
      const errorMessage = (data as any).error?.message || `Google API Error: ${apiResponse.status}`;
      throw new Error(errorMessage);
    }

    // 6. Validierung: Response-Daten vorhanden?
    // Google Places API gibt Daten direkt auf Root-Ebene zurück
    const responseBody = data;
    
    // Prüfe ob mindestens ein Feld vorhanden ist (displayName oder name)
    if (!responseBody.displayName && !responseBody.name) {
      console.error('[FINAL PAYLOAD] Invalid API response: keine Business-Daten gefunden');
      // Gib 200 OK mit leerer Struktur zurück statt 500
      return NextResponse.json({
        business: {
          name: 'Unbekanntes Business',
          address: '',
          rating: 0,
          totalReviews: 0,
        },
        strategicReviews: {
          latest: null,
          best: null,
          critical: null,
        },
        allReviews: [],
      }, { status: 200 });
    }

    // 7-11. Gesamte Datenverarbeitung in robustem try-catch
    let businessName = 'Unbekanntes Business';
    let businessAddress = 'Adresse nicht verfügbar';
    let averageRating = 0;
    let reviewCount = 0;
    let reviews: Review[] = [];
    let strategicReviews: {
      latest: Review | null;
      best: Review | null;
      critical: Review | null;
    } = { latest: null, best: null, critical: null };

    try {
      // 7. Business-Informationen extrahieren - Direkt aus Root-Ebene
      businessName = responseBody.displayName?.text || responseBody.name || 'Unbekanntes Business';
      businessAddress = responseBody.formattedAddress || 'Adresse nicht verfügbar';
      averageRating = responseBody.rating || 0;
      reviewCount = responseBody.userRatingCount || 0;

      console.log('Extracted Business Info:', {
        name: businessName,
        address: businessAddress,
        rating: averageRating,
        reviewCount: reviewCount,
        reviewsAvailable: responseBody.reviews?.length || 0,
      });

      // 8. Reviews verarbeiten - Robustes Parsing mit Error Handling
      if (responseBody.reviews && Array.isArray(responseBody.reviews) && responseBody.reviews.length > 0) {
        reviews = responseBody.reviews
          .filter((review: any) => review != null) // Filtere null/undefined
          .map((review: any) => {
            try {
              // Review Text: Kann in text.text oder originalText.text sein
              const reviewText = review.text?.text || review.originalText?.text || '';
              const authorName = review.authorAttribution?.displayName || 'Anonym';
              const rating = Number(review.rating) || 0;
              const publishTime = review.publishTime || new Date().toISOString();
              const relativeDate = review.relativePublishTimeDescription || 'Vor kurzem';
              // Extrahiere languageCode aus text oder originalText
              const languageCode = review.text?.languageCode || review.originalText?.languageCode || 'de';
              
              // Debug Logging für Photos
              if (review.photos && review.photos.length > 0) {
                console.log('Review with photos found:', {
                  author: authorName,
                  photoCount: review.photos.length,
                  photos: review.photos
                });
              }
              
              // Prüfe ob Photos vorhanden sind
              const hasPhotos = !!(review.photos && review.photos.length > 0);
              
              // Prüfe ob Owner Response vorhanden ist
              const ownerResponse = !!(review.authorAttribution?.isOwner || review.ownerReply);

              return {
                id: review.name || generateReviewId(authorName, publishTime),
                text: reviewText,
                rating: Math.max(1, Math.min(5, rating)), // Clamp zwischen 1-5
                authorName: authorName,
                publishedAt: publishTime,
                relativeTime: relativeDate,
                languageCode: languageCode,
                hasPhotos: hasPhotos,
                ownerResponse: ownerResponse,
                // Legacy fields für Kompatibilität
                author: authorName,
                date: formatRelativeDate(publishTime, relativeDate),
              };
            } catch (reviewError) {
              console.error('Error parsing individual review:', reviewError, review);
              return null;
            }
          })
          .filter((review) => review !== null) as Review[]; // Filtere fehlerhafte Reviews
        
        // Debug: Zähle Reviews mit Photos
        const reviewsWithPhotos = reviews.filter(r => r.hasPhotos);
        console.log('Total reviews with photos:', reviewsWithPhotos.length);
        console.log('Reviews with photos details:', reviewsWithPhotos.map(r => ({
          author: r.authorName,
          hasPhotos: r.hasPhotos
        })));
        
        // Debug: MAPPED REVIEWS
        console.log('=== MAPPED REVIEWS ===');
        reviews.forEach((review, idx) => {
          console.log(`Review ${idx}:`, {
            author: review.authorName,
            rating: review.rating,
            hasPhotos: review.hasPhotos,
            photosInRaw: data.reviews?.[idx]?.photos?.length || 0
          });
        });
      }
      
      console.log(`Successfully parsed ${reviews.length} reviews`);

      // 9. Reviews nach Datum sortieren (neueste zuerst)
      if (reviews.length > 0) {
        reviews.sort((a, b) => {
          try {
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return dateB - dateA;
          } catch {
            return 0; // Bei Fehler: Reihenfolge beibehalten
          }
        });
      }

      // Debug: ALL MAPPED REVIEWS
      console.log('=== ALL MAPPED REVIEWS ===');
      reviews.forEach((review, idx) => {
        console.log(`${idx + 1}. ${review.authorName} (${review.rating}★) - ${review.text.substring(0, 50)}...`);
      });
      console.log('Total mapped reviews:', reviews.length);

      // 10. Strategische Reviews auswählen
      try {
        console.log('');
        console.log('='.repeat(60));
        console.log('ABOUT TO CALL selectStrategicReviews');
        console.log('Reviews available:', reviews.length);
        console.log('Reviews:', reviews.map(r => `${r.authorName} (${r.rating}★)`).join(', '));
        console.log('='.repeat(60));
        
        strategicReviews = selectStrategicReviews(reviews);
        
        console.log('');
        console.log('='.repeat(60));
        console.log('AFTER selectStrategicReviews');
        console.log('Latest:', strategicReviews.latest?.authorName, strategicReviews.latest?.rating);
        console.log('Best:', strategicReviews.best?.authorName, strategicReviews.best?.rating);
        console.log('Critical:', strategicReviews.critical?.authorName, strategicReviews.critical?.rating);
        console.log('='.repeat(60));
        console.log('');
      } catch (selectError) {
        console.error('Error in selectStrategicReviews:', selectError);
        // Fallback: Gib einfach die ersten 3 Reviews zurück
        strategicReviews = {
          latest: reviews[0] || null,
          best: reviews[1] || null,
          critical: reviews[2] || null,
        };
      }
    } catch (processingError) {
      // Detailliertes Error Logging, aber gib 200 OK zurück
      console.error('=== ERROR IN DATA PROCESSING ===');
      console.error('Error name:', (processingError as any)?.name);
      console.error('Error message:', (processingError as any)?.message);
      console.error('Full error:', processingError);
      console.error('Stack trace:', (processingError as any)?.stack);
      
      // Verwende bereits extrahierte Werte oder Fallbacks
      // reviews bleibt leeres Array, strategicReviews bleibt null
    }

    // 11. Erfolgreiche Response zurückgeben - IMMER 200 OK mit valider Struktur
    const response: BusinessDetailsResponse = {
      business: {
        name: businessName,
        address: businessAddress,
        rating: averageRating,
        totalReviews: reviewCount,
      },
      strategicReviews: {
        latest: strategicReviews.latest || null,
        best: strategicReviews.best || null,
        critical: strategicReviews.critical || null,
      },
      allReviews: reviews || [],
    };

    // FINAL PAYLOAD LOGGING - Für Debugging
    console.log('[FINAL PAYLOAD] Sende Daten mit folgenden Schlüsseln:', Object.keys(response));
    console.log('[FINAL PAYLOAD] Strategic Reviews Keys:', Object.keys(response.strategicReviews));
    console.log('[FINAL PAYLOAD] Latest Review:', response.strategicReviews.latest ? {
      id: response.strategicReviews.latest.id,
      author: response.strategicReviews.latest.author,
      rating: response.strategicReviews.latest.rating,
      textLength: response.strategicReviews.latest.text.length,
    } : 'null');
    console.log('[FINAL PAYLOAD] Best Review:', response.strategicReviews.best ? {
      id: response.strategicReviews.best.id,
      author: response.strategicReviews.best.author,
      rating: response.strategicReviews.best.rating,
    } : 'null');
    console.log('[FINAL PAYLOAD] Critical Review:', response.strategicReviews.critical ? {
      id: response.strategicReviews.critical.id,
      author: response.strategicReviews.critical.author,
      rating: response.strategicReviews.critical.rating,
    } : 'null');
    console.log('[FINAL PAYLOAD] Full Response JSON:', JSON.stringify(response, null, 2));

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    // Detailliertes Error Logging
    console.error('=== DETAILED ERROR ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    console.error('Stack trace:', error.stack);

    // JSON Parse Error
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: error.message || 'Invalid JSON in request body',
          details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        },
        { status: 400 }
      );
    }

    // Network Error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        {
          error: error.message || 'Network error: Could not reach Google Places API',
          details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        },
        { status: 503 }
      );
    }

    // Allgemeiner Fehler
    return NextResponse.json(
      {
        error: error.message || 'Internal server error while fetching place details',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

