import React, { useState, useEffect, useContext } from 'react'

//Individual Components
import { CountryDropdown } from '../countryDropdown'
import { CountryOption } from '../buttons'

//Constant Variables
import { countryOptions } from '../../constants/constants'

//Services
import { currentlyPlaying, upcomingMovies } from '../../services/films'

//Types
import { Films } from '../../types/film'
import { CurrentCountryContext } from '../../context'

interface ChooseCountryProps {
  //Setter functions get this type definition
  setFilms: React.Dispatch<React.SetStateAction<Films[]>>
  setUpcomingFilms: React.Dispatch<React.SetStateAction<Films[]>>
}

const ChooseCountry: React.FC<ChooseCountryProps> = (props) => {
  const [countryKey, setCountryKey] = useState<string>('GB')
  const { setCurrentCountry } = useContext(CurrentCountryContext)
  const { setFilms, setUpcomingFilms } = props

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
    <CountryDropdown onChange={changeCountry}>
      <CountryOption selected={true} disabled={true}>
        Choose your country
      </CountryOption>
      {countryOptions.map((country) => (
        <CountryOption value={country.id}>{country.label}</CountryOption>
      ))}
    </CountryDropdown>
  )
}

export default ChooseCountry
