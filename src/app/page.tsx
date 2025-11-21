'use client'

import React, { useState } from 'react'
import { RatingBoostHero } from '@/components/landing/RatingBoostHero'
import { ScanResultModal } from '@/components/landing/ScanResultModal'
import { FeaturesSection } from '@/components/ui/FeaturesSection'
import { ResponseComparison } from '@/components/landing/ResponseComparison'
import StickyPricingButton from '@/components/StickyPricingButton'
import PricingSection from '@/components/PricingSection'
import CriticalReviewsInfo from '@/components/CriticalReviewsInfo'
import ReviewPreview from '@/components/ReviewPreview'
import { BusinessScanData } from '@/components/BusinessSearchWithPreview'

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [scannedBusiness, setScannedBusiness] = useState('')
  const [scannedBusinessData, setScannedBusinessData] = useState<BusinessScanData | null>(null)

  const handleScanComplete = (data: BusinessScanData) => {
    setScannedBusinessData(data)
    setScannedBusiness(data.business.name)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Sticky Pricing Button */}
      <StickyPricingButton />

      {/* 1. HERO mit dem Suchfeld als zentrale CTA */}
      <RatingBoostHero onScanComplete={handleScanComplete} />

      {/* Review Preview - wird nur angezeigt wenn Business gescannt wurde */}
      {scannedBusinessData && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <ReviewPreview
              business={scannedBusinessData.business}
              latestReview={scannedBusinessData.latestReview}
              aiResponses={scannedBusinessData.aiResponses}
              isGeneratingAI={scannedBusinessData.isGeneratingAI}
            />
          </div>
        </section>
      )}

      {/* 2. Vergleichssektion: So antworten die meisten vs. niemehr.de */}
      <ResponseComparison />

      {/* 3. Vertrauensmerkmale (Die Überzeugungs-Sektion) */}
      <FeaturesSection />

      {/* FREE Tier Kommunikation */}
      <div className="text-center py-12 bg-emerald-50">
        <p className="text-2xl font-bold text-gray-800 mb-2">👆 Das war die FREE Preview</p>
        <p className="text-lg text-gray-600">
          Du hast gerade gesehen, was niemehr.de kann.
          <br />
          Mit PRO kannst du es wirklich nutzen – für dein Business.
        </p>
      </div>

      {/* 5. Pricing Section */}
      <section id="preis" className="py-24 bg-gray-50">
        <PricingSection />
      </section>

      {/* 6. Final CTA */}
      <section className="bg-emerald-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Bereit, <span className="text-white underline decoration-emerald-300">nie mehr</span> zu antworten?
          </h2>
          <a
            href="/api/auth/google"
            className="inline-block bg-white text-emerald-600 hover:bg-gray-100 text-xl md:text-2xl font-black py-4 md:py-6 px-10 rounded-full shadow-2xl transition transform hover:scale-105"
          >
            Jetzt 14 Tage kostenlos starten
          </a>
          <p className="mt-6 text-xl opacity-90">0 € heute • 0 Risiko • 100 % mehr Leben</p>
        </div>
      </section>

      {/* 4. Das Pop-up, das den Schmerz zeigt */}
      <ScanResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        businessName={scannedBusiness}
      />
    </main>
  )
}

