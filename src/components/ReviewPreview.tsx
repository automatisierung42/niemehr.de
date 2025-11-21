'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Copy, Check, Star, Zap, Shield } from 'lucide-react';
import BlurOverlay from './BlurOverlay';
import CriticalReviewsInfo from './CriticalReviewsInfo';

interface Review {
  id: string;
  text: string;
  rating: number;
  author: string;
  authorName?: string;
  date?: string;
  relativeTime?: string;
  languageCode?: string;
  hasPhotos?: boolean;
  ownerResponse?: boolean;
}

interface AIResponses {
  friendly: string;
  professional: string;
  witty: string;
}

interface BusinessData {
  placeId: string;
  name: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: Review[];
}

interface ReviewPreviewProps {
  business: BusinessData;
  latestReview: Review | null;
  aiResponses: AIResponses | null;
  isGeneratingAI?: boolean;
}

// LocalStorage Tracking für Anti-Scraping
const STORAGE_KEY = 'niemehr_business_searches';

interface BusinessSearchTracking {
  [placeId: string]: {
    lastSearched: string;
    searchCount: number;
    reviewsShown: string[];
  };
}

function getTrackingData(): BusinessSearchTracking {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
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

function getBlurredText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Generiert Mock-Daten für KI-Antworten basierend auf der Review-Sprache
 * 
 * WICHTIG: Die Antworten MÜSSEN in der gleichen Sprache wie die Review sein (Hard-Constraint)
 * 
 * @param reviewLanguage Die Sprache der Review ('en', 'de', etc.)
 * @returns Mock-AI-Responses in der korrekten Sprache
 */
function generateMockAiResponses(reviewLanguage: string = 'en'): AIResponses {
  // Hard-Constraint: LANGUAGE_MATCH - Antworten müssen in der Review-Sprache sein
  if (reviewLanguage === 'en' || !reviewLanguage || reviewLanguage === '') {
    // Englische Mock-Antworten (Standard, da die Beispiel-Review auf Englisch ist)
    return {
      friendly: "Thank you so much for your wonderful review of Tierpark Berlin! The red pandas are truly delightful, and we're sorry to hear there was confusion about the feeding time. We'll check on this right away. We're thrilled that you enjoyed the beauty and spaciousness of our park during your autumn walk. We hope to welcome you back soon!",
      professional: "Dear Juliet, we sincerely thank you for your detailed feedback regarding Tierpark Berlin. We apologize that the stated feeding time for the red pandas was not accurate; we will review and correct this immediately. However, we are pleased that you appreciated the beauty and size of our facility for a relaxing stroll. We would be delighted to welcome you back again.",
      witty: "Hey Juliet, thanks for the panda love and honest feedback! 🐼 Sorry the panda party at feeding time didn't happen – we'll check on that right away. But great to hear you still rocked our park! Come back soon, maybe with a coffee for the pandas 😉",
    };
  } else if (reviewLanguage === 'de') {
    // Deutsche Mock-Antworten
    return {
      friendly: "Vielen Dank für Ihre wunderbare Bewertung des Tierparks Berlin! Die Roten Pandas sind wirklich entzückend, und es tut uns leid zu hören, dass es bei der Fütterungszeit Unklarheiten gab. Wir überprüfen das sofort. Es freut uns sehr, dass Sie die Schönheit und Weitläufigkeit unseres Parks bei Ihrem Herbstspaziergang genießen konnten. Wir hoffen, Sie bald wieder begrüßen zu dürfen!",
      professional: "Sehr geehrte/r Juliet, wir danken Ihnen herzlich für Ihre detaillierte Rückmeldung zum Tierpark Berlin. Es tut uns leid, dass die angegebene Fütterungszeit für die Roten Pandas nicht korrekt war; wir werden dies umgehend überprüfen und korrigieren. Es freut uns jedoch, dass Sie die Schönheit und Größe unserer Anlage für einen entspannenden Spaziergang schätzen. Wir würden uns freuen, Sie erneut bei uns begrüßen zu dürfen.",
      witty: "Hey Juliet, danke für die Panda-Liebe und das ehrliche Feedback! 🐼 Sorry, dass die Panda-Party bei der Fütterung ausgefallen ist – wir checken das sofort. Aber schön, dass du unseren Park trotzdem gerockt hast! Komm bald wieder, vielleicht mit einem Kaffee für die Pandas 😉",
    };
  } else {
    // Fallback: Englisch (Standard)
    return {
      friendly: "Thank you so much for your wonderful review! We appreciate your feedback and will address your concerns immediately. We hope to welcome you back soon!",
      professional: "Dear guest, we sincerely thank you for your detailed feedback. We apologize for any inconvenience and will review this matter immediately. We would be delighted to welcome you back.",
      witty: "Hey there, thanks for the honest feedback! We'll check on that right away. Come back soon! 😉",
    };
  }
}

export default function ReviewPreview({ business, latestReview, aiResponses, isGeneratingAI = false }: ReviewPreviewProps) {
  const [showBlur, setShowBlur] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState<string | null>(null);

  useEffect(() => {
    // Prüfe Anti-Scraping Status
    const blurStatus = shouldShowBlur(business.placeId);
    setShowBlur(blurStatus);
  }, [business.placeId]);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedResponse(id);
      setTimeout(() => setCopiedResponse(null), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  if (!latestReview) {
    return null;
  }

  const authorName = latestReview.authorName || latestReview.author || 'Anonym';
  const relativeTime = latestReview.relativeTime || latestReview.date || 'Vor kurzem';

  // Hard-Constraint: LANGUAGE_MATCH - Mock-Daten müssen in der Review-Sprache sein
  const reviewLanguage = latestReview.languageCode || 'en';
  const mockResponses = generateMockAiResponses(reviewLanguage);

  // Verwende Mock-Daten falls aiResponses nicht vorhanden
  // WICHTIG: Mock-Daten respektieren die LANGUAGE_MATCH Regel
  const displayAiResponses = aiResponses || mockResponses;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-6 md:mb-10 text-center">
        So antwortet niemehr.de auf die Reviews von{' '}
        <span className="text-emerald-600">{business.name}</span>
      </h2>

      {/* A) NEUESTE REVIEW - Volle Breite, Unblurred */}
      <div className="mb-8 md:mb-12">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-emerald-600">
            Neueste Review (Live-Vorschau)
          </h3>
        </div>

        <div className="relative bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-gray-200 overflow-hidden">
          {/* Review Header */}
          <div className="px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 flex items-center gap-2">
            <Sparkles className="text-white" size={20} />
            <span className="font-semibold text-white text-sm md:text-base">Neueste Bewertung</span>
          </div>

          {/* Review Content */}
          <div className="p-4 md:p-6 lg:p-8">
            <div className="flex items-start justify-between mb-3 md:mb-4">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-base md:text-lg">{authorName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm md:text-base text-gray-500">{relativeTime}</p>
                  {latestReview.hasPhotos && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      📷 Mit Fotos
                    </span>
                  )}
                </div>
              </div>
              {renderStars(latestReview.rating)}
            </div>

            <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
              "{latestReview.text}"
            </p>

            {/* AI Responses - Alle 3 Töne */}
            {isGeneratingAI ? (
              <div className="space-y-3 border-t pt-4 md:pt-6">
                <p className="text-sm md:text-base font-semibold text-gray-600 flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-600 animate-pulse" />
                  KI-generierte Antworten werden generiert...
                </p>
              </div>
            ) : displayAiResponses ? (
              <div className="space-y-4 md:space-y-5 border-t pt-5 md:pt-6 mt-5 md:mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={18} className="text-emerald-600" />
                  <p className="text-base md:text-lg font-bold text-gray-900">
                    KI-generierte Antworten (3 Töne):
                  </p>
                </div>

                {/* Friendly - Standard */}
                <div className="bg-green-50 rounded-xl p-4 md:p-5 border-2 border-green-300 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm md:text-base font-bold text-green-800">😊 Standard</span>
                      <span className="text-xs text-green-600 font-medium">(Freundlich & Warm)</span>
                    </div>
                    <button
                      onClick={() => handleCopy(displayAiResponses.friendly, 'friendly')}
                      className="text-green-600 hover:text-green-700 transition-colors p-1 hover:bg-green-100 rounded"
                      title="Antwort kopieren"
                    >
                      {copiedResponse === 'friendly' ? (
                        <Check size={20} />
                      ) : (
                        <Copy size={20} />
                      )}
                    </button>
                  </div>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed pl-1">
                    {displayAiResponses.friendly}
                  </p>
                </div>

                {/* Professional */}
                <div className="bg-blue-50 rounded-xl p-4 md:p-5 border-2 border-blue-300 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm md:text-base font-bold text-blue-800">👔 Professionell</span>
                      <span className="text-xs text-blue-600 font-medium">(Formell & Seriös)</span>
                    </div>
                    <button
                      onClick={() => handleCopy(displayAiResponses.professional, 'professional')}
                      className="text-blue-600 hover:text-blue-700 transition-colors p-1 hover:bg-blue-100 rounded"
                      title="Antwort kopieren"
                    >
                      {copiedResponse === 'professional' ? (
                        <Check size={20} />
                      ) : (
                        <Copy size={20} />
                      )}
                    </button>
                  </div>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed pl-1">
                    {displayAiResponses.professional}
                  </p>
                </div>

                {/* Witty */}
                <div className="bg-emerald-50 rounded-xl p-4 md:p-5 border-2 border-emerald-300 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm md:text-base font-bold text-emerald-800">😄 Witzig</span>
                      <span className="text-xs text-emerald-600 font-medium">(Locker & Mit Lokalkolorit)</span>
                    </div>
                    <button
                      onClick={() => handleCopy(displayAiResponses.witty, 'witty')}
                      className="text-emerald-600 hover:text-emerald-700 transition-colors p-1 hover:bg-emerald-100 rounded"
                      title="Antwort kopieren"
                    >
                      {copiedResponse === 'witty' ? (
                        <Check size={20} />
                      ) : (
                        <Copy size={20} />
                      )}
                    </button>
                  </div>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed pl-1">
                    {displayAiResponses.witty}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* B) FEATURE-BOXEN (statt weitere Reviews) */}
      <div className="space-y-6 md:space-y-8">
        {/* Feature Box 1: 4-5★ Reviews */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl p-6 md:p-8 border-2 border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                💬 4-5★ Reviews
              </h3>
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">→</span>
                  <span>Automatisch beantwortet</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">→</span>
                  <span>Du sparst Zeit</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">→</span>
                  <span>Keine manuelle Freigabe nötig</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature Box 2: 1-3★ Reviews */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl md:rounded-2xl p-6 md:p-8 border-2 border-orange-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                ⚠️ 1-3★ Reviews
              </h3>
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">→</span>
                  <span>Immer zur Freigabe</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">→</span>
                  <span>Volle Kontrolle</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">→</span>
                  <span>SMS mit "1" oder ignorieren</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Critical Reviews Info */}
        <CriticalReviewsInfo />
      </div>

      {/* CTA */}
      <div className="mt-8 md:mt-12 text-center">
        <a
          href="#preis"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-lg md:text-xl lg:text-2xl font-black py-4 md:py-6 px-8 md:px-12 rounded-full shadow-2xl transition transform hover:scale-105"
        >
          14 Tage kostenlos testen – Jetzt starten
        </a>
        <p className="text-sm md:text-base text-gray-500 mt-3 md:mt-4">
          Keine Kreditkarte erforderlich • Jederzeit kündbar
        </p>
      </div>
    </div>
  );
}

