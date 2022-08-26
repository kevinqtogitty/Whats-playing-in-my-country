import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import AuthRoute from '../contexts/userAuth'

import NavBar from '../functional components/NavBar'
import Account from './Account'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Home from './Home'
import { CurrentCountryContext } from '../contexts/context'
import { Films } from '../types/film'

const currentCountryFromLocalStorage: string = JSON.parse(
  window.localStorage.getItem('current-country') || 'United Kingdom',
)

const currentCountryKeyFromLocalStorage: string = JSON.parse(
  window.localStorage.getItem('current-country-key') || 'GB',
)

const signedInOrNotFromLocalStorage: boolean = JSON.parse(
  window.localStorage.getItem('signed-in') || 'false',
)

const App: React.FC = () => {
  const [currentCountry, setCurrentCountry] = useState<string>(currentCountryFromLocalStorage)
  const [currentCountryKey, setCurrentCountryKey] = useState<string>(
    currentCountryKeyFromLocalStorage,
  )
  const [signedInOrNot, setSignedInOrNot] = useState<boolean>(signedInOrNotFromLocalStorage)
  const [upcomingFilms, setUpcomingFilms] = useState<Films[]>([])
  const [films, setFilms] = useState<Films[]>([])

  useEffect(() => {
    window.localStorage.setItem('current-country', JSON.stringify(currentCountry))
  }, [currentCountry])

  useEffect(() => {
    window.localStorage.setItem('current-country-key', JSON.stringify(currentCountryKey))
  }, [currentCountryKey])

  useEffect(() => {
    window.localStorage.setItem('signed-in', JSON.stringify(signedInOrNot))
  }, [signedInOrNot])

  return (
    <>
      <BrowserRouter>
        <CurrentCountryContext.Provider
          value={{
            signedInOrNot,
            setSignedInOrNot,
            currentCountryKey,
            setCurrentCountryKey,
            currentCountry,
            setCurrentCountry,
            films,
            setFilms,
            upcomingFilms,
            setUpcomingFilms,
          }}
        >
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='signIn' element={<SignIn />} />
            <Route path='signUp' element={<SignUp />} />
            <Route
              path='account'
              element={
                <AuthRoute>
                  <Account />{' '}
                </AuthRoute>
              }
            />
          </Routes>
        </CurrentCountryContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
