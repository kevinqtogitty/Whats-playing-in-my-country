//Tools
import React, { useState } from 'react'

//types
import { Films } from '../types/film'

//Styled Components
import WhatsPlayingIn from '../functional components/WhatsPlayingIn'

//Constants
import UpcomingIn from '../functional components/UpcomingIn'
import { CurrentCountryContext } from '../contexts/context'
import NavBar from '../functional components/NavBar'

import styled from 'styled-components'

const App: React.FC = () => {
  const [currentCountry, setCurrentCountry] = useState<string>('United Kingdom')
  const [upcomingFilms, setUpcomingFilms] = useState<Films[]>([])
  const [films, setFilms] = useState<Films[]>([])

  const Body = styled.body`
    margin-left: 0px;
  `

  return (
    <CurrentCountryContext.Provider
      value={{
        currentCountry,
        setCurrentCountry,
        films,
        setFilms,
        upcomingFilms,
        setUpcomingFilms,
      }}
    >
      <NavBar />
      <WhatsPlayingIn films={films} />
      <UpcomingIn upcomingFilms={upcomingFilms} />
    </CurrentCountryContext.Provider>
  )
}

export default App
