'use client'

import { useState, useEffect } from 'react'
import { X, Info } from 'lucide-react'
import Link from 'next/link'

export default function ComplianceInfoBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Prüfe ob Banner bereits geschlossen wurde
    const dismissed = localStorage.getItem('compliance_info_dismissed')
    if (!dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('compliance_info_dismissed', 'true')
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 relative">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
        aria-label="Banner schließen"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="flex items-start gap-3 pr-8">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            Willkommen bei niemehr.de
          </h3>
          <p className="text-sm text-blue-800 mb-3">
            Diese Plattform verwendet KI-Technologie (OpenAI GPT-4o-mini), um Ihnen bei
            der Erstellung von Antworten auf Google Maps Reviews zu helfen. Alle
            Antwortvorschläge werden Ihnen zur manuellen Prüfung vorgelegt - Sie haben die
            volle Kontrolle über die Veröffentlichung.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="/datenschutz"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Datenschutzerklärung
            </Link>
            <Link
              href="/dashboard/hilfe"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Wie funktioniert die KI?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

