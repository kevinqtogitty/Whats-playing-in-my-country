import React, { useContext } from 'react'

import { MainStore } from '../contexts/context'
import styled from 'styled-components'
import UpcomingFilmCards from './cards/UpcomingFIlmsCards'

export const BannerHeader = styled.div`
  color: antiquewhite;
  padding-left: 1.2rem;
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
  ::-webkit-scrollbar {
    display: none;
  }
`
const FilmCardWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  margin-top: 6rem;
  @media (max-width: 500px) {
    margin-top: 8rem;
  }
`

const UpcomingIn: React.FC = () => {
  const { currentCountry, upcomingFilms, userWatchList, showTheMessage, showAddedMessage } =
    useContext(MainStore)
  const filteredFilms = upcomingFilms.filter(
    (film) => !userWatchList.some((userFilm) => film.id === userFilm.id)
  )
  return (
    <>
      <FilmsBanner>
        {showTheMessage ? (
          <BannerHeader>
            &apos;{showAddedMessage}&apos; has been added to your watchlist!
          </BannerHeader>
        ) : (
          <BannerHeader>
            {' '}
            <h2>Upcoming films in {currentCountry}</h2>{' '}
          </BannerHeader>
        )}
        <FilmCardWrapper>
          {filteredFilms?.map((film, index) =>
            film.poster_path !== null ? (
              <UpcomingFilmCards
                poster_path={film.poster_path}
                original_title={film.original_title}
                release_date={film.release_date}
                vote_average={film.vote_average}
                overview={film.overview}
                id={film.id}
                key={index}
              />
            ) : null
          )}
        </FilmCardWrapper>
      </FilmsBanner>
    </>
  )
}

export default UpcomingIn
