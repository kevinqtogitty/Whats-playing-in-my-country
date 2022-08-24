import { posterBaseUrl } from '../constants/constants'
import { FilmsBanner } from '../styled components/filmSideScrollingBanner'
import { FilmPosters } from '../styled components/filmPosters'
import { Films } from '../types/film'
import React, { useContext } from 'react'
import { BannerHeader } from '../styled components/filmHeaders'
import { CurrentCountryContext } from '../contexts/context'

interface Props {
  films: Films[]
}

const WhatsPlayingIn: React.FC<Props> = ({ films }) => {
  const { currentCountry } = useContext(CurrentCountryContext)
  return (
    <>
      <BannerHeader>What's playing in {currentCountry}</BannerHeader>
      <FilmsBanner>
        {films?.map((film) =>
          film.poster_path !== null ? (
            <FilmPosters src={`${posterBaseUrl}${film.poster_path}`} />
          ) : null,
        )}
      </FilmsBanner>
    </>
  )
}

export default WhatsPlayingIn
