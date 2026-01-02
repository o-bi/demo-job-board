import Link from 'next/link'
import { formatWorkload, getRelativeTime, CANTONS } from '@/lib/utils'
import type { SwissDevJob } from '@/lib/swissdevjobs'

interface SwissDevJobCardProps {
  job: SwissDevJob
  featured?: boolean
}

export function SwissDevJobCard({ job, featured = false }: SwissDevJobCardProps) {
  const workModel = job.remote ? 'Remote' : job.hybrid ? 'Hybrid' : 'Vor Ort'

  return (
    <a
      href={job.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white rounded-xl border ${
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
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              {job.company?.charAt(0) || '?'}
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.city}{job.canton ? `, ${CANTONS[job.canton] || job.canton}` : ''}
            </span>

            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatWorkload(job.workloadMin, job.workloadMax)}
            </span>

            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {workModel}
            </span>
          </div>

          {job.salaryMin && job.salaryMax && (
            <div className="mt-2">
              <span className="text-sm font-medium text-green-600">
                CHF {(job.salaryMin / 1000).toFixed(0)}k – {(job.salaryMax / 1000).toFixed(0)}k
              </span>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-1">
            {job.skills.slice(0, 4).map((skill) => (
              <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="text-xs text-gray-400 px-1">
                +{job.skills.length - 4}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-blue-600 font-medium">
              swissdevjobs.ch ↗
            </span>
            <span className="text-xs text-gray-400">
              {job.publishedAt ? getRelativeTime(job.publishedAt) : ''}
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}
