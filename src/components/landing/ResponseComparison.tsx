'use client'

import React from 'react'

export function ResponseComparison() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
          Antworten, die Kunden zurückbringen – statt sie zu vergraulen
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12">
          Während große Unternehmen mit 08/15-Floskeln und „wir leiten Ihr Anliegen weiter" arbeiten…
        </p>

        {/* Vergleichs-Tabelle als sexy Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Linke Seite: Generische Konzern-Antwort */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">So antworten die meisten</h3>
            <blockquote className="text-lg italic text-gray-700 mb-6">
              „Vielen Dank für Ihr Feedback. Wir bedauern, dass Ihr Besuch nicht Ihren Erwartungen entsprochen hat."
            </blockquote>
            <ul className="text-left space-y-2 text-gray-700">
              <li>❌ Keine Empathie</li>
              <li>❌ Keine persönliche Ansprache</li>
              <li>❌ Null Lösung in Sicht</li>
              <li>❌ Kunde bleibt sauer → nie wieder</li>
            </ul>
          </div>

          {/* Rechte Seite: niemehr.de Antwort */}
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">So antworten wir bei niemehr.de</h3>
            <blockquote className="text-lg italic text-gray-700 mb-6">
              „Das tut mir echt leid, dass dein Besuch so gelaufen ist. Ich schaue mir das persönlich an – ruf mich
              einfach kurz an, dann finden wir eine Lösung. Wir würden dich super gern wieder bei uns sehen! – Sarah &
              Team"
            </blockquote>
            <ul className="text-left space-y-2 text-gray-800 font-medium">
              <li>✅ Echte Empathie & persönlicher Name</li>
              <li>✅ Direkte Lösung + Anruf</li>
              <li>✅ Kunde fühlt sich ernst genommen</li>
              <li>✅ Hohe Chance auf Wiederkommen + Weiterempfehlung</li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <a
            href="/api/auth/google"
            className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white text-lg md:text-xl font-bold py-4 md:py-5 px-8 md:px-12 rounded-full shadow-lg transition"
          >
            Jetzt 14 Tage kostenlos testen →
          </a>
          <p className="text-gray-600 mt-4">Keine Kreditkarte nötig · In 3 Minuten startklar</p>
        </div>
      </div>
    </section>
  )
}

