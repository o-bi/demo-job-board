import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">JustJobs</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              Die einfachste Jobsuche der Schweiz. Kein Schnickschnack, keine versteckten Kosten – nur Jobs.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Kandidaten column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Für Kandidaten</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/jobs" className="hover:text-white transition-colors">
                  Stellen suchen
                </Link>
              </li>
              <li>
                <Link href="/unternehmen" className="hover:text-white transition-colors">
                  Unternehmen
                </Link>
              </li>
              <li>
                <Link href="/registrieren" className="hover:text-white transition-colors">
                  Profil erstellen
                </Link>
              </li>
              <li>
                <Link href="/jobs?workModel=remote" className="hover:text-white transition-colors">
                  Remote Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Arbeitgeber column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Für Arbeitgeber</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/arbeitgeber" className="hover:text-white transition-colors">
                  Übersicht
                </Link>
              </li>
              <li>
                <Link href="/arbeitgeber/stellen/neu" className="hover:text-white transition-colors">
                  Stelle publizieren
                </Link>
              </li>
              <li>
                <Link href="/arbeitgeber/preise" className="hover:text-white transition-colors">
                  Preise
                </Link>
              </li>
              <li>
                <Link href="/arbeitgeber/registrieren" className="hover:text-white transition-colors">
                  Konto erstellen
                </Link>
              </li>
            </ul>
          </div>

          {/* Unternehmen column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">JustJobs</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/ueber-uns" className="hover:text-white transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/agb" className="hover:text-white transition-colors">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} JustJobs. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/datenschutz" className="text-gray-500 hover:text-gray-300 transition-colors">
                Datenschutz
              </Link>
              <Link href="/agb" className="text-gray-500 hover:text-gray-300 transition-colors">
                AGB
              </Link>
              <Link href="/impressum" className="text-gray-500 hover:text-gray-300 transition-colors">
                Impressum
              </Link>
            </div>
            <p className="flex items-center gap-1.5 text-gray-500">
              Made with
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              in Switzerland
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
