import React, { createContext } from 'react'

interface CurrentCountryStore {
  currentCountry: string
  setCurrentCountry: React.Dispatch<React.SetStateAction<string>>
}
export const CurrentCountryContext = createContext<CurrentCountryStore>({} as CurrentCountryStore)

interface UserCredentials {
  email: string
  password: string

  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
}

export const UserCredentials = createContext<UserCredentials>({} as UserCredentials)
