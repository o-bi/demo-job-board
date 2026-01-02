import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { CATEGORIES, CANTONS } from '@/lib/utils'
import type { Company, Media, Job } from '@/payload-types'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Unternehmen',
  description: 'Entdecken Sie Schweizer Unternehmen und deren offene Stellen.',
}

interface CompanyCardProps {
  company: Company
  jobCount: number
}

function CompanyCard({ company, jobCount }: CompanyCardProps) {
  // Prefer external logoUrl from API, fallback to uploaded media
  const logo = company.logo as Media
  const logoUrl = company.logoUrl || (logo?.filename ? `/media/${logo.filename}` : null)

  return (
    <Link
      href={`/unternehmen/${company.slug}`}
      className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={company.name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-xl object-contain bg-gray-50"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 font-bold text-2xl">
              {company.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{company.name}</h3>
          {company.industry && (
            <p className="text-sm text-gray-600 mt-1">
              {CATEGORIES[company.industry] || company.industry}
            </p>
          )}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            {company.location?.city && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {company.location.city}
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {jobCount} {jobCount === 1 ? 'offene Stelle' : 'offene Stellen'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default async function CompaniesPage() {
  const payload = await getPayloadClient()

  const { docs: companies } = await payload.find({
    collection: 'companies',
    limit: 50,
    depth: 2,
  })

  // Get job counts for each company
  const companiesWithCounts = await Promise.all(
    companies.map(async (company) => {
      const { totalDocs } = await payload.count({
        collection: 'jobs',
        where: {
          company: { equals: company.id },
          status: { equals: 'active' },
        },
      })
      return { company, jobCount: totalDocs }
    })
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Unternehmen</h1>
        <p className="text-gray-600">
          Entdecken Sie Schweizer Unternehmen und deren offene Stellen.
        </p>
      </div>

      {companiesWithCounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companiesWithCounts.map(({ company, jobCount }) => (
            <CompanyCard key={company.id} company={company as Company} jobCount={jobCount} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Noch keine Unternehmen</h3>
          <p className="text-gray-600 mb-4">Die ersten Unternehmen werden bald hier erscheinen.</p>
          <Link
            href="/arbeitgeber/registrieren"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Unternehmen registrieren
          </Link>
        </div>
      )}
    </div>
  )
}
