import { posterBaseUrl } from '../../constants/constants'
import { FilmsBanner } from '../filmSideScrollingBanner'
import { FilmPosters } from '../filmPosters'
import { Films } from '../../types/film'
import React from 'react'

interface Props {
  films: Films[]
}

const WhatsPlayingIn: React.FC<Props> = ({ films }) => {
  return (
    <FilmsBanner>
      {films?.map((film) =>
        film.poster_path !== null ? (
          <FilmPosters src={`${posterBaseUrl}${film.poster_path}`} />
        ) : null,
      )}
    </FilmsBanner>
  )
}

export default WhatsPlayingIn
