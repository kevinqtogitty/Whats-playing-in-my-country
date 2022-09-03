import React, { createContext } from 'react'
import { Films } from '../types/interfaces_types'

interface MainStore {
  currentCountryKey: string
  setCurrentCountryKey: React.Dispatch<React.SetStateAction<string>>
  currentCountry: string
  setCurrentCountry: React.Dispatch<React.SetStateAction<string>>
  upcomingFilms: Films[]
  setUpcomingFilms: React.Dispatch<React.SetStateAction<Films[]>>
  films: Films[]
  setFilms: React.Dispatch<React.SetStateAction<Films[]>>

  signedInOrNot: string
  setSignedInOrNot: any

  userWatchList: Films[]
  setUserWatchList: React.Dispatch<React.SetStateAction<Films[]>>

  currentUID: string
  setCurrentUID: any

  currentUser: object
  setCurrentUser: React.Dispatch<React.SetStateAction<object>>

  showAddedMessage: string
  setShowAddedMessage: React.Dispatch<React.SetStateAction<string>>

  showTheMessage: boolean
  setShowTheMessage: React.Dispatch<React.SetStateAction<boolean>>
}
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-redeclare
export const MainStore = createContext<MainStore>({} as MainStore)
