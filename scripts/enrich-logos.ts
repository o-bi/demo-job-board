import { getPayload } from 'payload'
import config from '../payload.config'

const COMPANYENRICH_API_KEY = process.env.COMPANYENRICH_API_KEY || 'kqCeRNLOh6rkBb5gLDglJ'
const API_URL = 'https://api.companyenrich.com/companies/enrich'

interface EnrichResponse {
  logo?: string
  logo_url?: string
  name?: string
  domain?: string
  website?: string
  error?: string
}

function extractDomainFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`)
    return parsed.hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

// Derive possible domains from company name or website
function getDomainCandidates(companyName: string, website?: string | null): string[] {
  // If website is provided, use it first
  if (website) {
    const domain = extractDomainFromUrl(website)
    if (domain) {
      return [domain]
    }
  }

  // Fall back to guessing from company name
  const suffixPattern = /\s+(AG|GmbH|SA|Sagl|Ltd|Inc|Corp|SE|Co\.?\s*KG?|Foundation|Schweiz|Switzerland|Deutschland|Group|Labs?|BFH|ETH)\s*$/gi

  let baseName = companyName
    .replace(suffixPattern, '')
    .replace(suffixPattern, '') // Apply twice for cases like "Schweiz AG"
    .replace(/[|]/g, ' ')
    .trim()

  const candidates: string[] = []
  const tlds = ['ch', 'com', 'io', 'ai', 'app', 'org', 'de', 'tech']

  // Full name without spaces
  const fullClean = baseName.toLowerCase().replace(/[^a-z0-9]/g, '')

  // First word only (e.g., "ATSP Schweiz" → "atsp")
  const firstWord = baseName.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9]/g, '')

  // Hyphenated version
  const hyphenated = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  // Acronym detection (e.g., "IGE | IPI" → "ige", "ipi")
  const acronyms = companyName.match(/\b[A-Z]{2,}\b/g)?.map(a => a.toLowerCase()) || []

  // Add candidates in priority order
  for (const tld of tlds) {
    // First word is often the domain
    if (firstWord && firstWord.length >= 2) {
      candidates.push(`${firstWord}.${tld}`)
    }

    // Full name without spaces
    if (fullClean && fullClean !== firstWord) {
      candidates.push(`${fullClean}.${tld}`)
    }

    // Hyphenated
    if (hyphenated && hyphenated !== firstWord && hyphenated !== fullClean) {
      candidates.push(`${hyphenated}.${tld}`)
    }

    // Acronyms
    for (const acronym of acronyms) {
      if (acronym !== firstWord) {
        candidates.push(`${acronym}.${tld}`)
      }
    }
  }

  return [...new Set(candidates)] // Remove duplicates
}

interface LogoResult {
  logoUrl: string
  domain: string
  website?: string
}

async function fetchLogoUrl(domain: string): Promise<LogoResult | null> {
  try {
    const response = await fetch(
      `${API_URL}?domain=${encodeURIComponent(domain)}`,
      {
        headers: {
          'Authorization': `Bearer ${COMPANYENRICH_API_KEY}`,
        },
      }
    )

    if (!response.ok) {
      return null
    }

    const data: EnrichResponse = await response.json()
    const logoUrl = data.logo_url || data.logo
    if (logoUrl) {
      return {
        logoUrl,
        domain: data.domain || domain,
        website: data.website,
      }
    }
    return null
  } catch {
    return null
  }
}

async function enrichLogos() {
  console.log('🖼️  Starting company logo enrichment (deriving domains from company names)...\n')

  const payload = await getPayload({ config })

  // Fetch all companies without logoUrl (check both non-existent and null)
  const { docs: companies } = await payload.find({
    collection: 'companies',
    where: {
      or: [
        { logoUrl: { exists: false } },
        { logoUrl: { equals: null } },
      ],
    },
    limit: 500,
  })

  console.log(`📊 Found ${companies.length} companies without logo URLs\n`)

  let enriched = 0
  let failed = 0

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i]

    console.log(`[${i + 1}/${companies.length}] ${company.name}`)

    // Get domain candidates from website or company name
    const domainCandidates = getDomainCandidates(company.name, company.website)
    console.log(`    🔍 Trying domains: ${domainCandidates.slice(0, 3).join(', ')}...`)

    let result: LogoResult | null = null

    // Try each domain candidate until we find one with a logo
    for (const domain of domainCandidates) {
      result = await fetchLogoUrl(domain)
      if (result) {
        break
      }
      // Small delay between attempts
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    if (!result) {
      console.log('    ❌ No logo found')
      failed++
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 5000))
      continue
    }

    try {
      // Store the logo URL and also update the website if we found the correct one
      const updateData: Record<string, unknown> = {
        logoUrl: result.logoUrl,
      }

      // Update website with the correct one from the API
      if (result.website) {
        updateData.website = result.website
      }

      await payload.update({
        collection: 'companies',
        id: company.id,
        data: updateData,
      })

      console.log(`    ✅ Found via ${result.domain}`)
      console.log(`       Logo: ${result.logoUrl}`)
      if (result.website) {
        console.log(`       Website: ${result.website}`)
      }
      enriched++
    } catch (err) {
      console.log('    ❌ Error saving:', err)
      failed++
    }

    // Rate limiting - API limit is 10 requests per minute
    await new Promise(resolve => setTimeout(resolve, 6000))
  }

  console.log('\n✅ Enrichment completed!')
  console.log(`   Enriched: ${enriched} companies`)
  console.log(`   Failed: ${failed} companies`)

  process.exit(0)
}

enrichLogos().catch((err) => {
  console.error('Enrichment failed:', err)
  process.exit(1)
})
