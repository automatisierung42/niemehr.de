export const metadata = {
  title: 'Impressum - niemehr.de',
  description: 'Impressum und rechtliche Informationen',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="space-y-2 text-gray-700">
            <div className="space-y-6">
  <section>
    <h2 className="text-xl font-semibold mb-3">Angaben gemäß § 5 TMG</h2>
    <div className="space-y-1">
      <p className="font-medium">[IHR VOLLSTÄNDIGER NAME]</p>
      <p>[STRASSE HAUSNUMMER]</p>
      <p>[PLZ ORT]</p>
    </div>
  </section>

  <section>
    <h2 className="text-xl font-semibold mb-3">Kontakt</h2>
    <div className="space-y-1">
      <p>E-Mail: <a href="mailto:[IHRE@EMAIL.DE]" className="text-blue-600 hover:underline">[IHRE@EMAIL.DE]</a></p>
      <p>Telefon: [+49 XXX XXXXXXX]</p>
      <p>Website: <a href="https://niemehr.de" className="text-blue-600 hover:underline">https://niemehr.de</a></p>
    </div>
  </section>

  {/* Nur wenn USt-pflichtig: */}
  <section>
    <h2 className="text-xl font-semibold mb-3">Umsatzsteuer-ID</h2>
    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
    <p className="font-medium">[DE XXXXXXXXX]</p>
  </section>

  {/* Rest bleibt gleich: EU-Streitschlichtung, Verbraucherstreitbeilegung, Haftung */}
</div>
              <p>
                <strong>Registernummer:</strong> [Einzutragen: Falls vorhanden]
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Umsatzsteuer-ID
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                <br />
                <strong>[Einzutragen: Falls vorhanden]</strong>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                [Einzutragen: Name]
                <br />
                [Einzutragen: Adresse]
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Haftungsausschluss
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Haftung für Inhalte
                </h3>
                <p>
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
                  Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
                  keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG
                  für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Haftung für Links
                </h3>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte
                  wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte
                  auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
                  stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Urheberrecht
            </h2>
            <p className="text-gray-700">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
              Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
              bzw. Erstellers.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            <a href="/datenschutz" className="text-blue-600 hover:text-blue-800">
              Datenschutzerklärung
            </a>
            {' | '}
            <a href="/agb" className="text-blue-600 hover:text-blue-800">
              AGB
            </a>
            {' | '}
            <a href="/" className="text-blue-600 hover:text-blue-800">
              Zur Startseite
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

