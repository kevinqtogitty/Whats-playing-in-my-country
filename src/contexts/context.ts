import React, { createContext } from 'react'
import { Films } from '../types/film'

interface CurrentCountryStore {
  currentCountry: string
  setCurrentCountry: React.Dispatch<React.SetStateAction<string>>
  upcomingFilms: Films[]
  setUpcomingFilms: React.Dispatch<React.SetStateAction<Films[]>>
  films: Films[]
  setFilms: React.Dispatch<React.SetStateAction<Films[]>>
}
export const CurrentCountryContext = createContext<CurrentCountryStore>({} as CurrentCountryStore)

interface UserCredentials {
  email: string
  password: string

  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
}

export const UserCredentials = createContext<UserCredentials>({} as UserCredentials)
