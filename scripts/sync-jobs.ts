import { getPayload } from 'payload'
import config from '../payload.config'

const API_URL = 'https://swissdevjobs.ch/api/jobsLight'
const JOB_DETAIL_URL = 'https://swissdevjobs.ch/api/job'

interface ApiJob {
  _id: string
  name: string
  company: string
  companyId: string
  jobUrl: string
  address: string
  actualCity: string
  cityCategory: string
  postalCode: string
  technologies: string[]
  annualSalaryFrom: number | null
  annualSalaryTo: number | null
  workplace: string
  jobType: string
  activeFrom: string
  companyWebsiteLink: string
  redirectJobUrl?: string
  logoImg?: string
  companySize?: string
  expLevel?: string
  latitude?: number
  longitude?: number
}

interface ApiJobDetail {
  description?: string
  responsibilitiesTextArea?: string
  requirementsMustTextArea?: string
  requirementsMust?: string[]
  requirementsNice?: string[]
  responsibilities?: string[]
  perkKeys?: string[]
}

const cityToCanton: Record<string, string> = {
  'Zurich': 'ZH',
  'Zürich': 'ZH',
  'Zuerich': 'ZH',
  'Basel': 'BS',
  'Bern': 'BE',
  'Geneva': 'GE',
  'Genf': 'GE',
  'Lausanne': 'VD',
  'Luzern': 'LU',
  'Lucerne': 'LU',
  'St-Gallen': 'SG',
  'St. Gallen': 'SG',
  'Winterthur': 'ZH',
  'Zug': 'ZG',
  'Lugano': 'TI',
  'Chur': 'GR',
  'Aarau': 'AG',
  'Thun': 'BE',
  'Fribourg': 'FR',
  'Neuchatel': 'NE',
  'Schaffhausen': 'SH',
  'remote': 'ZH',
}

const companySizeMap: Record<string, string> = {
  '1-10': '1-10',
  '10-50': '11-50',
  '50-100': '51-200',
  '100-250': '51-200',
  '250-500': '201-500',
  '500-1k': '501-1000',
  '1k+': '1000+',
  '1k-5k': '1000+',
  '5k+': '1000+',
}

const expLevelMap: Record<string, string> = {
  'Junior': 'junior',
  'Regular': 'regular',
  'Senior': 'senior',
  'Lead': 'lead',
  'Manager': 'lead',
}

const perkTranslations: Record<string, string> = {
  'wweek42': '42-Stunden-Woche',
  'weeksvacation5': '5 Wochen Ferien',
  'weeksvacation6': '6 Wochen Ferien',
  'bonuspay': 'Bonus',
  'careerpath': 'Karrieremöglichkeiten',
  'coffee': 'Gratis Kaffee',
  'coworkshops': 'Workshops & Weiterbildung',
  'cooloffice': 'Modernes Büro',
  'flexiblework': 'Flexible Arbeitszeiten',
  'freshfruits': 'Frisches Obst',
  'parttime': 'Teilzeit möglich',
  'rekachecks': 'Reka-Checks',
  'sweets': 'Snacks',
  'standingdesk': 'Stehpult',
  'teamevents': 'Team Events',
  'wellconnected': 'Gute ÖV-Anbindung',
  'remote2day': '2 Tage Remote',
  'remote3day': '3 Tage Remote',
  'hybridwork': 'Hybrid Work',
  'homeoffice': 'Home Office',
  'remoteok': '100% Remote möglich',
}

const createRichText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

