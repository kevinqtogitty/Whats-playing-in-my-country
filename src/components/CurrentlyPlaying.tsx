import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { MainStore } from '../contexts/context'
import CurrentFilmCards from './cards/CurrentFilmCards'

export const BannerHeader = styled.div`
  top: 65px;
  color: antiquewhite;
  padding-left: 1.2rem 0px 1.2rem 0px;
  align-self: flex-start;
  position: absolute;
  width: 97%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
const Button = styled.button`
  margin: 2em;
  padding: 1em;
  border: 1px solid #e4e6e8;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s ease-in;
  &:hover {
    background-color: forestgreen;
    border: 1px solid forestgreen;

    color: white;
  }
`

const CurrrentlyPlaying: React.FC = () => {
  const [ascOrder, setOrder] = useState(false)
  const { currentCountry, films, userWatchList, showAddedMessage, showTheMessage, setFilms } =
    useContext(MainStore)

  const filteredFilms = films.filter(
    (film) => !userWatchList.some((userfilm) => film.id === userfilm.id)
  )

  const handleSort = (): void => {
    const filmsSorted = [...films]

    switch (ascOrder) {
      case false:
        console.log(ascOrder, 'running')

        filmsSorted.sort((a, b) => b.vote_average - a.vote_average)
        setFilms(filmsSorted)
        setOrder(true)
        break
      case true:
        console.log(ascOrder, 'running')
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
        {showTheMessage === true ? (
          <BannerHeader>
            {' '}
            <h2>'{showAddedMessage}' has been added to your watchlist!</h2>{' '}
          </BannerHeader>
        ) : (
          <BannerHeader>
            <h2>What's playing in {currentCountry} </h2>
            <Button onClick={handleSort}>sort by rating</Button>
          </BannerHeader>
        )}
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
