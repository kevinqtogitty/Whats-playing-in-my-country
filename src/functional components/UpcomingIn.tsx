import React, { useContext } from 'react'

import { Films } from '../types/film'
import { CurrentCountryContext } from '../contexts/context'
import FilmCards from './FilmCards'
import styled from 'styled-components'

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

interface Props {
  upcomingFilms: Films[]
}

const UpcomingIn: React.FC<Props> = ({ upcomingFilms }) => {
  const { currentCountry } = useContext(CurrentCountryContext)
  return (
    <>
      <FilmsBanner>
        <BannerHeader>Upcoming films in {currentCountry}</BannerHeader>
        <FilmCardWrapper>
          {upcomingFilms?.map((film) =>
            film.poster_path !== null ? <FilmCards filmPosterPath={film.poster_path} /> : null,
          )}
        </FilmCardWrapper>
      </FilmsBanner>
    </>
  )
}

export default UpcomingIn
