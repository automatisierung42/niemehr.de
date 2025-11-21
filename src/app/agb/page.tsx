export const metadata = {
  title: 'AGB - niemehr.de',
  description: 'Allgemeine Geschäftsbedingungen',
}

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              § 1 Geltungsbereich
            </h2>
            <p className="text-gray-700">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der
              SaaS-Plattform niemehr.de zur KI-gestützten Generierung von Antworten auf
              Google Maps Reviews.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              § 2 Vertragsgegenstand
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                niemehr.de stellt eine Plattform bereit, die es Business-Ownern ermöglicht:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Google Maps Reviews zu synchronisieren</li>
                <li>KI-gestützte Antwortvorschläge zu generieren</li>
                <li>Antworten manuell zu prüfen und zu veröffentlichen</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              § 3 KI-generierte Inhalte und Haftung
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.1 Verantwortlichkeit
                </h3>
                <p>
                  <strong>
                    Die Verantwortung für den Inhalt der veröffentlichten Antworten liegt
                    ausschließlich beim Nutzer (Business-Owner).
                  </strong>
                </p>
                <p className="mt-2">
                  niemehr.de stellt lediglich ein Werkzeug zur Unterstützung bei der
                  Erstellung von Review-Antworten bereit. Die finale Verantwortung für den
                  Inhalt und die Veröffentlichung liegt beim Nutzer.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.2 Keine Gewähr für Korrektheit
                </h3>
                <p>
                  niemehr.de übernimmt keine Gewähr für die Korrektheit, Vollständigkeit oder
                  Angemessenheit der KI-generierten Antwortvorschläge. Der Nutzer ist
                  verpflichtet, alle Antworten vor der Veröffentlichung zu überprüfen und
                  gegebenenfalls zu bearbeiten.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.3 Human-in-the-Loop
                </h3>
                <p>
                  Alle KI-generierten Antworten werden dem Nutzer zur manuellen Prüfung
                  vorgelegt. Eine automatische Veröffentlichung erfolgt nicht. Der Nutzer
                  muss jede Antwort explizit freigeben.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.4 Haftungsausschluss
                </h3>
                <p>
                  niemehr.de übernimmt keine Haftung für Inhalte, die gegen gesetzliche
                  Bestimmungen, Standesrecht oder Werberichtlinien verstoßen. Der Nutzer ist
                  verantwortlich für die Einhaltung aller anwendbaren Gesetze und
                  Vorschriften.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              § 4 Branchenspezifische Verantwortung
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Bei der Nutzung der Plattform für bestimmte Branchen gelten zusätzliche
                Anforderungen:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Medizinische Praxen:</strong> Der Nutzer ist verantwortlich für
                  die Einhaltung des Heilmittelwerbegesetzes (HWG) und der ärztlichen
                  Schweigepflicht. Keine medizinischen Ratschläge oder Diagnosen in
                  Antworten.
                </li>
                <li>
                  <strong>Rechtsanwaltskanzleien:</strong> Der Nutzer ist verantwortlich
                  für die Einhaltung der Berufsordnung für Rechtsanwälte (BORA). Keine
                  Rechtsberatung oder Werbeaussagen, die gegen Standesrecht verstoßen.
                </li>
                <li>
                  <strong>Andere regulierte Berufe:</strong> Der Nutzer ist verantwortlich
                  für die Einhaltung aller branchenspezifischen Vorschriften und
                  Standesrechte.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              § 5 Unzulässige Nutzung
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>Folgende Nutzungen sind ausdrücklich untersagt:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Erstellung oder Verbreitung von Fake Reviews</li>
                <li>Manipulative Antworten, die Verbraucher täuschen</li>
                <li>Verwendung für illegale oder betrügerische Zwecke</li>
                <li>Verletzung von Rechten Dritter (Urheberrecht, Markenrecht, etc.)</li>
                <li>Spam oder missbräuchliche Nutzung der Plattform</li>
              </ul>
              <p className="mt-4">
                Bei Verstoß gegen diese Bestimmungen behalten wir uns vor, den Account zu
                sperren oder zu löschen.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              § 6 Verfügbarkeit und Störungen
            </h2>
            <p className="text-gray-700">
              Wir bemühen uns um eine hohe Verfügbarkeit der Plattform, können jedoch keine
              Garantie für eine unterbrechungsfreie Nutzung geben. Wartungsarbeiten können
              zu vorübergehenden Ausfällen führen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              § 7 Preise und Zahlung
            </h2>
            <p className="text-gray-700">
              [Einzutragen: Preisgestaltung, Zahlungsmodalitäten, Kündigungsfristen]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              § 8 Kündigung
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                Der Nutzer kann seinen Account jederzeit löschen. Nach Löschung werden die
                Daten gemäß unserer Datenschutzerklärung gelöscht (30 Tage Karenzzeit für
                Datenexport).
              </p>
              <p>
                Wir behalten uns vor, Accounts bei Verstoß gegen diese AGB zu sperren oder
                zu löschen.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              § 9 Datenschutz
            </h2>
            <p className="text-gray-700">
              Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer
              Datenschutzerklärung, die Sie unter{' '}
              <a href="/datenschutz" className="text-blue-600 hover:text-blue-800">
                /datenschutz
              </a>{' '}
              einsehen können.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              § 10 Haftungsbeschränkung
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                Soweit gesetzlich zulässig, schließen wir die Haftung für leichte
                Fahrlässigkeit aus. Dies gilt nicht für:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit</li>
                <li>Schäden aus vorsätzlichem oder grob fahrlässigem Verhalten</li>
                <li>Schäden aus der Verletzung wesentlicher Vertragspflichten</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              § 11 Änderungen der AGB
            </h2>
            <p className="text-gray-700">
              Wir behalten uns vor, diese AGB zu ändern. Änderungen werden dem Nutzer per
              E-Mail mitgeteilt. Widerspricht der Nutzer nicht innerhalb von 14 Tagen, gelten
              die Änderungen als genehmigt.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              § 12 Schlussbestimmungen
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Anwendbares Recht:</strong> Deutsches Recht unter Ausschluss des
                UN-Kaufrechts.
              </p>
              <p>
                <strong>Gerichtsstand:</strong> [Einzutragen: Gerichtsstand]
              </p>
              <p>
                <strong>Streitschlichtung:</strong> Die Europäische Kommission stellt eine
                Plattform zur Online-Streitbeilegung bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <p className="text-gray-700">
              <strong>Stand:</strong> November 2025
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            <a href="/impressum" className="text-blue-600 hover:text-blue-800">
              Impressum
            </a>
            {' | '}
            <a href="/datenschutz" className="text-blue-600 hover:text-blue-800">
              Datenschutzerklärung
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

