'use client'

import React from 'react'
import BusinessSearchWithPreview from '@/components/BusinessSearchWithPreview'

import { BusinessScanData } from '@/components/BusinessSearchWithPreview'

interface RatingBoostHeroProps {
  onScanComplete?: (data: BusinessScanData) => void
}

export function RatingBoostHero({ onScanComplete }: RatingBoostHeroProps) {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-12 md:py-20 text-center bg-gradient-to-b from-white to-background">
      {/* Logo/Brand mit Brand-Farben */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col items-center mb-4">
          {/* Decorative pills */}
          <div className="flex gap-2 mb-3">
            <div className="w-3 h-6 rounded-full bg-emerald-400 opacity-80"></div>
            <div className="w-3 h-6 rounded-full bg-emerald-600 opacity-80"></div>
            <div className="w-3 h-6 rounded-full bg-emerald-400 opacity-80"></div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
            Nie Mehr
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></div>
        </div>
      </div>

      {/* Haupt-Überschrift - größer und mit "Nie mehr." in emerald */}
      <h2 className="mb-10 md:mb-12 max-w-4xl text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
        Reviews beantworten? <span className="text-emerald-600">Nie mehr.</span>
      </h2>

      {/* Subtext */}
      <p className="mb-10 md:mb-14 max-w-2xl text-lg md:text-2xl lg:text-3xl text-gray-700 leading-relaxed">
        Wir antworten auf alle deine Google-Reviews. Professionell. Pünktlich. 24/7.
        <br />
        <span className="font-semibold text-gray-900">
          Du machst nichts außer per SMS freigeben.
        </span>
      </p>

      {/* Value Prop */}
      <div className="mb-8 md:mb-12 px-6 py-4 bg-emerald-50 rounded-lg border border-emerald-200 inline-block">
        <p className="text-lg md:text-xl font-semibold text-gray-900">
          €149/Monat • <span className="text-emerald-600">14 Tage kostenlos testen</span>
        </p>
      </div>

      {/* Business Search integriert als zentraler CTA */}
      <div className="mb-10 md:mb-12 w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8">
          <BusinessSearchWithPreview onScanComplete={onScanComplete} />
        </div>
      </div>

      {/* Trust Badge */}
      <p className="mt-10 md:mt-12 text-sm text-gray-600">
        ✓ Kostenlos • ✓ Keine Kreditkarte • ✓ In 30 Sekunden startklar
      </p>
    </section>
  )
}

