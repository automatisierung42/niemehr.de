'use client'

import { useState } from 'react'
import AIDisclaimer from '@/components/compliance/AIDisclaimer'

// Hinweis: robots.txt blockiert bereits /dashboard/ - keine Metadata nötig für Client Components

export default function FreigabenPage() {
  const [responseText, setResponseText] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // Beispiel: KI-generierte Antwort (wird später durch echte Daten ersetzt)
  const exampleResponse = 'Vielen Dank für Ihr Feedback! Wir freuen uns, dass Sie zufrieden waren.'

  const handleEdit = () => {
    setIsEditing(true)
    setResponseText(exampleResponse)
  }

  const handleApprove = () => {
    // TODO: Implementiere Veröffentlichung
    alert('Antwort wurde genehmigt und wird veröffentlicht.')
  }

  const handleReject = () => {
    // TODO: Implementiere Ablehnung und Neu-Generierung
    alert('Antwort wurde abgelehnt. Neue Generierung wird gestartet.')
  }

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200">
      <h2 className="text-2xl font-semibold text-slate-100 mb-6">Freigaben</h2>

      {/* AI-Disclaimer - Sichtbar bei jeder Antwortvorschau */}
      <div className="mb-6">
        <AIDisclaimer />
      </div>

      {/* Beispiel: Antwortvorschau */}
      <div className="bg-slate-800/50 rounded-lg p-6 mb-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-100 mb-2">
            Vorschlag - vor Veröffentlichung überprüfen
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Diese Antwort wurde KI-gestützt generiert. Bitte überprüfen und bearbeiten Sie
            den Inhalt vor der Veröffentlichung.
          </p>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              className="w-full p-3 bg-slate-700 text-slate-100 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Bearbeiten Sie die Antwort..."
            />
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-700 text-slate-100 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Genehmigen & Veröffentlichen
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <p className="text-slate-100">{exampleResponse}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Bearbeiten
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-slate-700 text-slate-100 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Neu generieren
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Genehmigen
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hinweis zur Verantwortlichkeit */}
      <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
        <p className="text-sm text-slate-300">
          <strong>Wichtig:</strong> Sie sind für den Inhalt der veröffentlichten Antwort
          verantwortlich. Bitte stellen Sie sicher, dass die Antwort keine gesetzeswidrigen
          Inhalte, Standesrechtsverstöße oder unangemessene Aussagen enthält.
        </p>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Swipe-Interface folgt in Prompt&nbsp;6. Aktuell ist hier noch ein Platzhalter mit
        Compliance-Features.
      </p>
    </section>
  )
}

