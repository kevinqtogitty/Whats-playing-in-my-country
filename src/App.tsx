//Tools
import React, { useState } from 'react'

//types
import { Films } from './types/film'

//Styled Components
import ChooseCountry from './styled components/styled components combined/ChooseCountryDropdown'
import WhatsPlayingIn from './styled components/styled components combined/WhatsPlayingIn'
import { Body } from './styled components/body'

//Constants
import { NavBar } from './styled components/navBar'
import UpcomingIn from './styled components/styled components combined/UpcomingIn'
import { CurrentCountryContext } from './context'

const App: React.FC = () => {
  const [currentCountry, setCurrentCountry] = useState<string>('United Kingdom')
  const [upcomingFilms, setUpcomingFilms] = useState<Films[]>([])
  const [films, setFilms] = useState<Films[]>([])

  return (
    <Body>
      <CurrentCountryContext.Provider value={{ currentCountry, setCurrentCountry }}>
        <NavBar>
          <ChooseCountry setFilms={setFilms} setUpcomingFilms={setUpcomingFilms} />
        </NavBar>
        <WhatsPlayingIn films={films} />
        <UpcomingIn upcomingFilms={upcomingFilms} />
      </CurrentCountryContext.Provider>
    </Body>
  )
}

export default App