async function fetchJobDetail(jobId: string): Promise<ApiJobDetail | null> {
  try {
    const response = await fetch(`${JOB_DETAIL_URL}/${jobId}`)
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

async function syncJobs() {
  console.log('🔄 Starting sync from SwissDevJobs API...')

  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.statusText}`)
  }

  const apiJobs: ApiJob[] = await response.json()
  const validJobs = apiJobs.filter((job) => job.name && job.company)

  console.log(`📥 Fetched ${validJobs.length} jobs from SwissDevJobs`)

  const payload = await getPayload({ config })

  // Group jobs by company
  const companiesMap = new Map<string, ApiJob>()
  for (const job of validJobs) {
    if (!companiesMap.has(job.company)) {
      companiesMap.set(job.company, job)
    }
  }

  console.log(`🏢 Found ${companiesMap.size} unique companies`)

  // Create/update companies
  const companyIdMap = new Map<string, string>()

  for (const [companyName, sampleJob] of companiesMap) {
    const slug = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const canton = cityToCanton[sampleJob.cityCategory] || cityToCanton[sampleJob.actualCity] || 'ZH'

    try {
      const existing = await payload.find({
        collection: 'companies',
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        // Update existing company with size if available
        const updates: Record<string, unknown> = {}
        if (sampleJob.companySize && companySizeMap[sampleJob.companySize]) {
          updates.size = companySizeMap[sampleJob.companySize]
        }
        if (Object.keys(updates).length > 0) {
          await payload.update({
            collection: 'companies',
            id: existing.docs[0].id,
            data: updates,
          })
        }
        companyIdMap.set(companyName, String(existing.docs[0].id))
      } else {
        const created = await payload.create({
          collection: 'companies',
          data: {
            name: companyName,
            slug,
            industry: 'it',
            website: sampleJob.companyWebsiteLink ? `https://${sampleJob.companyWebsiteLink}` : undefined,
            size: sampleJob.companySize ? companySizeMap[sampleJob.companySize] : undefined,
            location: {
              city: sampleJob.actualCity || 'Schweiz',
              canton,
            },
          },
        })
        companyIdMap.set(companyName, String(created.id))
        console.log(`  + Created company: ${companyName}`)
      }
    } catch (err) {
      console.error(`  ✗ Error with company ${companyName}:`, err)
    }
  }

  // Create/update jobs
  console.log('\n📋 Syncing jobs with full descriptions...')
  let created = 0
  let updated = 0
  let skipped = 0

  for (let i = 0; i < validJobs.length; i++) {
    const job = validJobs[i]
    const companyId = companyIdMap.get(job.company)
    if (!companyId) {
      skipped++
      continue
    }

    // Fetch detailed job info
    const detail = await fetchJobDetail(job._id)

    const slug = job.jobUrl || `${job.company}-${job._id}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const workModel = job.workplace === 'remote' ? 'remote' : job.workplace === 'hybrid' ? 'hybrid' : 'onsite'
    const canton = cityToCanton[job.cityCategory] || cityToCanton[job.actualCity] || 'ZH'

    // Build description (intro/about)
    const descriptionText = detail?.description?.trim() || `${job.name} bei ${job.company}`

    // Build responsibilities text
    const responsibilitiesText = detail?.responsibilitiesTextArea?.trim() || ''

    // Build requirements text
    let requirementsText = ''
    if (detail?.requirementsMustTextArea) {
      requirementsText = detail.requirementsMustTextArea.trim()
    } else if (detail?.requirementsMust?.length) {
      requirementsText = '• ' + detail.requirementsMust.join('\n• ')
    }
    if (detail?.requirementsNice?.length) {
      if (requirementsText) requirementsText += '\n\nNice to have:\n'
      requirementsText += '• ' + detail.requirementsNice.join('\n• ')
    }

    // Build benefits text from perks
    let benefitsText = ''
    if (detail?.perkKeys?.length) {
      const translatedPerks = detail.perkKeys
        .map(key => perkTranslations[key] || key)
        .filter(Boolean)
      if (translatedPerks.length) {
        benefitsText = '• ' + translatedPerks.join('\n• ')
      }
    }

    const jobData = {
      title: job.name,
      slug,
      externalId: job._id,
      company: companyId,
      description: createRichText(descriptionText),
      shortDescription: `${job.name} bei ${job.company} in ${job.actualCity || 'der Schweiz'}`,
      category: 'it' as const,
      experienceLevel: job.expLevel ? expLevelMap[job.expLevel] : undefined,
      location: {
        city: job.actualCity || 'Schweiz',
        canton,
        address: job.address || undefined,
        postalCode: job.postalCode || undefined,
        latitude: job.latitude || undefined,
        longitude: job.longitude || undefined,
      },
      employmentType: 'permanent' as const,
      workload: {
        min: 80,
        max: 100,
      },
      workModel,
      salary: {
        min: job.annualSalaryFrom || undefined,
        max: job.annualSalaryTo || undefined,
        isPublic: !!(job.annualSalaryFrom && job.annualSalaryTo),
      },
      skills: job.technologies?.map((skill) => ({ skill })) || [],
      responsibilities: responsibilitiesText ? createRichText(responsibilitiesText) : undefined,
      requirements: requirementsText ? createRichText(requirementsText) : undefined,
      benefits: benefitsText ? createRichText(benefitsText) : undefined,
      status: 'active' as const,
      publishedAt: job.activeFrom || new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      applicationUrl: job.redirectJobUrl || `https://swissdevjobs.ch/jobs/${job.jobUrl}`,
    }

    try {
      const existing = await payload.find({
        collection: 'jobs',
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'jobs',
          id: existing.docs[0].id,
          data: jobData,
        })
        updated++
      } else {
        await payload.create({
          collection: 'jobs',
          data: jobData,
        })
        created++
      }

      if ((created + updated) % 25 === 0) {
        console.log(`  ... processed ${created + updated}/${validJobs.length} jobs`)
      }

      // Small delay to avoid rate limiting
      if (i % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    } catch (err) {
      console.error(`  ✗ Error with job "${job.name}":`, err)
      skipped++
    }
  }

  console.log('\n✅ Sync completed!')
  console.log(`   Created: ${created} jobs`)
  console.log(`   Updated: ${updated} jobs`)
  console.log(`   Skipped: ${skipped} jobs`)

  process.exit(0)
}

syncJobs().catch((err) => {
  console.error('Sync failed:', err)
  process.exit(1)
})
