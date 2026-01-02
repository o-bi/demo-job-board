import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { JobCard } from '@/components/JobCard'
import {
  formatWorkload,
  formatSalary,
  formatDate,
  CATEGORIES,
  CANTONS,
  WORK_MODELS,
  EMPLOYMENT_TYPES,
} from '@/lib/utils'
import type { Job, Company, Media } from '@/payload-types'

interface JobPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: JobPageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'jobs',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const job = docs[0]
  if (!job) return { title: 'Stelle nicht gefunden' }

  const company = job.company as Company

  return {
    title: `${job.title} bei ${company?.name}`,
    description: job.shortDescription || `Jetzt bewerben für ${job.title} bei ${company?.name}`,
  }
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'jobs',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const job = docs[0]
  if (!job) notFound()

  const company = job.company as Company

  // Prefer external logoUrl from API, fallback to uploaded media
  const logo = company?.logo as Media
  const logoUrl = company?.logoUrl || (logo?.filename ? `/media/${logo.filename}` : null)

  // Get similar jobs
  const { docs: similarJobs } = await payload.find({
    collection: 'jobs',
    where: {
      status: { equals: 'active' },
      id: { not_equals: job.id },
      category: { equals: job.category },
    },
    limit: 3,
    sort: '-publishedAt',
    depth: 2,
  })

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
            <Link href="/jobs" className="hover:text-gray-700">Jobs</Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate">{job.title}</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            {/* Header */}
            <div className="flex gap-6 mb-6">
              <div className="flex-shrink-0">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={company?.name || ''}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-xl object-contain bg-gray-50"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 font-bold text-2xl">
                      {company?.name?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <Link
                  href={`/unternehmen/${company?.slug}`}
                  className="text-lg text-blue-600 hover:text-blue-700 font-medium"
                >
                  {company?.name}
                </Link>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{job.location?.city}, {CANTONS[job.location?.canton || '']}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{formatWorkload(job.workload?.min, job.workload?.max)}</span>
              </div>

              {job.workModel && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{WORK_MODELS[job.workModel]}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{EMPLOYMENT_TYPES[job.employmentType || '']}</span>
              </div>

              {job.salary?.isPublic && (job.salary?.min || job.salary?.max) && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatSalary(job.salary.min, job.salary.max)}/Jahr</span>
                </div>
              )}
            </div>

            {/* Aufgaben - Main job description */}
            {(() => {
              const respText = typeof job.responsibilities === 'string'
                ? job.responsibilities
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                : (job.responsibilities as any)?.root?.children?.[0]?.children?.[0]?.text
              return respText ? (
                <div className="prose prose-gray max-w-none">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Ihre Aufgaben</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{respText}</div>
                </div>
              ) : null
            })()}

            {/* Anforderungen */}
            {(() => {
              const reqText = typeof job.requirements === 'string'
                ? job.requirements
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                : (job.requirements as any)?.root?.children?.[0]?.children?.[0]?.text
              return reqText ? (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Anforderungen</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{reqText}</div>
                </div>
              ) : null
            })()}

            {/* Was wir bieten */}
            {(() => {
              const benText = typeof job.benefits === 'string'
                ? job.benefits
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                : (job.benefits as any)?.root?.children?.[0]?.children?.[0]?.text
              return benText ? (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Was wir bieten</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{benText}</div>
                </div>
              ) : null
            })()}

            {/* Technologien & Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Technologien & Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((item: { skill?: string | null; id?: string | null }, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {item.skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Über uns - Company info at the end */}
            {(() => {
              const descText = typeof job.description === 'string'
                ? job.description
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                : (job.description as any)?.root?.children?.[0]?.children?.[0]?.text
              return descText ? (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Über uns</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{descText}</div>
                </div>
              ) : null
            })()}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-80">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            {/* Apply Button */}
            <div className="mb-6">
              {job.applicationUrl ? (
                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Jetzt bewerben
                </a>
              ) : job.applicationEmail ? (
                <a
                  href={`mailto:${job.applicationEmail}?subject=Bewerbung: ${job.title}`}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Per E-Mail bewerben
                </a>
              ) : (
                <Link
                  href={`/jobs/${job.slug}/bewerben`}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Jetzt bewerben
                </Link>
              )}
            </div>

            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mb-6">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Speichern
            </button>

            {/* Job Info */}
            <div className="space-y-4 text-sm border-t border-gray-200 pt-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Kategorie</span>
                <span className="font-medium text-gray-900">{CATEGORIES[job.category || '']}</span>
              </div>
              {job.publishedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Veröffentlicht</span>
                  <span className="font-medium text-gray-900">{formatDate(job.publishedAt)}</span>
                </div>
              )}
              {job.expiresAt && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Gültig bis</span>
                  <span className="font-medium text-gray-900">{formatDate(job.expiresAt)}</span>
                </div>
              )}
            </div>

            {/* Company Preview */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Über das Unternehmen</h3>
              <Link
                href={`/unternehmen/${company?.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={company?.name || ''}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-lg object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 font-bold">
                      {company?.name?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{company?.name}</p>
                  <p className="text-xs text-gray-500">{company?.location?.city}</p>
                </div>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Similar Jobs */}
      {similarJobs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ähnliche Stellen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarJobs.map((similarJob) => (
              <JobCard key={similarJob.id} job={similarJob as Job} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
