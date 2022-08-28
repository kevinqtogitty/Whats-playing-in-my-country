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
