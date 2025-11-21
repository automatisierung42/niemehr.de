import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">niemehr.de</h3>
            <p className="text-sm text-gray-600">
              KI-gestützte Antworten auf Google Maps Reviews
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  AGB
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Kontakt</h3>
            <p className="text-sm text-gray-600">
              <a href="mailto:hi@niemehr.de" className="hover:text-blue-600 transition-colors">
                hi@niemehr.de
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} niemehr.de. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}

