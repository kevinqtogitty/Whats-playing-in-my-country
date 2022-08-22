import React from 'react'

import { posterBaseUrl } from '../../constants/constants'
import { FilmsBanner } from '../filmSideScrollingBanner'
import { FilmPosters } from '../filmPosters'
import { Films } from '../../types/film'

interface Props {
  upcomingFilms: Films[]
}

const UpcomingIn: React.FC<Props> = ({ upcomingFilms }) => {
  return (
    <FilmsBanner>
      {upcomingFilms?.map((film) =>
        film.poster_path !== null ? (
          <FilmPosters src={`${posterBaseUrl}${film.poster_path}`} />
        ) : null,
      )}
    </FilmsBanner>
  )
}

export default UpcomingIn
