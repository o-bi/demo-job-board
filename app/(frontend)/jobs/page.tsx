import { Suspense } from 'react'
import { JobCard } from '@/components/JobCard'
import { SearchBar } from '@/components/SearchBar'
import { JobFilters } from '@/components/JobFilters'
import { getPayloadClient } from '@/lib/payload'
import type { Where } from 'payload'
import type { Job } from '@/payload-types'

interface JobsPageProps {
  searchParams: Promise<{
    q?: string
    ort?: string
    kategorie?: string
    workModel?: string
    employmentType?: string
    experienceLevel?: string
    minSalary?: string
    page?: string
  }>
}

export const metadata = {
  title: 'Jobs finden',
  description: 'Durchsuchen Sie tausende Stellenangebote in der Schweiz.',
}

// Map location names to canton codes
const cantonMap: Record<string, string> = {
  'zürich': 'ZH', 'zurich': 'ZH', 'zh': 'ZH',
  'bern': 'BE', 'be': 'BE',
  'luzern': 'LU', 'lucerne': 'LU', 'lu': 'LU',
  'uri': 'UR', 'ur': 'UR',
  'schwyz': 'SZ', 'sz': 'SZ',
  'obwalden': 'OW', 'ow': 'OW',
  'nidwalden': 'NW', 'nw': 'NW',
  'glarus': 'GL', 'gl': 'GL',
  'zug': 'ZG', 'zg': 'ZG',
  'freiburg': 'FR', 'fribourg': 'FR', 'fr': 'FR',
  'solothurn': 'SO', 'so': 'SO',
  'basel': 'BS', 'basel-stadt': 'BS', 'bs': 'BS',
  'basel-landschaft': 'BL', 'bl': 'BL',
  'schaffhausen': 'SH', 'sh': 'SH',
  'appenzell': 'AR', 'ar': 'AR', 'ai': 'AI',
  'st. gallen': 'SG', 'st.gallen': 'SG', 'sg': 'SG',
  'graubünden': 'GR', 'graubuenden': 'GR', 'gr': 'GR',
  'aargau': 'AG', 'ag': 'AG',
  'thurgau': 'TG', 'tg': 'TG',
  'tessin': 'TI', 'ticino': 'TI', 'ti': 'TI',
  'waadt': 'VD', 'vaud': 'VD', 'vd': 'VD',
  'wallis': 'VS', 'valais': 'VS', 'vs': 'VS',
  'neuenburg': 'NE', 'neuchâtel': 'NE', 'neuchatel': 'NE', 'ne': 'NE',
  'genf': 'GE', 'genève': 'GE', 'geneva': 'GE', 'ge': 'GE',
  'jura': 'JU', 'ju': 'JU',
}

async function JobsList({ searchParams }: { searchParams: Awaited<JobsPageProps['searchParams']> }) {
  const payload = await getPayloadClient()

  const page = parseInt(searchParams.page || '1')
  const limit = 12

  // Build conditions array for AND logic
  const conditions: Where[] = [{ status: { equals: 'active' } }]

  if (searchParams.q) {
    conditions.push({
      or: [
        { title: { contains: searchParams.q } },
        { shortDescription: { contains: searchParams.q } },
      ],
    })
  }

  if (searchParams.kategorie) {
    conditions.push({ category: { equals: searchParams.kategorie } })
  }

  if (searchParams.workModel) {
    conditions.push({ workModel: { equals: searchParams.workModel } })
  }

  if (searchParams.employmentType) {
    conditions.push({ employmentType: { equals: searchParams.employmentType } })
  }

  if (searchParams.experienceLevel) {
    conditions.push({ experienceLevel: { equals: searchParams.experienceLevel } })
  }

  if (searchParams.minSalary) {
    const minSalary = parseInt(searchParams.minSalary)
    if (!isNaN(minSalary)) {
      conditions.push({ 'salary.min': { greater_than_equal: minSalary } })
    }
  }

  if (searchParams.ort) {
    const locationLower = searchParams.ort.toLowerCase().trim()
    const cantonCode = cantonMap[locationLower]

    const locationConditions: Where[] = [
      { 'location.city': { contains: searchParams.ort } },
    ]

    if (cantonCode) {
      locationConditions.push({ 'location.canton': { equals: cantonCode } })
    }

    conditions.push({ or: locationConditions })
  }

  const where: Where = conditions.length === 1 ? conditions[0] : { and: conditions }

  const { docs: jobs, totalDocs, totalPages } = await payload.find({
    collection: 'jobs',
    where,
    limit,
    page,
    sort: '-publishedAt',
    depth: 2,
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {totalDocs} {totalDocs === 1 ? 'Stelle' : 'Stellen'} gefunden
        </p>
      </div>

      {jobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4">
            {(jobs as Job[]).map((job) => (
              <JobCard key={job.id} job={job} featured={job.featured || false} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center flex-wrap gap-2">
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                // Show first pages, current page area, and last pages
                let pageNum: number
                if (totalPages <= 10) {
                  pageNum = i + 1
                } else if (page <= 5) {
                  pageNum = i + 1
                } else if (page >= totalPages - 4) {
                  pageNum = totalPages - 9 + i
                } else {
                  pageNum = page - 4 + i
                }
                return (
                  <a
                    key={pageNum}
                    href={`?${new URLSearchParams({
                      ...searchParams,
                      page: pageNum.toString(),
                    }).toString()}`}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      pageNum === page
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </a>
                )
              })}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Keine Stellen gefunden</h3>
          <p className="text-gray-600">Versuchen Sie es mit anderen Suchkriterien.</p>
        </div>
      )}
    </div>
  )
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Jobs finden</h1>
        <SearchBar defaultQuery={params.q} defaultLocation={params.ort} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <JobFilters
            kategorie={params.kategorie}
            workModel={params.workModel}
            employmentType={params.employmentType}
            experienceLevel={params.experienceLevel}
            minSalary={params.minSalary}
          />
        </aside>

        {/* Jobs List */}
        <div className="flex-1 min-w-0">
          <Suspense fallback={
            <div className="animate-pulse space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 h-32" />
              ))}
            </div>
          }>
            <JobsList searchParams={params} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
