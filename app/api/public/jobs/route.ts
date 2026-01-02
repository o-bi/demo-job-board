import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500)
  const page = parseInt(searchParams.get('page') || '1')
  const category = searchParams.get('category')
  const city = searchParams.get('city')
  const workModel = searchParams.get('workModel')

  try {
    const payload = await getPayload({ config })

    const where: Record<string, unknown> = {
      status: { equals: 'active' },
    }

    if (category) {
      where.category = { equals: category }
    }
    if (city) {
      where['location.city'] = { contains: city }
    }
    if (workModel) {
      where.workModel = { equals: workModel }
    }

    const { docs, totalDocs, totalPages } = await payload.find({
      collection: 'jobs',
      where,
      limit,
      page,
      sort: '-publishedAt',
      depth: 1,
    })

    const jobs = docs.map((job) => ({
      id: job.id,
      title: job.title,
      slug: job.slug,
      shortDescription: job.shortDescription,
      category: job.category,
      experienceLevel: job.experienceLevel,
      location: job.location,
      employmentType: job.employmentType,
      workload: job.workload,
      workModel: job.workModel,
      salary: job.salary?.isPublic ? job.salary : undefined,
      skills: job.skills?.map((s) => s.skill) || [],
      company: typeof job.company === 'object' ? {
        id: job.company.id,
        name: job.company.name,
        slug: job.company.slug,
        logoUrl: job.company.logoUrl,
        industry: job.company.industry,
      } : null,
      publishedAt: job.publishedAt,
      expiresAt: job.expiresAt,
      applicationUrl: job.applicationUrl,
    }))

    return NextResponse.json({
      jobs,
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
