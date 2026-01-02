/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'
import type { NextRequest } from 'next/server'

type Args = {
  params: Promise<{
    payload: string[]
  }>
}

export const GET = async (request: NextRequest, args: Args) => {
  const { payload } = await args.params
  return REST_GET(config)(request, { params: Promise.resolve({ slug: payload }) })
}

export const POST = async (request: NextRequest, args: Args) => {
  const { payload } = await args.params
  return REST_POST(config)(request, { params: Promise.resolve({ slug: payload }) })
}

export const DELETE = async (request: NextRequest, args: Args) => {
  const { payload } = await args.params
  return REST_DELETE(config)(request, { params: Promise.resolve({ slug: payload }) })
}

export const PATCH = async (request: NextRequest, args: Args) => {
  const { payload } = await args.params
  return REST_PATCH(config)(request, { params: Promise.resolve({ slug: payload }) })
}

export const PUT = async (request: NextRequest, args: Args) => {
  const { payload } = await args.params
  return REST_PUT(config)(request, { params: Promise.resolve({ slug: payload }) })
}

export const OPTIONS = async (request: NextRequest, args: Args) => {
  const { payload } = await args.params
  return REST_OPTIONS(config)(request, { params: Promise.resolve({ slug: payload }) })
}
