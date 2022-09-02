export interface Countries {
  label: string
  id: string
}

export interface Films {
  id: number
  original_title: string
  poster_path: string
  overview: string
  release_date: string
  vote_average: number
  added?: boolean
}

export interface CurrentUser {
  email?: string
  first_name?: string
  last_name?: string
  watchList?: []
  id: string
}

export interface WatchlistProps {
  posterBaseUrl?: string
  poster_path: string
  original_title: string
  release_date: string
  vote_average: number
  overview: string
  id: number
}

export interface Trailer {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  official: boolean
  published_at: string
  site: string
  size: number
  type: string
}
