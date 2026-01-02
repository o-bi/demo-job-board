import { getPayload } from 'payload'
import config from '../payload.config'

async function clearLogos() {
  const payload = await getPayload({ config })
  
  const { docs: companies } = await payload.find({
    collection: 'companies',
    where: { logoUrl: { exists: true } },
    limit: 500,
  })
  
  console.log(`Clearing logoUrl from ${companies.length} companies...`)
  
  for (const company of companies) {
    await payload.update({
      collection: 'companies',
      id: company.id,
      data: { logoUrl: null },
    })
  }
  
  console.log('Done!')
  process.exit(0)
}

clearLogos().catch(console.error)
