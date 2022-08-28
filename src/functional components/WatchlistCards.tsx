import React, { useContext } from 'react'
import styled from 'styled-components'
import { posterBaseUrl } from '../constants/constants'

import removeSvg from '../assets/img/trash.svg'
import { Icon } from './CurrentFilmCards'
import { MainStore } from '../contexts/context'
import { removeWatchListInDB } from '../firebase/watchlistServices'

const Body = styled.body`
  margin: 0px;
`

const WatchlistCard = styled.div`
  display: flex;
  column-gap: 1rem;
  width: 35rem;
  height: 15rem;
  justify-content: space-between;
  padding-left: 5px;
  margin-top: 3rem;
  @media (max-width: 380px) {
    width: auto;
  }
`

const Info = styled.div``

const CardH3 = styled.h4`
  margin-top: -1px;
  margin-bottom: 10px;
`
const FilmPosters = styled.img`
  border-radius: 3px;
`
const Information = styled.div`
  font-size: 0.8em;
`

const Description = styled.div`
  font-size: 0.9em;
`
const TrashIcon = styled.img`
  width: 2rem;
  margin-top: -12rem;
  cursor: pointer;
`

interface CardProps {
  title: string
  release_date: string
  rating: number
  poster_path: string
  overview: string
  id: number
}

const WatchlistCards: React.FC<CardProps> = ({
  title,
  release_date,
  rating,
  poster_path,
  overview,
  id,
}) => {
  const { userWatchList, setUserWatchList, currentUID } = useContext(MainStore)
  const handleRemoveWatchList = async () => {
    const userWatchListMinusFilm =
      userWatchList.length === 0 ? [] : userWatchList.filter((film) => film.id !== id)
    try {
      await removeWatchListInDB(userWatchListMinusFilm, currentUID)
      setUserWatchList(userWatchListMinusFilm)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <WatchlistCard>
        <FilmPosters src={`${posterBaseUrl}${poster_path}`} />
        <Info>
          <CardH3>{title} Luck</CardH3>
          <Information>{release_date}August 30th 2022</Information>
          <Information>{rating}7.8</Information>
          <br />
          <Description>{overview}</Description>
        </Info>
        <TrashIcon src={removeSvg} onClick={handleRemoveWatchList} />
      </WatchlistCard>
    </>
  )
}

export default WatchlistCards
