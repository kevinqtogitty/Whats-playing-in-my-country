import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import '../index.css'

import AuthRoute from '../firebase/userAuth'
import NavBar from '../functional components/NavBar'
import Account from './Account'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Home from './Home'

import { Films } from '../types/interfaces_types'
import { retrieveUserDoc } from '../firebase/userServices'
import { MainStore } from '../contexts/context'

const currentCountryFromSessionStorage: string =
  sessionStorage.getItem('current-country') || 'United Kingdom'

const currentCountryKeyFromSessionStorage: string =
  sessionStorage.getItem('current-country-key') || 'GB'

const signedInOrNotFromSessionStorage: string = JSON.parse(
  sessionStorage.getItem('signed-in') || 'false',
)

const App: React.FC = () => {
  const [currentCountry, setCurrentCountry] = useState<string>(currentCountryFromSessionStorage)
  const [currentCountryKey, setCurrentCountryKey] = useState<string>(
    currentCountryKeyFromSessionStorage,
  )
  const [films, setFilms] = useState<Films[]>([])
  const [upcomingFilms, setUpcomingFilms] = useState<Films[]>([])

  const [signedInOrNot, setSignedInOrNot] = useState<string>(signedInOrNotFromSessionStorage)
  const [userWatchList, setUserWatchList] = useState<Films[]>([])
  const [currentUID, setCurrentUID] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<{ [key: string]: any }>({})

  //Set the current user to the data retreive from the db
  const retrieveDoc = async () => {
    const currentUser = await retrieveUserDoc(currentUID)
    setUserWatchList(currentUser.watchList!)
    setCurrentUser(currentUser)
  }

  //If the user is logged in retrieve their data
  useEffect(() => {
    if (currentUID !== '') {
      retrieveDoc()
    }
  }, [currentUID])

  //Grab data from local storage
  useEffect(() => {
    sessionStorage.setItem('current-country', currentCountry)
  }, [currentCountry])

  useEffect(() => {
    sessionStorage.setItem('current-country-key', currentCountryKey)
  }, [currentCountryKey])

  useEffect(() => {
    sessionStorage.setItem('signed-in', JSON.stringify(signedInOrNot))
  }, [signedInOrNot])

  return (
    <>
      <BrowserRouter>
        <MainStore.Provider
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
            userWatchList,
            setUserWatchList,
            currentUID,
            setCurrentUID,
            currentUser,
            setCurrentUser,
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
        </MainStore.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
