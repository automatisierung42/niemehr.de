'use client'

import { useState } from 'react'
import { ConnectGoogleButton } from '@/components/business/ConnectGoogleButton'

// Hinweis: robots.txt blockiert bereits /dashboard/ - keine Metadata nötig für Client Components

export default function EinstellungenPage() {
  const [syncing, setSyncing] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSync = async () => {
    setSyncing(true)
    setMessage(null)
    try {
      const response = await fetch('/api/cron/fetch-reviews', {
        method: 'GET',
        headers: {
          'x-cron-secret': process.env.NEXT_PUBLIC_CRON_SECRET ?? '',
        },
      })
      if (!response.ok) {
        throw new Error('Sync fehlgeschlagen')
      }
      setMessage('Reviews wurden aktualisiert.')
    } catch (error) {
      setMessage((error as Error).message)
    } finally {
      setSyncing(false)
    }
  }

  const handleDataExport = async () => {
    setExporting(true)
    try {
      const response = await fetch('/api/user/data-export')
      if (!response.ok) {
        throw new Error('Export fehlgeschlagen')
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `niemehr-datenexport-${Date.now()}.json`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      setMessage('Datenexport erfolgreich!')
    } catch (error) {
      setMessage((error as Error).message)
    } finally {
      setExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    setDeleting(true)
    try {
      const response = await fetch('/api/user/delete-account', {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('Löschung fehlgeschlagen')
      }
      const data = await response.json()
      setMessage(data.message || 'Account-Löschung wurde angefordert.')
      setShowDeleteConfirm(false)
    } catch (error) {
      setMessage((error as Error).message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <section className="space-y-6 text-slate-200">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-slate-100">Google Business</h2>
        <p className="mt-2 text-sm text-slate-400">
          Verbinde dein Google-Konto, um Reviews zu synchronisieren und zu beantworten.
        </p>
        <div className="mt-4">
          <ConnectGoogleButton businessId="demo-business" />
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h3 className="text-lg font-semibold text-slate-100">Reviews synchronisieren</h3>
        <p className="text-sm text-slate-400">
          Manuelles Triggern – Cron-Job wird in späteren Prompts eingerichtet.
        </p>
        <button
          type="button"
          onClick={handleSync}
          disabled={syncing}
          className="mt-4 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-slate-900 disabled:bg-slate-700 disabled:text-slate-400"
        >
          {syncing ? 'Sync läuft...' : 'Reviews jetzt synchronisieren'}
        </button>
        {message && <p className="mt-2 text-sm text-slate-300">{message}</p>}
      </div>

      {/* Datenschutz & Meine Daten */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-4">
          Datenschutz & Meine Daten
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Verwalten Sie Ihre Datenschutz-Einstellungen und Ausübung Ihrer Rechte gemäß DSGVO.
        </p>

        <div className="space-y-4">
          {/* Datenexport */}
          <div className="border-t border-slate-700 pt-4">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              Meine Daten exportieren
            </h3>
            <p className="text-sm text-slate-400 mb-3">
              Laden Sie alle Ihre gespeicherten Daten als JSON-Datei herunter (Art. 15 DSGVO).
            </p>
            <button
              type="button"
              onClick={handleDataExport}
              disabled={exporting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:bg-slate-700 disabled:text-slate-400 hover:bg-blue-700 transition-colors"
            >
              {exporting ? 'Export läuft...' : 'Daten exportieren'}
            </button>
          </div>

          {/* Account-Löschung */}
          <div className="border-t border-slate-700 pt-4">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              Account löschen
            </h3>
            <p className="text-sm text-slate-400 mb-3">
              Löschen Sie Ihren Account und alle zugehörigen Daten. Diese Aktion kann nicht
              rückgängig gemacht werden. Ihre Daten werden innerhalb von 30 Tagen gelöscht
              (Art. 17 DSGVO).
            </p>
            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
              >
                Account löschen
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-200 font-semibold mb-2">
                    ⚠️ Achtung: Diese Aktion kann nicht rückgängig gemacht werden!
                  </p>
                  <p className="text-sm text-slate-300">
                    Ihr Account wird markiert für Löschung. Sie haben 30 Tage Zeit, Ihre
                    Daten zu exportieren, bevor sie endgültig gelöscht werden.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-600 transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:bg-slate-700 disabled:text-slate-400 hover:bg-red-700 transition-colors"
                  >
                    {deleting ? 'Löschung läuft...' : 'Endgültig löschen'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

