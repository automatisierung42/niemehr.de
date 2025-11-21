import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader, Star, Copy, Check, ChevronDown, TrendingUp, Sparkles, Camera, AlertCircle } from 'lucide-react';

// TypeScript Interfaces
interface PlaceResult {
  place_id: string;
  name: string;
  formatted_address: string;
  rating: number;
  user_ratings_total: number;
  types: string[];
}

interface Review {
  id: string;
  text: string;
  rating: number;
  author: string;
  date: string;
  authorName?: string;
  publishedAt?: string;
  relativeTime?: string;
  languageCode?: string;
  hasPhotos?: boolean;
  ownerResponse?: boolean;  // NEU!
}

interface AIResponses {
  friendly: string;
  professional: string;
  witty: string;
}

// Interface für komplette Scan-Daten
export interface BusinessScanData {
  business: {
    placeId: string;
    name: string;
    formatted_address?: string;
    rating?: number;
    user_ratings_total?: number;
  };
  latestReview: Review | null;
  aiResponses: AIResponses | null;
  isGeneratingAI?: boolean;
}

interface BusinessSearchWithPreviewProps {
  onScanComplete?: (data: BusinessScanData) => void;
}

// LocalStorage Schema für Anti-Scraping
interface BusinessSearchTracking {
  [placeId: string]: {
    lastSearched: string; // ISO timestamp
    searchCount: number;
    reviewsShown: string[]; // Review IDs
  };
}

// Helper Functions für LocalStorage
const STORAGE_KEY = 'niemehr_business_searches';

function getTrackingData(): BusinessSearchTracking {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveTrackingData(data: BusinessSearchTracking): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore localStorage errors
  }
}

function trackBusinessSearch(placeId: string, reviewIds: string[]): boolean {
  const tracking = getTrackingData();
  const now = new Date().toISOString();
  const lastSearch = tracking[placeId];
  
  if (!lastSearch) {
    // Erste Suche
    tracking[placeId] = {
      lastSearched: now,
      searchCount: 1,
      reviewsShown: reviewIds,
    };
    saveTrackingData(tracking);
    return true; // Zeige komplett
  }
  
  // Prüfe ob innerhalb von 24h
  const lastSearchedDate = new Date(lastSearch.lastSearched);
  const hoursSinceLastSearch = (Date.now() - lastSearchedDate.getTime()) / (1000 * 60 * 60);
  
  if (hoursSinceLastSearch < 24) {
    // Zweite Suche innerhalb 24h - Update Tracking
    tracking[placeId] = {
      ...lastSearch,
      searchCount: lastSearch.searchCount + 1,
      reviewsShown: [...new Set([...lastSearch.reviewsShown, ...reviewIds])],
    };
    saveTrackingData(tracking);
    return false; // Zeige Blur
  }
  
  // Älter als 24h - Reset
  tracking[placeId] = {
    lastSearched: now,
    searchCount: 1,
    reviewsShown: reviewIds,
  };
  saveTrackingData(tracking);
  return true; // Zeige komplett
}

function shouldShowBlur(placeId: string): boolean {
  const tracking = getTrackingData();
  const lastSearch = tracking[placeId];
  
  if (!lastSearch) return false;
  
  const lastSearchedDate = new Date(lastSearch.lastSearched);
  const hoursSinceLastSearch = (Date.now() - lastSearchedDate.getTime()) / (1000 * 60 * 60);
  
  // Zeige Blur wenn bereits gesucht wurde UND innerhalb von 24h
  return lastSearch.searchCount > 1 && hoursSinceLastSearch < 24;
}

