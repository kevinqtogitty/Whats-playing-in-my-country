import React, { useEffect, useContext } from 'react'

//Individual Components
import { CountryDropdown } from './individual styled components/countryDropdown'

//Constant Variables
import { countryOptions } from '../constants/constants'

//Services
import { currentlyPlaying, upcomingMovies } from '../services/films'

//Types
import { CurrentCountryContext } from '../contexts/context'

const ChooseCountry: React.FC = () => {
  const { currentCountryKey, setCurrentCountryKey } = useContext(CurrentCountryContext)
  const { setCurrentCountry } = useContext(CurrentCountryContext)
  const { setFilms } = useContext(CurrentCountryContext)
  const { setUpcomingFilms } = useContext(CurrentCountryContext)
  const { currentCountry } = useContext(CurrentCountryContext)

  console.log(currentCountry)

  //on a specific element, the HTMLSelectElement
  const changeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const switchCountryKey = event.target.value
    const countryToSwitch = countryOptions.find((country) => country.id === switchCountryKey)
    setCurrentCountry(countryToSwitch!.label)
    setCurrentCountryKey(countryToSwitch!.id)
  }

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
    localStorage.setItem('current-country-key', JSON.stringify(currentCountryKey))
  }, [currentCountryKey])

  return (
    <>
      <CountryDropdown onChange={changeCountry}>
        <option selected={true} disabled={true}>
          Choose your country
        </option>
        {countryOptions.map((country) => (
          <option value={country.id}>{country.label}</option>
        ))}
      </CountryDropdown>
    </>
  )
}

export default ChooseCountry
