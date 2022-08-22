//Tools
import React, { useState } from 'react'
import { posterBaseUrl } from './constants/constants'

//types
import { Films } from './types/film'

//Styled Components
import ChooseCountry from './styled components/styled components combined/ChooseCountryDropdown'
import WhatsPlayingIn from './styled components/styled components combined/WhatsPlayingIn'
import { FilmsBanner } from './styled components/filmSideScrollingBanner'
import { BannerHeader } from './styled components/filmHeaders'
import { FilmPosters } from './styled components/filmPosters'
import { Body } from './styled components/body'

//Constants
import { NavBar } from './styled components/navBar'
import UpcomingIn from './styled components/styled components combined/UpcomingIn'

const App: React.FC = () => {
  const [currentCountry, setCurrentCountry] = useState<String>('United Kingdom')
  const [upcomingFilms, setUpcomingFilms] = useState<Films[]>([])
  const [films, setFilms] = useState<Films[]>([])

  return (
    <Body>
      <NavBar>
        <ChooseCountry setFilms={setFilms} setUpcomingFilms={setUpcomingFilms} />
      </NavBar>
      Country
      <br />
      <BannerHeader>What's playing in {currentCountry}</BannerHeader>
      <WhatsPlayingIn films={films} />
      <BannerHeader>Upcoming films in {currentCountry}</BannerHeader>
      <UpcomingIn upcomingFilms={upcomingFilms} />
    </Body>
  )
}

export default App
