export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Initialize Payload on server startup to ensure schema is pushed before requests
    const { getPayload } = await import('payload')
    const config = await import('@payload-config')

    console.log('[Instrumentation] Initializing Payload...')
    await getPayload({ config: config.default })
    console.log('[Instrumentation] Payload initialized successfully')
  }
}
