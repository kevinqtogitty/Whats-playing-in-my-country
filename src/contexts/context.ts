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

  signedInOrNot: string
  setSignedInOrNot: React.Dispatch<React.SetStateAction<string>>

  userWatchList: Films[]
  setUserWatchList: React.Dispatch<React.SetStateAction<Films[]>>

  currentUID: string
  setCurrentUID: React.Dispatch<React.SetStateAction<string>>

  currentUser: object
  setCurrentUser: React.Dispatch<React.SetStateAction<object>>
}
export const CurrentCountryContext = createContext<CurrentCountryStore>({} as CurrentCountryStore)
