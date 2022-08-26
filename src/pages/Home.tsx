import { useState, useEffect } from 'react'
import { CurrentCountryContext } from '../contexts/context'
import CurrrentlyPlaying from '../functional components/CurrentlyPlaying'
import UpcomingIn from '../functional components/UpcomingIn'
import { Films } from '../types/film'

// const currentCountryFromLocalStorage: string = JSON.parse(
//   window.localStorage.getItem('current-country') || 'United Kingdom',
// )

const Home: React.FC = () => {
  //   const [currentCountry, setCurrentCountry] = useState<string>(currentCountryFromLocalStorage)
  //   //   const [currentCountryKey, setCurrentCountryKey] = useState<string>
  //   const [upcomingFilms, setUpcomingFilms] = useState<Films[]>([])
  //   const [films, setFilms] = useState<Films[]>([])

  // const [signedIn, setSignedIn] = useState<string>(signedInOrNotFromLocalStorage)

  // //When the current country is change store it in localstorage
  //   useEffect(() => {
  //     localStorage.setItem('current-country', JSON.stringify(currentCountry))
  //   }, [currentCountry])

  return (
    <>
      <CurrrentlyPlaying />
      <UpcomingIn />
    </>
  )
}

export default Home
