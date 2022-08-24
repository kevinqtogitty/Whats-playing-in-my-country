//Tools
import React, { useState } from 'react'

//types
import { Films } from '../types/film'

//Styled Components
import ChooseCountry from '../functional components/ChooseCountryDropdown'
import WhatsPlayingIn from '../functional components/WhatsPlayingIn'
import { Body } from '../styled components/body'

//Constants
import UpcomingIn from '../functional components/UpcomingIn'
import { CurrentCountryContext } from '../context'
import NavBar from '../functional components/NavBar'

const App: React.FC = () => {
  const [currentCountry, setCurrentCountry] = useState<string>('United Kingdom')
  const [upcomingFilms, setUpcomingFilms] = useState<Films[]>([])
  const [films, setFilms] = useState<Films[]>([])

  return (
    <>
      <Body>
        <CurrentCountryContext.Provider value={{ currentCountry, setCurrentCountry }}>
          <NavBar />
          <ChooseCountry setFilms={setFilms} setUpcomingFilms={setUpcomingFilms} />
          <WhatsPlayingIn films={films} />
          <UpcomingIn upcomingFilms={upcomingFilms} />
        </CurrentCountryContext.Provider>
      </Body>
    </>
  )
}

export default App
