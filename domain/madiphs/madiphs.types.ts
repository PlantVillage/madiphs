export type CountrySurveyStatistic = {
  crop_name: string
  disease_name: string | null
  count: number
  made_by_dream_team_count: number
  made_by_non_dream_team_count: number
  panel_link: string
}

type EpaOption = {
  value: string
  label: string
}

type CropOption = {
  value: string
  label: string
}

export type MadiphsData = {
  country_statistics: CountrySurveyStatistic[]
  html_weather_map_url: string | null
  epa_options: EpaOption[]
  crop_options: CropOption[]
}
