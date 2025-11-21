'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface ScanResultModalProps {
  isOpen: boolean
  onClose: () => void
  businessName: string
}

export function ScanResultModal({ isOpen, onClose, businessName }: ScanResultModalProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleGetStarted = () => {
    // Weiterleitung zum Dashboard/Onboarding
    // TODO: Später zu echter Onboarding-Seite oder Dashboard weiterleiten
    // Für jetzt: Weiterleitung zu einer Onboarding-Seite (muss noch erstellt werden)
    // Alternativ: router.push('/dashboard') wenn Dashboard-Route existiert
    router.push('/dashboard')
  }

  // Mock-Daten für den Schmerz-Report
  const mockData = {
    responseRate: 18,
    unansweredNegativeReviews: 24,
    potentialRatingBoost: 0.28,
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Dein niemehr.de Profil-Report</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white focus:outline-none"
            aria-label="Schließen"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Business Name */}
        {businessName && (
          <p className="mb-6 text-lg text-slate-300">
            Analyse für: <span className="font-semibold text-white">{businessName}</span>
          </p>
        )}

        {/* Kennzahlen */}
        <div className="space-y-6">
          {/* Kennzahl 1: Der Schmerz - Response Rate */}
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-sm font-medium uppercase text-red-500">Deine Response Rate</h3>
            </div>
            <p className="text-4xl font-bold text-red-500">{mockData.responseRate}%</p>
            <p className="mt-2 text-sm text-slate-400">
              Nur {mockData.responseRate}% deiner Reviews werden beantwortet. Google liebt
              Unternehmen, die auf alle Reviews antworten.
            </p>
          </div>

          {/* Kennzahl 2: Die Chance - Ungelöste Negativ-Reviews */}
          <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">📉</span>
              <h3 className="text-sm font-medium uppercase text-orange-400">
                Ungelöste Negativ-Reviews
              </h3>
            </div>
            <p className="text-4xl font-bold text-orange-400">
              {mockData.unansweredNegativeReviews}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              {mockData.unansweredNegativeReviews} negative Reviews warten auf deine Antwort. Jede
              ungeantwortete negative Bewertung kostet dich potenzielle Kunden.
            </p>
          </div>

          {/* Kennzahl 3: Die Belohnung - Rating-Boost */}
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <h3 className="text-sm font-medium uppercase text-green-500">
                Dein potenzieller Rating-Boost
              </h3>
            </div>
            <p className="text-4xl font-bold text-green-500">
              +{mockData.potentialRatingBoost.toFixed(2)}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Mit automatisierten Antworten auf alle Reviews könntest du dein Rating um{' '}
              {mockData.potentialRatingBoost.toFixed(2)} Punkte steigern. Das bedeutet mehr
              Sichtbarkeit und mehr Kunden.
            </p>
          </div>
        </div>

        {/* Finaler CTA */}
        <div className="mt-8">
          <button
            onClick={handleGetStarted}
            className="w-full rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Diesen Rating-Boost jetzt freischalten →
          </button>
          <p className="mt-4 text-center text-sm text-slate-400">
            Kostenlos starten • Keine Kreditkarte erforderlich
          </p>
        </div>
      </div>
    </div>
  )
}

