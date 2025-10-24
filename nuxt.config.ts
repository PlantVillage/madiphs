import tailwindcss from '@tailwindcss/vite'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

function prepareTheme(input: unknown): unknown {
  if (input == null || typeof input === 'function') {
    throw Error(`Unsupported config entry: ${typeof input}`)
  }

  if (Array.isArray(input)) {
    return input.map(val => prepareTheme(val))
  }

  if (typeof input === 'object') {
    return Object.entries(input).reduce(
      (acc, [key, val]) => ({
        ...acc,
        [key]: prepareTheme(
          key === 'colorScheme' ? redefineDarkScheme(val) : val,
        ),
      }),
      {} as Record<string, unknown>,
    )
  }

  return input
}

// Why?
// The official way of disabling dark mode isn't working properly.
// What?:
// Redefine colorScheme that could be found in many places (global colorScheme, components)
function redefineDarkScheme(input: {
  dark: Record<string, unknown>
  light: Record<string, unknown>
}) {
  return {
    ...input,
    dark: input.light,
  }
}

export const AuraCustom = prepareTheme(
  definePreset(Aura, {
    semantic: {
      primary: {
        50: '{blue.50}',
        100: '{blue.100}',
        200: '{blue.200}',
        300: '{blue.300}',
        400: '{blue.400}',
        500: '{blue.500}',
        600: '{blue.600}',
        700: '{blue.700}',
        800: '{blue.800}',
        900: '{blue.900}',
        950: '{blue.950}',
      },
    },
  }),
)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
    '@primevue/nuxt-module',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '',
      plantVillageBaseUrl: process.env.NUXT_PUBLIC_PLANT_VILLAGE_BASE_URL || '',
    },
  },
  devServer: {
    port: 3002,
  },
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        // Don't reload page automatically when server routes change
        overlay: false,
      },
      watch: {
        // Ignore changes in server for automatic client reload
        ignored: ['**/server/**'],
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: AuraCustom,
      },
    },
  },
})
