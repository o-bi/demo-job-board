const API_URL = 'https://swissdevjobs.ch/api/jobsLight'

export interface SwissDevJob {
  id: string
  title: string
  company: string
  companySlug: string
  location: string
  city: string
  canton: string
  salaryMin: number | null
  salaryMax: number | null
  skills: string[]
  workloadMin: number
  workloadMax: number
  remote: boolean
  hybrid: boolean
  publishedAt: string
  url: string
}

interface ApiJob {
  _id: string
  title: string
  company: string
  companySlug: string
  location: string
  city: string
  canton: string
  salaryFrom: number | null
  salaryTo: number | null
  skills: string[]
  workloadFrom: number
  workloadTo: number
  remote: boolean
  hybrid: boolean
  publishedAt: string
}

export async function fetchJobs(): Promise<SwissDevJob[]> {
  const response = await fetch(API_URL, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.statusText}`)
  }

  const data: ApiJob[] = await response.json()

  return data
    .filter((job) => job.title && job.company) // Filter out invalid jobs
    .map((job) => ({
      id: job._id,
      title: job.title,
      company: job.company,
      companySlug: job.companySlug || '',
      location: job.location || '',
      city: job.city || '',
      canton: job.canton || '',
      salaryMin: job.salaryFrom,
      salaryMax: job.salaryTo,
      skills: job.skills || [],
      workloadMin: job.workloadFrom || 100,
      workloadMax: job.workloadTo || 100,
      remote: job.remote || false,
      hybrid: job.hybrid || false,
      publishedAt: job.publishedAt,
      url: `https://swissdevjobs.ch/jobs/${job.companySlug || 'job'}-${(job.title || '').replace(/\s+/g, '-')}`,
    }))
}

export async function fetchJobById(id: string): Promise<SwissDevJob | null> {
  const jobs = await fetchJobs()
  return jobs.find((job) => job.id === id) || null
}

export async function searchJobs(query: string): Promise<SwissDevJob[]> {
  const jobs = await fetchJobs()
  const lowerQuery = query.toLowerCase()

  return jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.skills.some((skill) => skill.toLowerCase().includes(lowerQuery)) ||
      job.city.toLowerCase().includes(lowerQuery)
  )
}

export async function filterJobs(filters: {
  city?: string
  canton?: string
  remote?: boolean
  minSalary?: number
  skills?: string[]
}): Promise<SwissDevJob[]> {
  const jobs = await fetchJobs()

  return jobs.filter((job) => {
    if (filters.city && !job.city.toLowerCase().includes(filters.city.toLowerCase())) {
      return false
    }
    if (filters.canton && job.canton !== filters.canton) {
      return false
    }
    if (filters.remote && !job.remote) {
      return false
    }
    if (filters.minSalary && job.salaryMin && job.salaryMin < filters.minSalary) {
      return false
    }
    if (filters.skills && filters.skills.length > 0) {
      const jobSkillsLower = job.skills.map((s) => s.toLowerCase())
      if (!filters.skills.some((skill) => jobSkillsLower.includes(skill.toLowerCase()))) {
        return false
      }
    }
    return true
  })
}
