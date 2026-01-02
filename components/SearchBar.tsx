'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  defaultQuery?: string
  defaultLocation?: string
  large?: boolean
}

export function SearchBar({ defaultQuery = '', defaultLocation = '', large = false }: SearchBarProps) {
  const [query, setQuery] = useState(defaultQuery)
  const [location, setLocation] = useState(defaultLocation)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (location) params.set('ort', location)
    router.push(`/jobs?${params.toString()}`)
  }

  if (large) {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Jobtitel, Keywords oder Unternehmen"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div className="flex-1 relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Stadt oder Kanton"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            Jobs finden
          </button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Jobs suchen..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900"
        />
      </div>
      <button
        type="submit"
        className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Suchen
      </button>
    </form>
  )
}
