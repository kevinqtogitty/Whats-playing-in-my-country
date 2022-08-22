import { posterBaseUrl } from '../../constants/constants'
import { FilmsBanner } from '../filmSideScrollingBanner'
import { FilmPosters } from '../filmPosters'
import { Films } from '../../types/film'
import React, { useContext } from 'react'
import { BannerHeader } from '../filmHeaders'
import { CurrentCountryContext } from '../../context'

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
