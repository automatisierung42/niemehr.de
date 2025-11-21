'use client'

import React, { useState, useRef, useEffect } from 'react'

interface ReviewSearchFormProps {
  onScanSubmit: (businessName: string) => void
  isScanning: boolean
}

interface MockBusiness {
  id: string
  name: string
  type: 'restaurant' | 'doctor'
  location: string
  placeId: string
}

interface Review {
  id: string
  author: string
  rating: number
  text: string
  date: string
  selectedReason?: 'newest' | 'five_star_with_text' | 'lowest_rating'
}

interface BusinessData {
  businessInfo: {
    placeId: string
    name: string
    location: string
    type: 'restaurant' | 'doctor' | 'salon'
  }
  reviews: Review[]
}

// Mock-Business-Daten für Dropdown
const MOCK_BUSINESSES: MockBusiness[] = [
  {
    id: '1',
    name: 'Burger Palace Berlin-Mitte',
    type: 'restaurant',
    location: 'Berlin-Mitte',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
  },
  {
    id: '2',
    name: 'Praxis Dr. Müller Berlin',
    type: 'doctor',
    location: 'Berlin-Charlottenburg',
    placeId: 'ChIJPraxisMuellerBerlin'
  },
  {
    id: '3',
    name: 'Ristorante Bella Italia',
    type: 'restaurant',
    location: 'Berlin-Prenzlauer Berg',
    placeId: 'ChIJBellaItaliaBerlin'
  }
]

export function ReviewSearchForm({ onScanSubmit, isScanning }: ReviewSearchFormProps) {
  const [businessName, setBusinessName] = useState('')
  const [filteredBusinesses, setFilteredBusinesses] = useState<MockBusiness[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessData | null>(null)
  const [loadingReviews, setLoadingReviews] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (businessName.length > 0) {
      const filtered = MOCK_BUSINESSES.filter(business =>
        business.name.toLowerCase().includes(businessName.toLowerCase())
      )
      setFilteredBusinesses(filtered)
      setShowDropdown(filtered.length > 0)
    } else {
      setFilteredBusinesses([])
      setShowDropdown(false)
    }
  }, [businessName])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleBusinessSelect = async (business: MockBusiness) => {
    setBusinessName(business.name)
    setShowDropdown(false)
    setLoadingReviews(true)

    try {
      const response = await fetch(`/api/fetch-reviews?placeId=${encodeURIComponent(business.placeId)}`)
      if (!response.ok) throw new Error('Failed to fetch reviews')
      
      const data = await response.json()
      setSelectedBusiness(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      setSelectedBusiness(null)
    } finally {
      setLoadingReviews(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (businessName.trim() && !isScanning) {
      onScanSubmit(businessName.trim())
    }
  }

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div className="w-full relative">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-4 sm:flex-row relative">
          {/* Input-Feld mit Dropdown */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value)
                setSelectedBusiness(null)
              }}
              onFocus={() => {
                if (filteredBusinesses.length > 0) {
                  setShowDropdown(true)
                }
              }}
              placeholder="Dein Business-Name (z.B. Praxis Dr. Müller Berlin)"
              disabled={isScanning}
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-6 py-4 text-base md:text-lg text-primary-dark placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
              required
            />

            {/* Dropdown */}
            {showDropdown && filteredBusinesses.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
              >
                {filteredBusinesses.map((business) => (
                  <button
                    key={business.id}
                    type="button"
                    onClick={() => handleBusinessSelect(business)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-semibold text-primary-dark">{business.name}</div>
                    <div className="text-sm text-gray-500">{business.location}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA-Button */}
          <button
            type="submit"
            disabled={isScanning || !businessName.trim()}
            className="rounded-lg bg-secondary px-6 md:px-8 py-4 text-base md:text-lg font-semibold text-white transition-all hover:bg-opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-10 md:px-12"
          >
            {isScanning ? (
              <span className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Scanne Google-Profil...
              </span>
            ) : (
              'Beispiel-Antworten sehen →'
            )}
          </button>
        </div>
      </form>

      {/* Business Info & Reviews Preview */}
      {loadingReviews && (
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Lade Reviews...</span>
          </div>
        </div>
      )}

      {selectedBusiness && !loadingReviews && (
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-primary-dark mb-2">{selectedBusiness.businessInfo.name}</h3>
            <p className="text-gray-600">{selectedBusiness.businessInfo.location}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-primary-dark">Beispiel-Antworten auf deine Reviews:</h4>
            {selectedBusiness.reviews.map((review) => {
              // Generische Antwort für schlechte Reviews
              const isEscalation = review.rating <= 2
              const response = isEscalation
                ? 'Das tut uns leid. Wir nehmen uns der Sache an. Bitte kontaktieren Sie uns direkt unter [Kontakt], damit wir das für Sie klären können. Mit freundlichen Grüßen, Ihr Team'
                : 'Vielen Dank für Ihr Feedback. Wir freuen uns über Ihre Bewertung und hoffen, Sie bald wieder begrüßen zu dürfen. Mit freundlichen Grüßen, Ihr Team'

              return (
                <div key={review.id} className="border-t border-gray-200 pt-4 first:border-t-0 first:pt-0">
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-primary-dark">{review.author}</span>
                      <span className="text-yellow-500">
                        {renderStars(review.rating)}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">"{review.text}"</p>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs text-gray-500">{review.date}</p>
                      {review.selectedReason && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                          {review.selectedReason === 'newest' && '🆕 Neueste'}
                          {review.selectedReason === 'five_star_with_text' && '⭐ 5-Sterne'}
                          {review.selectedReason === 'lowest_rating' && '📉 Schlechteste'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`rounded-lg p-3 mt-2 ${isEscalation ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                    {isEscalation && (
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-xs font-semibold text-yellow-800 bg-yellow-200 px-2 py-1 rounded">
                          ⚠ SMS gesendet – Antwort in 24h automatisch
                        </span>
                      </div>
                    )}
                    <p className="text-xs font-semibold text-gray-700 mb-1">Unsere Antwort:</p>
                    <p className="text-sm text-gray-800">{response}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

