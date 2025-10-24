import type { ZodSchema } from 'zod'
import { reactive, ref } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'

import { stringifyQueryStringParams, parseQueryStringParams, parseValue } from '~/utils/queryStringParams'

interface UseApiStateOptions<T, D = unknown> {
  fetchData?: (params: T) => Promise<D>
  syncDebounce?: number
  dataDebounce?: number
  initialFetch?: boolean
  nuxtKey?: string
}

export const useApiState = async <T extends Record<string, unknown>, D = unknown>(
  schema: ZodSchema<T>,
  options: UseApiStateOptions<T, D> = {},
) => {
  const {
    fetchData,
    syncDebounce = 200,
    dataDebounce = 500,
    initialFetch = true,
    nuxtKey = 'api-state-data',
  } = options

  const router = useRouter()
  const route = useRoute()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<D | null>(null)

  // Parse parameters from URL
  const queryString = new URLSearchParams(route.query as Record<string, string>).toString()
  const parsedQuery = parseValue(
    parseQueryStringParams(queryString),
  ) as Record<string, unknown>

  // State initialization
  // 1. Try to parse URL parameters through schema
  // 2. If it fails or there are no parameters - use defaults from schema
  let initialState: T
  try {
    // If there are parameters in URL, use them
    if (Object.keys(parsedQuery).length > 0) {
      // Parse only those parameters that are in URL
      // The rest will be filled with defaults from schema
      initialState = schema.parse(parsedQuery)
    }
    else {
      // If there are no parameters, use defaults
      initialState = schema.parse({})
    }
  }
  catch {
    // If parsing failed, use defaults
    initialState = schema.parse({})
  }

  const state = reactive(initialState) as T

  // Initial data fetch (SSR-safe)
  if (fetchData && initialFetch) {
    const { data: initialData } = await useAsyncData(
      nuxtKey,
      async () => {
        try {
          return await fetchData(state)
        }
        catch (e: unknown) {
          error.value = e instanceof Error ? e.message : 'Unknown error'
          return null
        }
      },
    )
    data.value = initialData.value
  }

  // Synchronize state changes with URL
  debouncedWatch(
    state,
    (newState) => {
      const search = stringifyQueryStringParams(newState)
      router.replace({
        query: Object.fromEntries(new URLSearchParams(search)),
      })
    },
    { debounce: syncDebounce, maxWait: syncDebounce * 2 },
  )

  // Optional data loading when parameters change
  if (fetchData) {
    debouncedWatch(
      state,
      async (newState) => {
        loading.value = true
        error.value = null
        try {
          data.value = await fetchData(newState)
        }
        catch (e: unknown) {
          error.value = e instanceof Error ? e.message : 'Unknown error'
          data.value = null
        }
        finally {
          loading.value = false
        }
      },
      { debounce: dataDebounce, maxWait: dataDebounce * 2 },
    )
  }

  return {
    state,
    data,
    loading,
    error,
  }
}
