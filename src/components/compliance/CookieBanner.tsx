'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Prüfe ob Cookie-Consent bereits gegeben wurde
    const consentGiven = localStorage.getItem('cookie_consent')
    if (!consentGiven) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    localStorage.setItem('cookie_consent_date', new Date().toISOString())
    setIsVisible(false)
  }

  const handleDismiss = () => {
    localStorage.setItem('cookie_consent', 'dismissed')
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            Diese Website verwendet ausschließlich technisch notwendige Cookies für die
            Funktionalität der Plattform (Session-Management). Diese Cookies sind für die
            Funktion der Website erforderlich.{' '}
            <Link
              href="/datenschutz"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Mehr erfahren
            </Link>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Schließen
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Verstanden
          </button>
        </div>
      </div>
    </div>
  )
}

