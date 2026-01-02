import Link from 'next/link'
import Image from 'next/image'
import { formatWorkload, getRelativeTime, CATEGORIES, CANTONS, WORK_MODELS } from '@/lib/utils'
import type { Job, Company, Media } from '@/payload-types'

interface JobCardProps {
  job: Job
  featured?: boolean
}

export function JobCard({ job, featured = false }: JobCardProps) {
  const company = job.company as Company

  // Prefer external logoUrl from API, fallback to uploaded media
  const logo = company?.logo as Media
  const logoUrl = company?.logoUrl || (logo?.filename ? `/media/${logo.filename}` : null)

  return (
    <Link
      href={`/jobs/${job.slug}`}
      className={`block bg-white rounded-xl border overflow-hidden ${
        featured ? 'border-blue-200 ring-2 ring-blue-100' : 'border-gray-200'
      } p-6 hover:shadow-lg transition-all hover:-translate-y-1`}
    >
      {featured && (
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded mb-3">
          Hervorgehoben
        </span>
      )}

      <div className="flex gap-4">
        <div className="flex-shrink-0">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={company?.name || ''}
              width={56}
              height={56}
              className="w-14 h-14 rounded-lg object-contain bg-gray-50"
            />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 font-bold text-xl">
                {company?.name?.charAt(0) || '?'}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{job.title}</h3>
          <p className="text-gray-600 truncate">{company?.name}</p>

          <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location?.city}, {CANTONS[job.location?.canton || ''] || job.location?.canton}
            </span>

            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatWorkload(job.workload?.min, job.workload?.max)}
            </span>

            {job.workModel && (
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {WORK_MODELS[job.workModel]}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {CATEGORIES[job.category || ''] || job.category}
            </span>
            <span className="text-xs text-gray-400">
              {job.publishedAt ? getRelativeTime(job.publishedAt) : ''}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
