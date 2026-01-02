import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const API_URL = 'https://api.companyenrich.com/companies/enrich'

interface EnrichResponse {
  logo?: string
  logo_url?: string
  name?: string
  domain?: string
  website?: string
  error?: string
}

interface LogoResult {
  logoUrl: string
  domain: string
  website?: string
}

function getDomainCandidates(companyName: string): string[] {
  const suffixPattern = /\s+(AG|GmbH|SA|Sagl|Ltd|Inc|Corp|SE|Co\.?\s*KG?|Foundation|Schweiz|Switzerland|Deutschland|Group|Labs?|BFH|ETH)\s*$/gi

  let baseName = companyName
    .replace(suffixPattern, '')
    .replace(suffixPattern, '')
    .replace(/[|]/g, ' ')
    .trim()

  const candidates: string[] = []
  const tlds = ['ch', 'com', 'io', 'ai', 'app', 'org', 'de', 'tech']

  const fullClean = baseName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const firstWord = baseName.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9]/g, '')
  const hyphenated = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const acronyms = companyName.match(/\b[A-Z]{2,}\b/g)?.map(a => a.toLowerCase()) || []

  for (const tld of tlds) {
    if (firstWord && firstWord.length >= 2) {
      candidates.push(`${firstWord}.${tld}`)
    }
    if (fullClean && fullClean !== firstWord) {
      candidates.push(`${fullClean}.${tld}`)
    }
    if (hyphenated && hyphenated !== firstWord && hyphenated !== fullClean) {
      candidates.push(`${hyphenated}.${tld}`)
    }
    for (const acronym of acronyms) {
      if (acronym !== firstWord) {
        candidates.push(`${acronym}.${tld}`)
      }
    }
  }

  return [...new Set(candidates)]
}

async function fetchLogoUrl(domain: string, apiKey: string): Promise<LogoResult | null> {
  try {
    const response = await fetch(
      `${API_URL}?domain=${encodeURIComponent(domain)}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    )

    if (!response.ok) return null

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

// GET: Check how many companies need logos (for debugging)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const expectedToken = process.env.SYNC_SECRET || process.env.PAYLOAD_SECRET

  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })

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

    return NextResponse.json({
      needsLogos: companies.length,
      sampleCompanies: companies.slice(0, 5).map(c => ({ id: c.id, name: c.name, logoUrl: c.logoUrl })),
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const expectedToken = process.env.SYNC_SECRET || process.env.PAYLOAD_SECRET

  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.COMPANYENRICH_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'COMPANYENRICH_API_KEY not configured' }, { status: 500 })
  }

  try {
    const payload = await getPayload({ config })

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

    let enriched = 0
    let failed = 0

    for (const company of companies) {
      const domainCandidates = getDomainCandidates(company.name)
      let result: LogoResult | null = null

      for (const domain of domainCandidates.slice(0, 5)) {
        result = await fetchLogoUrl(domain, apiKey)
        if (result) break
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      if (!result) {
        failed++
        await new Promise(resolve => setTimeout(resolve, 2000))
        continue
      }

      try {
        const updateData: Record<string, unknown> = {
          logoUrl: result.logoUrl,
        }
        if (result.website) {
          updateData.website = result.website
        }

        await payload.update({
          collection: 'companies',
          id: company.id,
          data: updateData,
        })
        enriched++
      } catch {
        failed++
      }

      // Rate limiting - 10 req/min
      await new Promise(resolve => setTimeout(resolve, 6000))
    }

    return NextResponse.json({
      success: true,
      total: companies.length,
      enriched,
      failed,
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
