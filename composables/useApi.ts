import { stringifyQueryStringParams } from '~/utils/queryStringParams'

function cleanParams(
  params?: Record<string, unknown>,
): Record<string, unknown> {
  if (!params) return {}

  const cleaned: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === '') continue

    if (key === 'date_range' && typeof value === 'object' && value !== null) {
      const dateRange = value as { beginning?: string, ending?: string }
      if (!dateRange.beginning && !dateRange.ending) continue
    }

    cleaned[key] = value
  }

  return cleaned
}

export const useApi = () => {
  const config = useRuntimeConfig()

  return {
    async getMadiphsData<T>(params?: {
      date_range?: {
        beginning?: string
        ending?: string
      }
      crop_name?: string
      epa?: string
    }) {
      const cleanedParams = cleanParams(params)
      const queryString
        = Object.keys(cleanedParams).length > 0
          ? `?${stringifyQueryStringParams(cleanedParams)}`
          : ''

      const response = await $fetch<{ props: T }>(
        `${config.public.apiBaseUrl}/api/v1/public/madiphs${queryString}`,
      )
      return response.props
    },
  }
}
