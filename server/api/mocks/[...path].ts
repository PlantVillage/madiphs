export default defineEventHandler(async (event) => {
  if (process.env.NODE_ENV !== 'development') {
    throw createError({
      statusCode: 404,
      message: 'Mock API is only available in development',
    })
  }

  const path = event.context.params?.path || ''
  const query = getQuery(event)

  if (path.includes('api/v1/public/madiphs')) {
    const { mockMadiphsData, filterMadiphsData } = await import('~/server/data/madiphs')

    const filteredData = filterMadiphsData(mockMadiphsData, {
      crop_name: query.crop_name as string | undefined,
      epa: query.epa as string | undefined,
    })

    return { props: filteredData }
  }

  throw createError({
    statusCode: 404,
    message: `Mock for path '${path}' not found`,
  })
})
