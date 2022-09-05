import { Countries } from '../types/interfaces_types'
const tmdbKey = import.meta.env.VITE_TMDB_API_KEY

export const movieBaseUrl: string = 'https://api.themoviedb.org/3/movie/'

export const getUpcomingMoviesBaseUrl: string = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbKey}&primary_release_date.gte=2022-11-01&sort_by=release_date.asc&region=`

export const currentBaseUrl: string = `${movieBaseUrl}now_playing?api_key=${tmdbKey}&language=en-US&page=1&region=`

export const trailerUrl: string = `videos?api_key=${tmdbKey}`

export const posterBaseUrl: string = 'https://image.tmdb.org/t/p/w300'

export const youTubeTrailerBaseUrl: string = 'https://www.youtube.com/watch?v='

export const youTubeEmbed: string = 'https://www.youtube.com/embed/'

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
  { label: 'Japan', id: 'JP' }
]
