export default defineEventHandler(async (event) => {
  if (process.env.NODE_ENV !== 'development') {
    throw createError({
      statusCode: 404,
      message: 'Proxy endpoint is only available in development',
    })
  }

  const path = event.context.params?.path || ''
  const query = getQuery(event)

  try {
    const response = await $fetch.raw(`${process.env.NUXT_INTERNAL_PROXY_BASE_URL}/${path}`, {
      method: event.method,
      query,
    })
    return response._data
  }
  catch (error: unknown) {
    console.error(`Proxy error for /${path}:`, error)
    throw error
  }
})
