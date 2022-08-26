import { Films } from '../types/film'
import React, { useContext } from 'react'
import { CurrentCountryContext } from '../contexts/context'
import styled from 'styled-components'
import CurrentFilmCards from './CurrentFilmCards'

export const BannerHeader = styled.h2`
  color: antiquewhite;
  font-family: sans-serif;
  background-color: #0d1321;
  padding-left: 1.2rem;
  font-size: 2rem;
  position: absolute;
  margin-top: -0.3rem;
`
export const FilmsBanner = styled.div`
  background-color: #0d1321;
  width: auto;
  overflow: scroll;
  padding: 1rem;
  margin-top: -1.7rem;
  margin: 0px;
`
const FilmCardWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  margin-top: 3rem;
`

const CurrrentlyPlaying: React.FC = () => {
  const { currentCountry, films } = useContext(CurrentCountryContext)
  return (
    <>
      <FilmsBanner>
        <BannerHeader>What's playing in {currentCountry}</BannerHeader>
        <FilmCardWrapper>
          {films?.map((film) =>
            film.poster_path !== null ? (
              <CurrentFilmCards
                filmPosterPath={film.poster_path}
                original_title={film.original_title}
                release_date={film.release_date}
                vote_average={film.vote_average}
              />
            ) : null,
          )}
        </FilmCardWrapper>
      </FilmsBanner>
    </>
  )
}

export default CurrrentlyPlaying
