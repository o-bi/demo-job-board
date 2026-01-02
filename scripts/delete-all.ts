import { getPayload } from 'payload'
import config from '../payload.config'

async function deleteAll() {
  const payload = await getPayload({ config })

  // Delete all jobs first (they reference companies)
  console.log('Deleting all jobs...')
  const jobs = await payload.find({ collection: 'jobs', limit: 1000 })
  for (const job of jobs.docs) {
    await payload.delete({ collection: 'jobs', id: job.id })
  }
  console.log(`Deleted ${jobs.docs.length} jobs`)

  // Delete all companies
  console.log('Deleting all companies...')
  const companies = await payload.find({ collection: 'companies', limit: 1000 })
  for (const company of companies.docs) {
    await payload.delete({ collection: 'companies', id: company.id })
  }
  console.log(`Deleted ${companies.docs.length} companies`)

  console.log('Done!')
  process.exit(0)
}

deleteAll().catch(console.error)
