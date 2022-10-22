import { MouseEventHandler } from 'react'

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

export interface CardProps {
  original_title: string
  release_date: string
  vote_average: number
  poster_path: string
  overview: string
  id: number
}

export interface ModalProps {
  modalIsOpen: boolean
  youtubeTrailers: string[]
  toggleModal: MouseEventHandler
  props: Films
  availableOn: string[]
  rentOn: string[]
  reviews: any[]
  cast: any[]
  director: []
  key?: number
}

export interface TableProps {
  original_title: string
  release_date: string
  rating: number
  id: number
  overview: string
  poster_path: string
  vote_average: number
}

export interface SignUpProps {
  uid: string
  email: string | null
  firstName: string | null
  lastName?: string
}

export interface AuthRouteProps {
  children: React.ReactNode
}
