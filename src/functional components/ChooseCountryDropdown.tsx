import React, { useState, useEffect, useContext } from 'react'

//Individual Components
import { CountryDropdown } from './styled components/countryDropdown'

//Constant Variables
import { countryOptions } from '../constants/constants'

//Services
import { currentlyPlaying, upcomingMovies } from '../services/films'

//Types
import { CurrentCountryContext } from '../contexts/context'

const ChooseCountry: React.FC = () => {
  const [countryKey, setCountryKey] = useState<string>('GB')
  const { setCurrentCountry } = useContext(CurrentCountryContext)
  const { setFilms } = useContext(CurrentCountryContext)
  const { setUpcomingFilms } = useContext(CurrentCountryContext)

  //on a specific element, the HTMLSelectElement
  const changeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const switchCountryKey = event.target.value
    const countryToSwitch = countryOptions.find((country) => country.id === switchCountryKey)
    setCurrentCountry(countryToSwitch!.label)
    setCountryKey(countryToSwitch!.id)
  }

  useEffect(() => {
    currentlyPlaying(countryKey, setFilms)
  }, [countryKey])

  useEffect(() => {
    upcomingMovies(countryKey, setUpcomingFilms)
  }, [countryKey])

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
