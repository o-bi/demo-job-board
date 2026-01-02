'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-gray-200/80" />

      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[72px]">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-900/10 group-hover:shadow-gray-900/20 transition-shadow">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                JustJobs
              </span>
            </Link>

            <div className="hidden md:flex ml-12 items-center">
              <div className="flex items-center bg-gray-100/80 rounded-full p-1">
                <Link
                  href="/jobs"
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive('/jobs')
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Stellen
                </Link>
                <Link
                  href="/unternehmen"
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive('/unternehmen')
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Unternehmen
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/arbeitgeber"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors px-4 py-2 rounded-full hover:bg-gray-100"
            >
              Für Arbeitgeber
            </Link>
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors px-4 py-2 rounded-full hover:bg-gray-100"
            >
              Anmelden
            </Link>
            <Link
              href="/registrieren"
              className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10"
            >
              Registrieren
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              <Link
                href="/jobs"
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/jobs') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Stellen
              </Link>
              <Link
                href="/unternehmen"
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/unternehmen') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Unternehmen
              </Link>
              <Link
                href="/arbeitgeber"
                className="px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Für Arbeitgeber
              </Link>
              <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  href="/login"
                  className="px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 text-center transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Anmelden
                </Link>
                <Link
                  href="/registrieren"
                  className="bg-gray-900 text-white px-4 py-3 rounded-xl text-sm font-medium text-center transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registrieren
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
