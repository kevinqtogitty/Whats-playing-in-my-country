import React, { createContext } from 'react'

interface Store {
  currentCountry: string
  setCurrentCountry: React.Dispatch<React.SetStateAction<string>>
}
export const CurrentCountryContext = createContext<Store>({} as Store)
