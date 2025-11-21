'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface GeneratedResponses {
  reviewId: string;
  professional: string;
  friendly: string;
  casual: string;
}

interface ResultsViewProps {
  reviews: Review[];
  responses: GeneratedResponses[];
  selectedStyle: 'professional' | 'friendly' | 'casual';
  businessName: string;
}

export function ResultsView({ reviews, responses, selectedStyle, businessName }: ResultsViewProps) {
  const [selectedUpsell, setSelectedUpsell] = useState<'all' | 'new'>('all');

  const getResponseForReview = (reviewId: string) => {
    const responseSet = responses.find(r => r.reviewId === reviewId);
    if (!responseSet) return '';
    return responseSet[selectedStyle];
  };

  const getConfidence = (reviewId: string, rating: number): number => {
    // Für schlechte Reviews: Immer niedrige Confidence (gelb)
    if (rating <= 2) {
      return 0.72;
    }
    // Mock confidence scores - in real app, this would come from AI
    const baseConfidence = selectedStyle === 'professional' ? 0.95 : selectedStyle === 'friendly' ? 0.88 : 0.75;
    return baseConfidence;
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.9) {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">✓ {Math.round(confidence * 100)}% Confidence</span>;
    } else {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">⚠ {Math.round(confidence * 100)}% Confidence - Würden wir dir zur Freigabe schicken</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-5xl md:text-6xl mb-4"
          >
            ✅
          </motion.div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark mb-4">
            Perfekt! So würden wir für dich antworten:
          </h1>
        </motion.div>

        {/* Reviews with Responses */}
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
          {reviews.map((review, index) => {
            const isEscalation = review.rating <= 2;
            const response = isEscalation
              ? 'Das tut uns leid. Wir nehmen uns der Sache an. Bitte kontaktieren Sie uns direkt unter [Kontakt], damit wir das für Sie klären können. Mit freundlichen Grüßen, Ihr Team'
              : getResponseForReview(review.id);
            const confidence = getConfidence(review.id, review.rating);

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl border-2 p-5 md:p-6 shadow-sm ${
                  isEscalation ? 'border-accent/50 bg-accent/5' : 'border-gray-200'
                }`}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-primary-dark">
                      Review {index + 1}: {review.author}
                    </h3>
                    <span className="text-yellow-500">{renderStars(review.rating)}</span>
                  </div>
                  <p className="text-gray-700 mb-2">"{review.text || 'Kein Text'}"</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-primary-dark">Unsere Antwort:</h4>
                    {getConfidenceBadge(confidence)}
                  </div>
                  
                  {isEscalation && (
                    <div className="mb-3 p-3 bg-accent/10 border border-accent/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-semibold text-sm">
                          ⚠ SMS gesendet – Antwort in 24h automatisch
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className={`rounded-lg p-4 mb-3 ${
                    isEscalation ? 'bg-accent/5 border border-accent/20' : 'bg-gray-50'
                  }`}>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm md:text-base">{response}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="text-green-500 mr-1">✓</span>
                      Posted: {isEscalation ? 'Automatisch (generisch)' : 'Sofort'}
                    </span>
                    <span className="flex items-center">
                      <span className={isEscalation ? 'text-yellow-500 mr-1' : 'text-green-500 mr-1'}>
                        {isEscalation ? '⚠' : '✓'}
                      </span>
                      {isEscalation ? 'Wartet auf persönliche Antwort' : 'Ton: Passt perfekt'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Upsell Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border-2 border-secondary p-6 md:p-8 mb-8 md:mb-12 shadow-lg"
        >
          <div className="text-center mb-6">
            <span className="text-3xl md:text-4xl mb-4 block">💡</span>
            <h2 className="text-xl md:text-2xl font-bold text-primary-dark mb-2">
              Das war's noch nicht!
            </h2>
            <p className="text-base md:text-lg text-gray-700">
              Du hast <span className="font-bold text-secondary">47 unbeantwortete Reviews</span> der letzten 4 Wochen.
            </p>
          </div>

          {/* Review Thumbnails */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded p-2 text-xs text-center h-16 flex items-center justify-center"
              >
                Review {i + 1}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-700 mb-6">
            Sollen wir die auch für dich beantworten?
          </p>

          <div className="space-y-3 mb-6">
            <label
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedUpsell === 'all'
                  ? 'border-secondary bg-secondary bg-opacity-5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="upsell"
                value="all"
                checked={selectedUpsell === 'all'}
                onChange={() => setSelectedUpsell('all')}
                className="mr-3 w-5 h-5 text-secondary"
              />
              <div>
                <span className="font-semibold">Ja, alle 47 Reviews</span>
                <span className="text-gray-600 block text-sm">
                  (Einmalig €0, dann normal €149/Monat)
                </span>
              </div>
            </label>

            <label
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedUpsell === 'new'
                  ? 'border-secondary bg-secondary bg-opacity-5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="upsell"
                value="new"
                checked={selectedUpsell === 'new'}
                onChange={() => setSelectedUpsell('new')}
                className="mr-3 w-5 h-5 text-secondary"
              />
              <div>
                <span className="font-semibold">Nein danke, nur neue Reviews ab jetzt</span>
              </div>
            </label>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-primary-dark mb-6">
            Bereit loszulegen?
          </h2>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-6"
          >
            <Link
              href="/api/auth/google"
              className="inline-block bg-secondary text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              Jetzt kostenlos starten →
            </Link>
          </motion.div>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <span className="flex items-center">
              <span className="text-green-500 mr-1">✓</span>
              Setup in 30 Sekunden
            </span>
            <span className="flex items-center">
              <span className="text-green-500 mr-1">✓</span>
              14 Tage kostenlos
            </span>
            <span className="flex items-center">
              <span className="text-green-500 mr-1">✓</span>
              Jederzeit kündbar
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

