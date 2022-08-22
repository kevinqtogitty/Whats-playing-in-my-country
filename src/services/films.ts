import { currentBaseUrl, upcomingMoviesBaseUrl } from '../constants/constants'

import axios from 'axios'
import { Films } from '../types/film'

export const currentlyPlaying = async (
  country: String,
  setFilms: React.Dispatch<React.SetStateAction<Films[]>>,
) => {
  const { data } = await axios.get(`${currentBaseUrl}${country}`)
  setFilms(data.results)
}

export const upcomingMovies = async (
  country: String,
  setUpcomingMovies: React.Dispatch<React.SetStateAction<Films[]>>,
) => {
  const { data } = await axios.get(`${upcomingMoviesBaseUrl}${country}`)

  setUpcomingMovies(data.results)
}
