import { Countries } from '../types/countries'

export const upcomingMoviesBaseUrl: String =
  'https://api.themoviedb.org/3/discover/movie?api_key=2b6cca6c77b9ad3c3ed56ae58ea9112d&primary_release_date.gte=2022-11-01&sort_by=release_date.asc&region='

export const currentBaseUrl: String =
  'https://api.themoviedb.org/3/movie/now_playing?api_key=2b6cca6c77b9ad3c3ed56ae58ea9112d&language=en-US&page=1&region='

export const posterBaseUrl: String = 'https://image.tmdb.org/t/p/w300'

export const countryOptions: Countries[] = [
  { label: 'United Kingdom', id: 'GB' },
  { label: 'United States', id: 'US' },
  { label: 'Australia', id: 'AU' },
  { label: 'Germany', id: 'DE' },
  { label: 'Russia', id: 'RU' },
  { label: 'Poland', id: 'PL' },
  { label: 'France', id: 'FR' },
  { label: 'Mexico', id: 'MX' },
  { label: 'Italy', id: 'IT' },
  { label: 'Japan', id: 'JP' },
]
