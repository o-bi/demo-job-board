'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { CATEGORIES, WORK_MODELS, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS, SALARY_RANGES } from '@/lib/utils'

interface JobFiltersProps {
  kategorie?: string
  workModel?: string
  employmentType?: string
  experienceLevel?: string
  minSalary?: string
}

export function JobFilters({ kategorie, workModel, employmentType, experienceLevel, minSalary }: JobFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`/jobs?${params.toString()}`)
  }

  const hasFilters = kategorie || workModel || employmentType || experienceLevel || minSalary

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
      <h2 className="font-semibold text-gray-900 mb-4">Filter</h2>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Kategorie</h3>
          <select
            value={kategorie || ''}
            onChange={(e) => updateFilter('kategorie', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          >
            <option value="">Alle Kategorien</option>
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Work Model Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Arbeitsmodell</h3>
          <select
            value={workModel || ''}
            onChange={(e) => updateFilter('workModel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          >
            <option value="">Alle</option>
            {Object.entries(WORK_MODELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Employment Type Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Anstellungsart</h3>
          <select
            value={employmentType || ''}
            onChange={(e) => updateFilter('employmentType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          >
            <option value="">Alle</option>
            {Object.entries(EMPLOYMENT_TYPES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Experience Level Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Erfahrungsstufe</h3>
          <select
            value={experienceLevel || ''}
            onChange={(e) => updateFilter('experienceLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          >
            <option value="">Alle</option>
            {Object.entries(EXPERIENCE_LEVELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Salary Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Mindestgehalt</h3>
          <select
            value={minSalary || ''}
            onChange={(e) => updateFilter('minSalary', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          >
            <option value="">Alle</option>
            {SALARY_RANGES.map((range) => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={() => router.push('/jobs')}
            className="block w-full text-center text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            Filter zurücksetzen
          </button>
        )}
      </div>
    </div>
  )
}
