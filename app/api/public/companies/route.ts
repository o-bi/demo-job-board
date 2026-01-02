import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500)
  const page = parseInt(searchParams.get('page') || '1')
  const industry = searchParams.get('industry')
  const canton = searchParams.get('canton')

  try {
    const payload = await getPayload({ config })

    const where: Record<string, unknown> = {}

    if (industry) {
      where.industry = { equals: industry }
    }
    if (canton) {
      where['location.canton'] = { equals: canton }
    }

    const { docs, totalDocs, totalPages } = await payload.find({
      collection: 'companies',
      where,
      limit,
      page,
      sort: 'name',
      depth: 0,
    })

    const companies = docs.map((company) => ({
      id: company.id,
      name: company.name,
      slug: company.slug,
      logoUrl: company.logoUrl,
      website: company.website,
      industry: company.industry,
      size: company.size,
      location: company.location,
    }))

    return NextResponse.json({
      companies,
      pagination: {
        total: totalDocs,
        totalPages,
        page,
        limit,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
