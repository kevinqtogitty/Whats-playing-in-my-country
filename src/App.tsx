//Tools
import React, { useState, useEffect } from 'react'
import { posterBaseUrl } from './constants/constants'

//types
import { Films } from './types/film'

//Services
import { currentlyPlaying } from './services/films'
import { upcomingMovies } from './services/films'

//Styled Components
import { Body } from './styled components/body'
import { FilmPosters } from './styled components/filmPosters'
import { FilmsBanner } from './styled components/filmSideScrollingBanner'
import { BannerHeader } from './styled components/filmHeaders'
import { CountryDropdown } from './styled components/countryDropdown'
import { CountryOption } from './styled components/buttons'

//Constants
import { countryOptions } from './constants/constants'
import { NavBar } from './styled components/navBar'
import ChooseCountry from './styled components/styled components combined/ChooseCountryDropdown'

const App: React.FC = () => {
  const [films, setFilms] = useState<Films[]>([])
  const [upcomingFilms, setUpcomingFilms] = useState<Films[]>([])
  const [countryKey, setCountryKey] = useState<String>('GB')
  const [currentCountry, setCurrentCountry] = useState<String>('United Kingdom')

  return (
    <Body>
      <NavBar>
        <ChooseCountry setFilms={setFilms} setUpcomingFilms={setUpcomingFilms} />
      </NavBar>
      Country
      <br />
      <BannerHeader>What's playing in {currentCountry}</BannerHeader>
      <FilmsBanner>
        {films?.map((film) =>
          film.poster_path !== null ? (
            <FilmPosters src={`${posterBaseUrl}${film.poster_path}`} />
          ) : null,
        )}
      </FilmsBanner>
      <BannerHeader>Upcoming films in {currentCountry}</BannerHeader>
      <FilmsBanner>
        {upcomingFilms?.map((film) =>
          film.poster_path !== null ? (
            <FilmPosters src={`${posterBaseUrl}${film.poster_path}`} />
          ) : null,
        )}
      </FilmsBanner>
    </Body>
  )
}

export default App
