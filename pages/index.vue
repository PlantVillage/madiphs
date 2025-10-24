<script setup lang="ts">
import { z } from 'zod'
import { toRef } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'

import { useApi } from '~/composables/useApi'
import { useApiState } from '~/composables/useApiState'
import { useObjectDateRangeAdapter } from '~/composables/useDateRange'

import CountryFlag from '~/components/CountryFlag.vue'
import type { CountrySurveyStatistic, MadiphsData } from '~/domain/madiphs/madiphs.types'

const config = useRuntimeConfig()
const api = useApi()

const querySchema = z.object({
  date_range: z
    .object({
      beginning: z.string().optional(),
      ending: z.string().optional(),
    })
    .default({}),
  crop_name: z.string().optional(),
  epa: z.string().optional(),
})

const { state, data, loading } = await useApiState<typeof querySchema._type, MadiphsData>(
  querySchema,
  {
    fetchData: async (params) => {
      return await api.getMadiphsData<MadiphsData>(params)
    },
    dataDebounce: 500,
    nuxtKey: 'madiphs-data',
  },
)

const { dateRange } = useObjectDateRangeAdapter(
  toRef(state.date_range),
  'beginning',
  'ending',
  true,
)

const handleRowClick = ({ data }: { data: CountrySurveyStatistic }) => {
  if (data.panel_link !== '#') {
    window.open(
      `${config.public.plantVillageBaseUrl}${data.panel_link}`,
      '_blank',
    )
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-10">
    <div class="max-w-7xl mx-auto">
      <a
        class="inline-block"
        href="https://madiphs.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/madiphs_logo.png"
          alt="Madiphs Logo"
        >
      </a>

      <div class="mt-6 grid md:grid-cols-2 grid-cols-[1fr_auto] gap-2 md:gap-4 items-center">
        <div>
          <h1 class="text-3xl font-semibold text-slate-700">
            Welcome!
          </h1>
          <div class="mt-4 flex flex-wrap gap-4 md:flex-nowrap">
            <DatePicker
              v-model="dateRange"
              date-format="dd/mm/yy"
              selection-mode="range"
              show-button-bar
              show-icon
              icon-display="input"
              placeholder="Date range"
              hide-on-range-selection
            />
            <Select
              v-model="state.crop_name"
              :options="data?.crop_options ?? []"
              option-label="label"
              option-value="value"
              placeholder="Select Crop"
              class="w-58 md:flex-1"
              show-clear
            />
            <Select
              v-model="state.epa"
              :options="data?.epa_options ?? []"
              option-label="label"
              option-value="value"
              placeholder="Select EPA"
              class="w-58 md:flex-1"
              show-clear
            />
          </div>
        </div>
        <CountryFlag
          country-code="MW"
          class="h-20 md:h-25 lg:h-35 ml-auto"
        />
      </div>

      <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="card">
          <h2 class="mb-4 text-lg font-semibold text-slate-700">
            Pest and Disease reports
          </h2>
          <DataTable
            :value="data?.country_statistics ?? []"
            selection-mode="single"
            :loading="loading"
            class="w-full"
            @row-click="handleRowClick"
          >
            <template #empty>
              No reports found
            </template>
            <Column
              field="crop_name"
              header="Crop"
            />
            <Column
              field="disease_name"
              header="Disease"
            >
              <template #body="{ data: disease }">
                {{ disease.disease_name || "—" }}
              </template>
            </Column>
            <Column
              field="made_by_dream_team_count"
              header="PV records"
            />
            <Column
              field="made_by_non_dream_team_count"
              header="Others"
            />
            <Column
              field="count"
              header="Total"
            />
          </DataTable>
        </div>

        <div class="card flex flex-col">
          <h2 class="mb-4 text-lg font-semibold text-slate-700">
            Rainfall forecast
          </h2>
          <iframe
            v-if="data?.html_weather_map_url"
            :src="data.html_weather_map_url"
            sandbox="allow-scripts allow-same-origin"
            title="Rainfall forecast"
            loading="lazy"
            referrerpolicy="no-referrer"
            class="size-full h-96 rounded-lg border-0"
          />
          <p
            v-else
            class="flex size-full items-center justify-center text-slate-500"
          >
            Rainfall forecast is not available
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-datepicker-input) {
  width: 232px;
}
</style>
