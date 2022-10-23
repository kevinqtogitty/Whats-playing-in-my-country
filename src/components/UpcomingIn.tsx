import React, { useContext } from 'react'
import { MainStore } from '../contexts/context'
import UpcomingFilmCards from './cards/UpcomingFIlmsCards'
import { FilmsBanner, FilmCardWrapper } from '../stylesheets/styled_components/currentlyPlaying'
import { BannerHeader } from '../stylesheets/styled_components/upcomingInStyles'

const UpcomingIn: React.FC = (): JSX.Element => {
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
            <h2>&apos;{showAddedMessage}&apos; has been added to your watchlist!</h2>
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
