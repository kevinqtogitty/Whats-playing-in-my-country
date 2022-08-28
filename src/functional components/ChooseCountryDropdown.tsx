import React, { useEffect, useContext } from 'react'

//Individual Components
import { CountryDropdown } from './individual styled components/countryDropdown'

//Constant Variables
import { countryOptions } from '../constants/constants'

//Services
import { currentlyPlaying, upcomingMovies } from '../services/films'

//Types
import { MainStore } from '../contexts/context'

const ChooseCountry: React.FC = () => {
  const { currentCountryKey, setCurrentCountryKey, setCurrentCountry, setFilms, setUpcomingFilms } =
    useContext(MainStore)

  // Everytime the country changes change the currently playing
  useEffect(() => {
    currentlyPlaying(currentCountryKey, setFilms)
  }, [currentCountryKey])

  // //Everytime the country changes change the upcoming movies
  useEffect(() => {
    upcomingMovies(currentCountryKey, setUpcomingFilms)
  }, [currentCountryKey])

  // //Everytime the country key changes store the key in local storage
  useEffect(() => {
    sessionStorage.setItem('current-country-key', currentCountryKey)
  }, [currentCountryKey])

  //on a specific element, the HTMLSelectElement
  const changeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const switchCountryKey = event.target.value
    const countryToSwitch = countryOptions.find((country) => country.id === switchCountryKey)
    setCurrentCountry(countryToSwitch!.label)
    setCurrentCountryKey(countryToSwitch!.id)
  }

  return (
    <>
      <CountryDropdown onChange={changeCountry}>
        <option selected={true} disabled={true}>
          Country
        </option>
        {countryOptions.map((country) => (
          <option value={country.id}>{country.label}</option>
        ))}
      </CountryDropdown>
    </>
  )
}

export default ChooseCountry
