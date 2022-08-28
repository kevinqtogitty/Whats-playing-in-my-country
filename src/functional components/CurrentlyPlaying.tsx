import React, { useContext } from 'react'
import { MainStore } from '../contexts/context'
import styled from 'styled-components'
import CurrentFilmCards from './CurrentFilmCards'

export const BannerHeader = styled.h2`
  color: antiquewhite;
  padding-left: 1.2rem;
  font-size: 2rem;
  position: absolute;
  width: fit-content;
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
  margin-top: 6rem;
  @media (max-width: 500px) {
    margin-top: 8rem;
  }
`

const CurrrentlyPlaying: React.FC = () => {
  const { currentCountry, films } = useContext(MainStore)
  return (
    <>
      <FilmsBanner>
        <BannerHeader>What's playing in {currentCountry}</BannerHeader>
        <FilmCardWrapper>
          {films?.map((film) =>
            film.poster_path !== null ? (
              <CurrentFilmCards
                poster_path={film.poster_path}
                original_title={film.original_title}
                release_date={film.release_date}
                vote_average={film.vote_average}
                overview={film.overview}
                id={film.id}
              />
            ) : null,
          )}
        </FilmCardWrapper>
      </FilmsBanner>
    </>
  )
}

export default CurrrentlyPlaying
