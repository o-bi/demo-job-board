import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Für Arbeitgeber',
  description: 'Publizieren Sie Ihre Stellenangebote und finden Sie die besten Talente.',
}

export default async function EmployerLandingPage() {
  const payload = await getPayloadClient()

  const { totalDocs: totalJobs } = await payload.count({
    collection: 'jobs',
    where: { status: { equals: 'active' } },
  })

  const { totalDocs: totalCompanies } = await payload.count({
    collection: 'companies',
  })

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-gray-400 font-medium mb-4">Für Arbeitgeber</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Die besten Talente.
              <span className="block text-gray-400">Ohne Umwege.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-xl">
              Erreichen Sie qualifizierte Fachkräfte in der ganzen Schweiz. Ein Preis, keine Überraschungen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/arbeitgeber/stellen/neu"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                Stelle publizieren
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="#preise"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                Preise ansehen
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">{totalJobs.toLocaleString('de-CH')}</div>
              <div className="text-gray-500 mt-1">Aktive Stellen</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">{totalCompanies.toLocaleString('de-CH')}</div>
              <div className="text-gray-500 mt-1">Unternehmen</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">26</div>
              <div className="text-gray-500 mt-1">Kantone</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">CHF 199</div>
              <div className="text-gray-500 mt-1">Pro Inserat</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              So einfach geht&apos;s
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              In drei Schritten zur perfekten Besetzung
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Stelle erfassen</h3>
              <p className="text-gray-600">
                Beschreiben Sie die Position, Anforderungen und was Sie bieten. Dauert nur wenige Minuten.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Online gehen</h3>
              <p className="text-gray-600">
                Nach Zahlung ist Ihr Inserat sofort für 30 Tage auf JustJobs sichtbar.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Bewerbungen erhalten</h3>
              <p className="text-gray-600">
                Kandidaten bewerben sich direkt bei Ihnen. Sie behalten die volle Kontrolle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Was Sie bekommen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Alles, was Sie brauchen. Nichts, was Sie nicht brauchen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '30 Tage online', desc: 'Ihr Inserat bleibt einen vollen Monat sichtbar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { title: 'Unbegrenzte Bewerbungen', desc: 'Keine Limits, keine zusätzlichen Kosten', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
              { title: 'Firmenprofil', desc: 'Präsentieren Sie Ihr Unternehmen mit Logo und Beschreibung', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { title: 'Jederzeit bearbeiten', desc: 'Aktualisieren Sie Ihr Inserat wann immer Sie wollen', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
              { title: 'Direktbewerbungen', desc: 'Kandidaten bewerben sich direkt bei Ihnen – kein Mittelsmann', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { title: 'Schweizer Support', desc: 'Bei Fragen sind wir persönlich für Sie da', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="preise" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ein Preis. Keine Überraschungen.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent und fair – wie Recruiting sein sollte.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-gray-900 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
              {/* Subtle pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />

              <div className="relative">
                <p className="text-gray-400 text-sm font-medium mb-2">Stelleninserat</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl md:text-6xl font-bold">CHF 199</span>
                  <span className="text-gray-400">einmalig</span>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    '30 Tage online',
                    'Unbegrenzte Bewerbungen',
                    'Firmenprofil mit Logo',
                    'Jederzeit bearbeitbar',
                    'Keine Abo-Falle',
                    'Zahlung per Rechnung oder Karte',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/arbeitgeber/stellen/neu"
                  className="block w-full bg-white text-gray-900 text-center px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                >
                  Jetzt Stelle aufgeben
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Häufige Fragen
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'Wie lange ist mein Inserat online?', a: 'Ihr Stelleninserat bleibt 30 Tage auf JustJobs sichtbar. Danach können Sie es bei Bedarf verlängern.' },
              { q: 'Kann ich mein Inserat nachträglich bearbeiten?', a: 'Ja, Sie können Ihr Inserat jederzeit anpassen – Titel, Beschreibung, Anforderungen, alles.' },
              { q: 'Wie erhalte ich Bewerbungen?', a: 'Kandidaten bewerben sich direkt bei Ihnen per E-Mail oder über den von Ihnen angegebenen Bewerbungslink.' },
              { q: 'Gibt es versteckte Kosten?', a: 'Nein. CHF 199 pro Inserat, das ist alles. Keine Abos, keine Zusatzgebühren.' },
              { q: 'Wie bezahle ich?', a: 'Sie können bequem per Rechnung oder Kreditkarte bezahlen.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bereit, Ihr Team zu verstärken?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Starten Sie jetzt und erreichen Sie die besten Talente der Schweiz.
          </p>
          <Link
            href="/arbeitgeber/stellen/neu"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all"
          >
            Stelle publizieren
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
