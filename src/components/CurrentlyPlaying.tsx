import React, { useContext, useState } from 'react'
import { MainStore } from '../contexts/context'
import { Button } from '../stylesheets/styled_components/buttons'
import {
  BannerHeader,
  FilmCardWrapper,
  FilmsBanner
} from '../stylesheets/styled_components/currentlyPlaying'
import CurrentFilmCards from './cards/CurrentFilmCards'

const CurrrentlyPlaying: React.FC = (): JSX.Element => {
  const [ascOrder, setOrder] = useState<boolean>(false)
  const { currentCountry, films, userWatchList, showAddedMessage, showTheMessage, setFilms } =
    useContext(MainStore)

  const filteredFilms = films.filter(
    (film) => !userWatchList.some((userfilm) => film.id === userfilm.id)
  )

  const handleSort = (): void => {
    const filmsSorted = [...films]

    switch (ascOrder) {
      case false:
        filmsSorted.sort((a, b) => b.vote_average - a.vote_average)
        setFilms(filmsSorted)
        setOrder(true)
        break
      case true:
        filmsSorted.sort((a, b) => a.vote_average - b.vote_average)
        setFilms(filmsSorted)
        setOrder(false)
        break
      default:
        break
    }
  }

  return (
    <>
      <FilmsBanner>
        <BannerHeader>
          {showTheMessage ? (
            <h2>&apos;{showAddedMessage}&apos; has been added to your watchlist!</h2>
          ) : (
            <>
              <h2>What&apos;s playing in {currentCountry} </h2>
            </>
          )}
          <Button onClick={handleSort}>sort by rating</Button>
        </BannerHeader>
        <FilmCardWrapper>
          {filteredFilms?.map((film, index) =>
            film.poster_path !== null ? (
              <CurrentFilmCards
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

export default CurrrentlyPlaying
