/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable no-unsafe-negation */
import { currentBaseUrl, upcomingMoviesBaseUrl } from '../constants/constants'

import axios from 'axios'
import React, { SetStateAction } from 'react'

const tmdbKey = import.meta.env.VITE_TMDB_API_KEY

export const currentlyPlaying = async (country: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${currentBaseUrl}${country}`)
    return data.results
  } catch (error) {
    console.log(error)
  }
}

export const upcomingMovies = async (country: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${upcomingMoviesBaseUrl}${country}`)
    return data.results
  } catch (error) {
    console.log(error)
  }
}

export const getTrailer = async (filmID: number): Promise<any> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmID}/videos?api_key=${tmdbKey}`
    )
    return data.results
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAvailableOn = async (
  filmID: number,
  setAvailableOn: React.Dispatch<SetStateAction<any>>,
  setRentOn: React.Dispatch<SetStateAction<any>>,
  currentCountryKey: string
): Promise<void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmID}/watch/providers?api_key=${tmdbKey}`
    )
    // console.log(data.results[currentCountryKey].flatrate)
    const returnedDataObject = data.results[currentCountryKey]
    // console.log(returnedDataObject)
    if (data.results[currentCountryKey] === undefined) {
      setRentOn(['Not available anywhere'])
      setAvailableOn(['Not available anywhere'])

      return
    } else if ('flatrate' in returnedDataObject && !('rent' in returnedDataObject)) {
      const placesToStream = returnedDataObject.flatrate.map(
        (provider: { provider_name: any }) => provider.provider_name
      )

      setAvailableOn(placesToStream)
      setRentOn(['Not available anywhere'])
      return
    } else if (!('flatrate' in returnedDataObject) && 'rent' in returnedDataObject) {
      const placesToRent = returnedDataObject.rent.map(
        (provider: { provider_name: any }) => provider.provider_name
      )

      setRentOn(placesToRent)
      setAvailableOn(['Not available anywhere'])
      return
    } else if ('flatrate' in returnedDataObject && 'rent' in returnedDataObject) {
      const placesToRent = returnedDataObject.rent.map(
        (provider: { provider_name: any }) => provider.provider_name
      )
      const placesToStream = returnedDataObject.flatrate.map(
        (provider: { provider_name: any }) => provider.provider_name
      )

      setRentOn(placesToRent)
      setAvailableOn(placesToStream)
      return
    }
    // const placesToRent = data.results[currentCountryKey].rent.map(
    //   (provider: { provider_name: any }) => provider.provider_name
    // )
    //   setRentOn(placesToRent)
    //   setAvailableOn(['Not available to stream anywhere'])
    //   return
    // } else if (data.results[currentCountryKey].rent === null) {
    //   const placesToStream = data.results[currentCountryKey].flatrate.map(
    //     (provider: { provider_name: any }) => provider.provider_name
    //   )
    //   setRentOn(['Not available to rent anywhere'])
    //   setAvailableOn(placesToStream)
    //   return
    // } else if (
    //   data.results[currentCountryKey].rent !== null &&
    //   data.results[currentCountryKey].flatrate !== null
    // ) {
    //   const placesToRent: string[] = data.results[currentCountryKey].rent.map(
    //     (provider: { provider_name: any }) => provider.provider_name
    //   )
    //   const placesToStream: string[] = data.results[currentCountryKey].flatrate.map(
    //     (provider: { provider_name: any }) => provider.provider_name
    //   )
    //   setRentOn(placesToRent)
    //   setAvailableOn(placesToStream)
    //   return
    // }
    return
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getReviews = async (filmID: number): Promise<[]> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmID}/reviews?api_key=${tmdbKey}&language=en-US&page=1`
    )
    return data.results
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getCastAndCrew = async (
  filmID: number,
  setCast: any,
  setDirector: any
): Promise<void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmID}/credits?api_key=${tmdbKey}&language=en-US`
    )
    setCast(
      data.cast.filter(
        (member: { known_for_department: string }) => member.known_for_department !== 'Directing'
      )
    )
    setDirector(
      // eslint-disable-next-line @typescript-eslint/member-delimiter-style
      data.crew.filter((member: { job: string; name: string }) =>
        member.job === 'Director' ? member.name : null
      )
    )
  } catch (error) {
    console.log(error)
    throw error
  }
}
