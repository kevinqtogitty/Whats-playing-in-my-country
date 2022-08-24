import React, { useContext } from 'react'

import { posterBaseUrl } from '../constants/constants'
import { FilmsBanner } from '../styled components/filmSideScrollingBanner'
import { FilmPosters } from '../styled components/filmPosters'
import { Films } from '../types/film'
import { CurrentCountryContext } from '../contexts/context'
import { BannerHeader } from '../styled components/filmHeaders'

interface Props {
  upcomingFilms: Films[]
}

const UpcomingIn: React.FC<Props> = ({ upcomingFilms }) => {
  const { currentCountry } = useContext(CurrentCountryContext)
  return (
    <>
      <BannerHeader>Upcoming films in {currentCountry}</BannerHeader>
      <FilmsBanner>
        {upcomingFilms?.map((film) =>
          film.poster_path !== null ? (
            <FilmPosters src={`${posterBaseUrl}${film.poster_path}`} />
          ) : null,
        )}
      </FilmsBanner>
    </>
  )
}

export default UpcomingIn