export default function BusinessSearchWithPreview({ onScanComplete }: BusinessSearchWithPreviewProps) {
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Selected Business State
  const [selectedBusiness, setSelectedBusiness] = useState<PlaceResult | null>(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // Reviews State
  const [strategicReviews, setStrategicReviews] = useState<{
    latest: Review | null;
    best: Review | null;
    critical: Review | null;
  } | null>(null);

  // AI Responses State
  const [aiResponses, setAiResponses] = useState<{
    latest: AIResponses | null;
    best: AIResponses | null;
    critical: AIResponses | null;
  }>({ latest: null, best: null, critical: null });

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Error State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Copy State
  const [copiedResponse, setCopiedResponse] = useState<string | null>(null);

  // Refs
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced Search
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (searchQuery.trim().length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await fetch('/api/places/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: searchQuery })
        });

        const data = await response.json() as { results?: PlaceResult[] };

        if (data.results && data.results.length > 0) {
          setSearchResults(data.results);
          setShowDropdown(true);
        } else {
          setSearchResults([]);
          setShowDropdown(false);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  }, [searchQuery]);

  // useEffect Hook für automatische KI-Generierung entfernt
  // KI-Generierung erfolgt jetzt direkt in handleSelectBusiness nur für 'latest'

  // Handle Business Selection
  const handleSelectBusiness = async (business: PlaceResult) => {
    setSelectedBusiness(business);
    setSearchQuery(business.name);
    setShowDropdown(false);
    setIsLoadingReviews(true);
    setErrorMessage(null); // Reset Error
    
    // Reset AI Responses für neues Business
    setAiResponses({ latest: null, best: null, critical: null });
    setStrategicReviews(null);
    
    // Track Business Search für Anti-Scraping
    // (Review IDs werden später hinzugefügt, wenn Reviews geladen sind)

    try {
      // Load Reviews
      const reviewsResponse = await fetch('/api/places/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placeId: business.place_id })
      });

      // Prüfe Response Status
      if (!reviewsResponse.ok) {
        throw new Error(`Failed to load reviews: ${reviewsResponse.status}`);
      }

      const reviewsData = await reviewsResponse.json() as {
        business?: {
          name: string;
          address: string;
          rating: number;
          totalReviews: number;
        };
        strategicReviews?: {
          latest: Review | null;
          best: Review | null;
          critical: Review | null;
        };
        allReviews?: Review[];
      };

      if (reviewsData.strategicReviews) {
        setStrategicReviews(reviewsData.strategicReviews);
        
        // Generiere AI-Antworten NUR für die neueste Review
        if (reviewsData.strategicReviews.latest) {
          setIsGeneratingAI(true);
          await generateAIResponse(
            reviewsData.strategicReviews.latest, 
            business.name, 
            'latest'
          );
          setIsGeneratingAI(false);
        }

        // Rufe onScanComplete Callback auf mit kompletten Daten
        if (onScanComplete) {
          const scanData: BusinessScanData = {
            business: {
              placeId: business.place_id,
              name: business.name,
              formatted_address: reviewsData.business?.address,
              rating: reviewsData.business?.rating,
              user_ratings_total: reviewsData.business?.totalReviews,
            },
            latestReview: reviewsData.strategicReviews.latest,
            aiResponses: aiResponses.latest,
            isGeneratingAI: isGeneratingAI,
          };
          onScanComplete(scanData);
        }
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
      // Zeige Error State an
      setStrategicReviews(null);
      setAiResponses({ latest: null, best: null, critical: null });
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Daten konnten nicht geladen werden. Bitte versuche es später erneut.'
      );
    } finally {
      setIsLoadingReviews(false);
    }
  };

  // Generate AI Response
  const generateAIResponse = async (
    review: Review,
    businessName: string,
    type: 'latest' | 'best' | 'critical'
  ): Promise<void> => {
    try {
      // Extrahiere languageCode aus Review (falls vorhanden) oder nutze 'de' als Default
      const languageCode = review.languageCode || 'de';

      console.log('=== AI Generation ===');
      console.log('Review Text:', review.text.substring(0, 50) + '...');
      console.log('Language Code:', languageCode);
      console.log('Business Name:', businessName);

      const response = await fetch('/api/ai/generate-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewText: review.text,
          reviewRating: review.rating,
          businessName: businessName,
          languageCode: languageCode
        })
      });

      // Prüfe Response Status
      if (!response.ok) {
        throw new Error(`AI API failed: ${response.status}`);
      }

      const data = await response.json() as {
        responses?: AIResponses;
      };

      console.log('AI Response received:', data);

      // Setze AI Responses (auch wenn nur Mock-Antworten)
      if (data.responses) {
        setAiResponses(prev => ({
          ...prev,
          [type]: data.responses
        }));
      } else {
        console.warn(`No responses in AI API response for ${type}`);
      }
    } catch (error) {
      console.error(`Error generating AI response for ${type}:`, error);
      // Setze leere Antworten, damit UI nicht hängt
      // Die API sollte aber immer Mock-Antworten zurückgeben
    }
  };

  // Copy to Clipboard
  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedResponse(id);
      setTimeout(() => setCopiedResponse(null), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  // Render Star Rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  // Render Preview Card (ohne AI-Antworten)
  const renderPreviewCard = (
    review: Review | null,
    label: string,
    labelColor: string,
    icon: React.ReactNode
  ) => {
    if (!review) return null;

    // Verwende authorName/relativeTime falls vorhanden, sonst Fallback auf author/date
    const authorName = (review as any).authorName || review.author || 'Anonym';
    const relativeTime = (review as any).relativeTime || review.date || 'Vor kurzem';

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
        {/* Review Header */}
        <div className={`px-6 py-3 ${labelColor} flex items-center gap-2`}>
          {icon}
          <span className="font-semibold text-white">{label}</span>
        </div>

        {/* Review Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-gray-900">{authorName}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-500">{relativeTime}</p>
                {review.hasPhotos && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    <Camera size={12} />
                    Mit Fotos
                  </span>
                )}
              </div>
            </div>
            {renderStars(review.rating)}
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            "{review.text.length > 200 ? review.text.substring(0, 200) + '...' : review.text}"
          </p>
          
          {/* Preview Badge */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              💡 Für diese Review werden automatisch Antworten generiert, sobald du dich anmeldest
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render No Critical Reviews Placeholder
  const renderNoCriticalReviewsPlaceholder = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 flex items-center gap-2">
        <Check size={20} className="text-white" />
        <span className="font-semibold text-white">Keine kritischen Bewertungen</span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Sparkles className="text-green-600" size={24} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Großartig! 🎉</p>
            <p className="text-sm text-gray-600">Keine negativen Bewertungen gefunden</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Toll! Dieses Unternehmen hat aktuell keine kritischen Bewertungen. 
          Falls doch mal grobe Kritik kommt, lassen wir es dich wissen und 
          generieren automatisch passende Antworten! 💪
        </p>
      </div>
    </div>
  );

  // Render Review Card - ROBUST mit Error Handling
  const renderReviewCard = (
    review: Review | null,
    aiResponses: AIResponses | null,
    label: string,
    labelColor: string,
    icon: React.ReactNode
  ) => {
    // DEBUG: Logge Review-Daten
    console.log(`[FRONTEND DEBUG] renderReviewCard called for ${label}:`, {
      reviewExists: !!review,
      reviewData: review ? {
        id: review.id,
        author: review.author,
        authorName: review.authorName,
        rating: review.rating,
        textLength: review.text?.length || 0,
        hasDate: !!review.date,
        relativeTime: review.relativeTime,
        hasPhotos: review.hasPhotos,
      } : null,
      aiResponsesExists: !!aiResponses,
    });
    
    // Debug: Logge hasPhotos spezifisch
    if (review) {
      console.log('Review hasPhotos:', review.hasPhotos);
    }

    if (!review) {
      console.warn(`[FRONTEND DEBUG] Review für ${label} ist null, überspringe Rendering`);
      return null;
    }

    // Sicherheits-Checks für Review-Properties
    // Verwende authorName/relativeTime falls vorhanden, sonst Fallback auf author/date
    const authorName = review.authorName || review.author || 'Anonym';
    const relativeTime = review.relativeTime || review.date || 'Vor kurzem';
    const rating = review.rating || 0;
    const text = review.text || 'Kein Text verfügbar';

    try {
      return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Review Header */}
          <div className={`px-6 py-3 ${labelColor} flex items-center gap-2`}>
            {icon}
            <span className="font-semibold text-white">{label}</span>
          </div>

          {/* Review Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900">{authorName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-500">{relativeTime}</p>
                  {review.hasPhotos && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      <Camera size={12} />
                      Mit Fotos
                    </span>
                  )}
                </div>
              </div>
              {renderStars(rating)}
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">"{text}"</p>

            {/* Unbeantwortet/Beantwortet Badge */}
            {review.ownerResponse ? (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-blue-600" />
                  <p className="text-sm text-blue-800 font-medium">
                    Bereits vom Inhaber beantwortet
                  </p>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  💡 Melde dich an um deine Antwort mit unserer zu vergleichen
                </p>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-yellow-600" />
                  <p className="text-sm text-yellow-800 font-medium">
                    Noch unbeantwortet
                  </p>
                </div>
                <p className="text-xs text-yellow-600 mt-1">
                  ⚡ Mit niemehr.de hätte diese Review innerhalb von 30 Sekunden eine professionelle Antwort
                </p>
              </div>
            )}

          {/* AI Responses */}
          {aiResponses ? (
            <div className="space-y-3 border-t pt-4">
              <p className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-600" />
                KI-generierte Antworten:
              </p>

              {/* Friendly */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-green-700">😊 FREUNDLICH</span>
                  <button
                    onClick={() => handleCopy(aiResponses.friendly, `friendly-${review.id}`)}
                    className="text-green-600 hover:text-green-700 transition-colors"
                  >
                    {copiedResponse === `friendly-${review.id}` ? (
                      <Check size={18} />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-700">{aiResponses.friendly}</p>
              </div>

              {/* Professional */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-700">👔 PROFESSIONELL</span>
                  <button
                    onClick={() => handleCopy(aiResponses.professional, `professional-${review.id}`)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {copiedResponse === `professional-${review.id}` ? (
                      <Check size={18} />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-700">{aiResponses.professional}</p>
              </div>

              {/* Witty */}
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-emerald-700">😄 WITZIG</span>
                  <button
                    onClick={() => handleCopy(aiResponses.witty, `witty-${review.id}`)}
                    className="text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    {copiedResponse === `witty-${review.id}` ? (
                      <Check size={18} />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-700">{aiResponses.witty}</p>
              </div>
            </div>
          ) : isGeneratingAI ? (
            <div className="space-y-3 border-t pt-4">
              <p className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-600 animate-pulse" />
                KI-generierte Antworten:
              </p>
              
              {/* Skeleton Loader für 3 Antworten */}
              <div className="space-y-3">
                {/* Friendly Skeleton */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200 animate-pulse">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-32 bg-green-200 rounded"></div>
                    <div className="h-5 w-5 bg-green-200 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-green-100 rounded w-full"></div>
                    <div className="h-4 bg-green-100 rounded w-3/4"></div>
                  </div>
                </div>

                {/* Professional Skeleton */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 animate-pulse">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-36 bg-blue-200 rounded"></div>
                    <div className="h-5 w-5 bg-blue-200 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-blue-100 rounded w-full"></div>
                    <div className="h-4 bg-blue-100 rounded w-4/5"></div>
                  </div>
                </div>

                {/* Witty Skeleton */}
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200 animate-pulse">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-28 bg-emerald-200 rounded"></div>
                    <div className="h-5 w-5 bg-emerald-200 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-emerald-100 rounded w-full"></div>
                    <div className="h-4 bg-emerald-100 rounded w-5/6"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center pt-2">
                <Loader className="animate-spin text-emerald-600" size={20} />
                <span className="ml-2 text-sm font-medium text-emerald-600">Analysiere und schreibe in 3 Tönen...</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      );
    } catch (cardError) {
      console.error(`[FRONTEND DEBUG] Error rendering ReviewCard für ${label}:`, cardError);
      // Fallback: Zeige einfache Review-Info ohne Card
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-semibold">{label}</p>
          <p className="text-red-600 text-sm">
            Review konnte nicht gerendert werden: {cardError instanceof Error ? cardError.message : 'Unbekannter Fehler'}
          </p>
          {review && (
            <div className="mt-2 text-xs text-gray-600">
              Author: {review.author || 'N/A'} | Rating: {review.rating || 'N/A'}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Search Section */}
      <div ref={searchRef} className="relative mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Suche dein Unternehmen (z.B. 'Hamburger Amrumerstr')"
            className="w-full pl-12 pr-4 py-3 md:py-4 text-base md:text-lg border-2 border-gray-300 rounded-xl focus:border-emerald-600 focus:outline-none transition-colors h-[70px] md:h-[80px]"
          />
          {isSearching && (
            <Loader className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-emerald-600" size={24} />
          )}
        </div>

        {/* Dropdown Results */}
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
            {searchResults.map((result) => (
              <button
                key={result.place_id}
                onClick={() => handleSelectBusiness(result)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{result.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{result.formatted_address}</p>
                    {result.types && result.types.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {result.types.slice(0, 3).join(' • ')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{result.rating}</span>
                    <span className="text-sm text-gray-500">({result.user_ratings_total})</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loading Reviews */}
      {isLoadingReviews && (
        <div className="flex items-center justify-center py-16">
          <Loader className="animate-spin text-emerald-600" size={40} />
          <span className="ml-4 text-lg md:text-xl text-gray-600">Analysiere Reviews...</span>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && !isLoadingReviews && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-800 font-semibold mb-2">Fehler beim Laden der Daten</p>
          <p className="text-red-600 text-sm">{errorMessage}</p>
          <button
            onClick={() => {
              setErrorMessage(null);
              if (selectedBusiness) {
                handleSelectBusiness(selectedBusiness);
              }
            }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      )}

      {/* Preview wird jetzt in ReviewPreview Komponente gerendert (siehe page.tsx) */}
    </div>
  );
}

