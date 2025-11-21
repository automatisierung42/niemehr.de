'use client'

import { Info } from 'lucide-react'

interface AIDisclaimerProps {
  className?: string
}

export default function AIDisclaimer({ className = '' }: AIDisclaimerProps) {
  return (
    <div
      className={`flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg ${className}`}
    >
      <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-yellow-900">
          <strong>Hinweis:</strong> Dieser Antwortvorschlag wurde KI-gestützt erstellt.
          Bitte überprüfen Sie den Inhalt sorgfältig, bevor Sie ihn veröffentlichen. Sie
          sind für die finale Antwort verantwortlich.
        </p>
      </div>
    </div>
  )
}

