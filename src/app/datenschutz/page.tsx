export const metadata = {
  title: 'Datenschutzerklärung - niemehr.de',
  description: 'Datenschutzerklärung gemäß DSGVO',
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Datenschutzerklärung
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Verantwortlicher
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>[Einzutragen: Firmenname/Verantwortlicher]</strong>
                <br />
                [Einzutragen: Straße und Hausnummer]
                <section>
  <h2 className="text-2xl font-semibold mb-4">1. Verantwortlicher</h2>
  <p className="mb-4">Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
  <div className="bg-gray-50 p-4 rounded-lg space-y-1">
    <p className="font-medium">[FIRMENNAME / IHR NAME]</p>
    <p>[STRASSE HAUSNUMMER]</p>
    <p>[PLZ ORT]</p>
    <p className="mt-3">
      E-Mail: <a href="mailto:datenschutz@niemehr.de" className="text-blue-600 hover:underline">datenschutz@niemehr.de</a>
    </p>
    <p>Telefon: [+49 XXX XXXXXXX]</p>
  </div>
</section>

{/* Falls Sie einen Datenschutzbeauftragten haben (ab 20 MA mit Datenverarbeitung): */}
<section className="mt-8">
  <h2 className="text-2xl font-semibold mb-4">2. Datenschutzbeauftragter</h2>
  <p className="mb-4">Unser Datenschutzbeauftragter steht Ihnen gerne für Auskünfte zum Thema Datenschutz zur Verfügung:</p>
  <div className="bg-gray-50 p-4 rounded-lg space-y-1">
    <p className="font-medium">[NAME DES DATENSCHUTZBEAUFTRAGTEN]</p>
    <p>E-Mail: <a href="mailto:dsb@niemehr.de" className="text-blue-600 hover:underline">dsb@niemehr.de</a></p>
  </div>
</section>

{/* Falls Sie KEINEN Datenschutzbeauftragten benötigen: */}
<section className="mt-8">
  <h2 className="text-2xl font-semibold mb-4">2. Datenschutzbeauftragter</h2>
  <p>Die Bestellung eines Datenschutzbeauftragten ist für unser Unternehmen nach Art. 37 DSGVO nicht erforderlich.</p>
  <p className="mt-2">Bei Fragen zum Datenschutz wenden Sie sich bitte direkt an uns unter: <a href="mailto:datenschutz@niemehr.de" className="text-blue-600 hover:underline">datenschutz@niemehr.de</a></p>
</section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Datenschutzbeauftragter
            </h2>
            <p className="text-gray-700">
              [Falls erforderlich: Kontaktdaten des Datenschutzbeauftragten]
              <br />
              [Falls nicht erforderlich: Aktuell ist kein Datenschutzbeauftragter
              bestellt, da die gesetzlichen Voraussetzungen hierfür nicht vorliegen.]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Zwecke der Verarbeitung personenbezogener Daten
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.1 Bereitstellung der Plattform
                </h3>
                <p>
                  Wir verarbeiten Ihre Daten zur Bereitstellung unserer SaaS-Plattform
                  niemehr.de, die Ihnen ermöglicht, KI-gestützt Antworten auf Google Maps
                  Reviews zu generieren.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.2 Review-Management
                </h3>
                <p>
                  Wir synchronisieren und speichern Reviews von Google Maps, um Ihnen
                  Antwortvorschläge zu generieren und den Status Ihrer Antworten zu
                  verwalten.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.3 KI-gestützte Antwortgenerierung
                </h3>
                <p>
                  Wir verwenden KI-Technologie (OpenAI GPT-4o-mini), um Antwortvorschläge
                  auf Ihre Reviews zu generieren. Diese werden Ihnen zur manuellen Prüfung
                  und Freigabe vorgelegt (Human-in-the-Loop).
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Rechtsgrundlagen der Verarbeitung
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  4.1 Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)
                </h3>
                <p>
                  Die Verarbeitung Ihrer Daten als Business-Owner erfolgt zur Erfüllung
                  unseres Vertrages mit Ihnen (Bereitstellung der SaaS-Plattform).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  4.2 Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO)
                </h3>
                <p>
                  Die Verarbeitung von Reviewer-Daten (die bereits öffentlich auf Google Maps
                  sind) erfolgt auf Grundlage unseres berechtigten Interesses an der
                  Bereitstellung von Reputation-Management-Diensten für unsere Kunden. Die
                  Interessenabwägung ergibt, dass das berechtigte Interesse überwiegt, da die
                  Daten bereits öffentlich sind und alle Antworten manuell geprüft werden.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Kategorien personenbezogener Daten
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  5.1 Business-Owner-Daten
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name (aus Google-Profil)</li>
                  <li>E-Mail-Adresse (aus Google-Profil)</li>
                  <li>Profilbild (aus Google-Profil, falls verwendet)</li>
                  <li>Google User ID</li>
                  <li>Geschäftsinformationen (Business-Name, Google Place ID)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  5.2 Reviewer-Daten (indirekt)
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Reviewer-Name (öffentlich auf Google Maps)</li>
                  <li>Review-Text (öffentlich auf Google Maps)</li>
                  <li>Rating (öffentlich auf Google Maps)</li>
                  <li>Zeitstempel der Review</li>
                </ul>
                <p className="mt-2">
                  <strong>Hinweis:</strong> Diese Daten stammen von Google Maps und sind
                  bereits öffentlich. Wir sind nicht Verantwortlicher für diese Daten.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Empfänger personenbezogener Daten
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  6.1 Auftragsverarbeiter
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>OpenAI (USA):</strong> Zur KI-gestützten Generierung von
                    Antwortvorschlägen. Es besteht ein Auftragsverarbeitungsvertrag (DPA).
                    Datenübertragung erfolgt auf Grundlage von Standardvertragsklauseln.
                  </li>
                  <li>
                    <strong>Google (USA/EU):</strong> Zur OAuth-Authentifizierung,
                    Review-Synchronisation und Veröffentlichung von Antworten. Es bestehen
                    entsprechende Vereinbarungen gemäß Google API Terms of Service.
                  </li>
                  <li>
                    <strong>Hosting-Provider:</strong> Zur Bereitstellung der
                    Server-Infrastruktur. Es besteht ein Auftragsverarbeitungsvertrag.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Drittlandtransfers
            </h2>
            <p className="text-gray-700">
              Wir übertragen Daten in die USA zu OpenAI und Google. Diese Übertragungen
              erfolgen auf Grundlage von Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO
              bzw. des EU-US Data Privacy Framework, sofern die Empfänger daran teilnehmen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Aufbewahrungsfristen
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Business-Owner-Daten:</strong> Bis 30 Tage nach Account-Löschung
              </p>
              <p>
                <strong>Review-Daten:</strong> Bis 90 Tage nach letztem Sync oder
                Account-Löschung
              </p>
              <p>
                <strong>Logs:</strong> 90 Tage, danach automatische Löschung
              </p>
              <p>
                <strong>Response-Drafts (nicht veröffentlicht):</strong> 30 Tage nach
                Erstellung
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              9. Betroffenenrechte
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Sie haben folgende Rechte gemäß DSGVO:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Art. 15 DSGVO - Auskunftsrecht:</strong> Sie können Auskunft über
                  Ihre gespeicherten Daten erhalten. Nutzen Sie hierfür die Funktion
                  "Daten exportieren" im Dashboard oder kontaktieren Sie uns.
                </li>
                <li>
                  <strong>Art. 16 DSGVO - Berichtigungsrecht:</strong> Sie können die
                  Berichtigung unrichtiger Daten verlangen.
                </li>
                <li>
                  <strong>Art. 17 DSGVO - Löschrecht:</strong> Sie können die Löschung Ihrer
                  Daten verlangen. Nutzen Sie hierfür die Funktion "Account löschen" im
                  Dashboard.
                </li>
                <li>
                  <strong>Art. 18 DSGVO - Einschränkung:</strong> Sie können die
                  Einschränkung der Verarbeitung verlangen.
                </li>
                <li>
                  <strong>Art. 20 DSGVO - Datenübertragbarkeit:</strong> Sie können Ihre
                  Daten in einem strukturierten Format erhalten.
                </li>
                <li>
                  <strong>Art. 21 DSGVO - Widerspruch:</strong> Sie können der Verarbeitung
                  Ihrer Daten widersprechen, soweit diese auf berechtigtem Interesse
                  beruht.
                </li>
              </ul>
              <p>
                <strong>Kontakt für Betroffenenrechte:</strong>
                <br />
                E-Mail: [Einzutragen: datenschutz@niemehr.de]
                <br />
                Reaktionszeit: Innerhalb 30 Tage
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              10. Automatisierte Entscheidungsfindung
            </h2>
            <p className="text-gray-700">
              Wir verwenden KI-Technologie zur Generierung von Antwortvorschlägen. Diese
              werden jedoch nicht automatisch veröffentlicht. Alle Antworten werden von Ihnen
              manuell geprüft und freigegeben (Human-in-the-Loop). Es erfolgt keine
              vollautomatisierte Entscheidungsfindung im Sinne des Art. 22 DSGVO.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              11. Cookies
            </h2>
            <p className="text-gray-700">
              Wir verwenden ausschließlich technisch notwendige Cookies für die
              Funktionalität der Plattform (Session-Management). Diese Cookies sind für die
              Funktion der Website erforderlich und werden nicht zu Marketing-Zwecken
              verwendet.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              12. Beschwerderecht
            </h2>
            <p className="text-gray-700">
              Sie haben das Recht, sich bei einer Aufsichtsbehörde für Datenschutz zu
              beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer
              personenbezogenen Daten gegen die DSGVO verstößt.
            </p>
            <p className="mt-2">
              <strong>Zuständige Aufsichtsbehörde:</strong>
              <br />
              [Einzutragen: Bundesbeauftragter für Datenschutz oder Landesbehörde]
              <br />
              Website: https://www.bfdi.bund.de
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              13. Änderungen dieser Datenschutzerklärung
            </h2>
            <p className="text-gray-700">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an
              geänderte Rechtslagen oder bei Änderungen des Dienstes sowie der
              Datenverarbeitung anzupassen. Die jeweils aktuelle Version finden Sie auf
              dieser Seite.
            </p>
            <p className="mt-2">
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

