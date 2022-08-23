import React, { createContext } from 'react'

interface CurrentCountryStore {
  currentCountry: string
  setCurrentCountry: React.Dispatch<React.SetStateAction<string>>
}
export const CurrentCountryContext = createContext<CurrentCountryStore>({} as CurrentCountryStore)

interface UserCredentials {
  firstName: string
  lastName: string
  email: string
  password: string
  signUpOrLogin: boolean

  setFirstName: React.Dispatch<React.SetStateAction<string>>
  setLastName: React.Dispatch<React.SetStateAction<string>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
  setFormType: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserCredentials = createContext<UserCredentials>({} as UserCredentials)
