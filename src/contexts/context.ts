import React, { createContext } from 'react'
import { Films } from '../types/film'

interface CurrentCountryStore {
  currentCountryKey: string
  setCurrentCountryKey: React.Dispatch<React.SetStateAction<string>>
  currentCountry: string
  setCurrentCountry: React.Dispatch<React.SetStateAction<string>>
  upcomingFilms: Films[]
  setUpcomingFilms: React.Dispatch<React.SetStateAction<Films[]>>
  films: Films[]
  setFilms: React.Dispatch<React.SetStateAction<Films[]>>

  signedInOrNot: boolean
  setSignedInOrNot: React.Dispatch<React.SetStateAction<boolean>>
}
export const CurrentCountryContext = createContext<CurrentCountryStore>({} as CurrentCountryStore)
