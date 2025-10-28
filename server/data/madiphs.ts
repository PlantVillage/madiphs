import type { MadiphsData } from '~/domain/madiphs/madiphs.types'

export const mockMadiphsData: MadiphsData = {
  country_statistics: [
    {
      crop_name: 'Tomato',
      disease_name: 'Late Blight',
      count: 150,
      made_by_dream_team_count: 120,
      made_by_non_dream_team_count: 30,
      panel_link: 'https://example.com/panel/1',
    },
    {
      crop_name: 'Potato',
      disease_name: 'Early Blight',
      count: 98,
      made_by_dream_team_count: 75,
      made_by_non_dream_team_count: 23,
      panel_link: 'https://example.com/panel/2',
    },
    {
      crop_name: 'Wheat',
      disease_name: null,
      count: 203,
      made_by_dream_team_count: 180,
      made_by_non_dream_team_count: 23,
      panel_link: 'https://example.com/panel/3',
    },
    {
      crop_name: 'Maize',
      disease_name: 'Rust',
      count: 87,
      made_by_dream_team_count: 60,
      made_by_non_dream_team_count: 27,
      panel_link: 'https://example.com/panel/4',
    },
  ],
  html_weather_map_url: 'https://example.com/weather-map',
  epa_options: [
    { value: 'epa_1', label: 'EPA Region 1' },
    { value: 'epa_2', label: 'EPA Region 2' },
    { value: 'epa_3', label: 'EPA Region 3' },
  ],
  crop_options: [
    { value: 'tomato', label: 'Tomato' },
    { value: 'potato', label: 'Potato' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'maize', label: 'Maize' },
  ],
}

export function filterMadiphsData(
  data: MadiphsData,
  filters: {
    crop_name?: string
    epa?: string
  },
): MadiphsData {
  const { crop_name } = filters

  if (!crop_name) {
    return data
  }

  return {
    ...data,
    country_statistics: data.country_statistics.filter((stat) => {
      return stat.crop_name.toLowerCase() === crop_name.toLowerCase()
    }),
  }
}
