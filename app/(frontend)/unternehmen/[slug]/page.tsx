import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { JobCard } from '@/components/JobCard'
import { CATEGORIES, CANTONS } from '@/lib/utils'
import type { Company, Media, Job } from '@/payload-types'

interface CompanyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CompanyPageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'companies',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const company = docs[0]
  if (!company) return { title: 'Unternehmen nicht gefunden' }

  return {
    title: company.name,
    description: `Offene Stellen bei ${company.name}. Entdecken Sie Karrieremöglichkeiten.`,
  }
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'companies',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const company = docs[0]
  if (!company) notFound()

  // Prefer external logoUrl from API, fallback to uploaded media
  const logo = company.logo as Media
  const logoUrl = company.logoUrl || (logo?.filename ? `/media/${logo.filename}` : null)

  // Get company's active jobs
  const { docs: jobs } = await payload.find({
    collection: 'jobs',
    where: {
      company: { equals: company.id },
      status: { equals: 'active' },
    },
    sort: '-publishedAt',
    depth: 2,
  })

  const sizeLabels: Record<string, string> = {
    '1-10': '1-10 Mitarbeiter',
    '11-50': '11-50 Mitarbeiter',
    '51-200': '51-200 Mitarbeiter',
    '201-500': '201-500 Mitarbeiter',
    '501-1000': '501-1000 Mitarbeiter',
    '1000+': '1000+ Mitarbeiter',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center gap-2 text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-700">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/unternehmen" className="hover:text-gray-700">Unternehmen</Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate">{company.name}</li>
        </ol>
      </nav>

      {/* Company Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={company.name}
              width={120}
              height={120}
              className="w-30 h-30 rounded-2xl object-contain bg-gray-50"
            />
          ) : (
            <div className="w-30 h-30 rounded-2xl bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 font-bold text-4xl">
                {company.name.charAt(0)}
              </span>
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>

            <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
              {company.industry && (
                <span className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {CATEGORIES[company.industry] || company.industry}
                </span>
              )}
              {company.location?.city && (
                <span className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {company.location.city}{company.location.canton ? `, ${CANTONS[company.location.canton]}` : ''}
                </span>
              )}
              {company.size && (
                <span className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {sizeLabels[company.size] || company.size}
                </span>
              )}
            </div>

            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Website besuchen
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        {company.description && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-3">Über uns</h2>
            <div className="text-gray-700 leading-relaxed prose prose-gray max-w-none">
              {typeof company.description === 'string'
                ? company.description
                : 'Unternehmensbeschreibung verfügbar.'}
            </div>
          </div>
        )}
      </div>

      {/* Jobs Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Offene Stellen ({jobs.length})
        </h2>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(jobs as Job[]).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Keine offenen Stellen</h3>
            <p className="text-gray-600">
              Aktuell hat {company.name} keine offenen Stellen ausgeschrieben.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
