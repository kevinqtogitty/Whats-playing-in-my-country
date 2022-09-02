import { currentBaseUrl, upcomingMoviesBaseUrl } from '../constants/constants'

import axios from 'axios'
import { Films } from '../types/interfaces_types'
import React from 'react'

export const currentlyPlaying = async (
  country: String,
  setFilms: React.Dispatch<React.SetStateAction<Films[]>>,
) => {
  try {
    const { data } = await axios.get(`${currentBaseUrl}${country}`)
    setFilms(data.results)
  } catch (error) {
    console.log(error)
  }
}

export const upcomingMovies = async (
  country: String,
  setUpcomingMovies: React.Dispatch<React.SetStateAction<Films[]>>,
) => {
  try {
    const { data } = await axios.get(`${upcomingMoviesBaseUrl}${country}`)
    setUpcomingMovies(data.results)
  } catch (error) {
    console.log(error)
  }
}

export const getTrailer = async (filmID: number, setTrailer: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmID}/videos?api_key=2b6cca6c77b9ad3c3ed56ae58ea9112d`,
    )

    setTrailer(data.results)
    return
  } catch (error) {
    console.log(error)
  }
}

export const getAvailableOn = async (
  filmID: number,
  setAvailableOn: any,
  setRentOn: any,
  currentCountryKey: string,
) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmID}/watch/providers?api_key=2b6cca6c77b9ad3c3ed56ae58ea9112d`,
    )

    if (!data.results[currentCountryKey]) {
      setRentOn(['Not available anywhere'])
      setAvailableOn(['Not available anywhere'])
      return
    } else if (data.results[currentCountryKey].flatrate === undefined) {
      const placesToRent = data.results[currentCountryKey].rent.map(
        (provider: { provider_name: any }) => provider.provider_name,
      )
      setRentOn(placesToRent)
      setAvailableOn(['Not available to rent anywhere'])
      return
    } else if (data.results[currentCountryKey].rent === undefined) {
      const placesToStream = data.results[currentCountryKey].flatrate.map(
        (provider: { provider_name: any }) => provider.provider_name,
      )
      setRentOn(['Not available to rent anywhere'])
      setAvailableOn(placesToStream)
      return
    } else if (
      data.results[currentCountryKey].rent !== undefined &&
      data.results[currentCountryKey].flatrate !== undefined
    ) {
      const placesToRent: string[] = data.results[currentCountryKey].rent.map(
        (provider: { provider_name: any }) => provider.provider_name,
      )
      const placesToStream: string[] = data.results[currentCountryKey].flatrate.map(
        (provider: { provider_name: any }) => provider.provider_name,
      )
      setRentOn(placesToRent)
      setAvailableOn(placesToStream)
      return
    }
    return
  } catch (error) {
    console.log(error)
  }
}

export const getReviews = async (filmID: number, setReviews: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmID}/reviews?api_key=2b6cca6c77b9ad3c3ed56ae58ea9112d&language=en-US&page=1`,
    )
    setReviews(data.results)
    return
  } catch (error) {
    console.log(error)
  }
}

export const getCastAndCrew = async (filmID: number, setCast: any, setDirector: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmID}/credits?api_key=2b6cca6c77b9ad3c3ed56ae58ea9112d&language=en-US`,
    )
    setCast(
      data.cast.filter(
        (member: { known_for_department: string }) => member.known_for_department !== 'Directing',
      ),
    )
    setDirector(
      data.crew.filter((member: { job: string; name: string }) =>
        member.job === 'Director' ? member.name : null,
      ),
    )
  } catch (error) {
    console.log(error)
  }
}
