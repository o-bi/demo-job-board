import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Where } from 'payload'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500)
  const page = parseInt(searchParams.get('page') || '1')
  const category = searchParams.get('category')
  const city = searchParams.get('city')
  const workModel = searchParams.get('workModel')

  try {
    const payload = await getPayload({ config })

    const conditions: Where[] = [
      { status: { equals: 'active' } },
    ]

    if (category) {
      conditions.push({ category: { equals: category } })
    }
    if (city) {
      conditions.push({ 'location.city': { contains: city } })
    }
    if (workModel) {
      conditions.push({ workModel: { equals: workModel } })
    }

    const where: Where = { and: conditions }

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
      externalId: job.externalId,
      shortDescription: job.shortDescription,
      description: job.description,
      category: job.category,
      experienceLevel: job.experienceLevel,
      location: job.location,
      employmentType: job.employmentType,
      workload: job.workload,
      workModel: job.workModel,
      salary: job.salary,
      skills: job.skills?.map((s) => s.skill) || [],
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      benefits: job.benefits,
      company: typeof job.company === 'object' ? {
        id: job.company.id,
        name: job.company.name,
        slug: job.company.slug,
        logoUrl: job.company.logoUrl,
        website: job.company.website,
        industry: job.company.industry,
        size: job.company.size,
        location: job.company.location,
        description: job.company.description,
      } : null,
      applicationUrl: job.applicationUrl,
      applicationEmail: job.applicationEmail,
      status: job.status,
      featured: job.featured,
      publishedAt: job.publishedAt,
      expiresAt: job.expiresAt,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
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
