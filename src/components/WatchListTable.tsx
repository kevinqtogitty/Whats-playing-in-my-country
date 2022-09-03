import React, { useContext, useEffect, useState } from 'react'
import { removeWatchListInDB } from '../firebase/watchlistServices'
import styled from 'styled-components'

import { getAvailableOn, getCastAndCrew, getReviews, getTrailer } from '../services/films'
import { youTubeEmbed } from '../constants/constants'
import { MainStore } from '../contexts/context'
import CardModal from './Modal'

import { Trailer } from '../types/interfaces_types'
import removeSvg from '../assets/img/trash.svg'

const ListItem = styled.li`
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  display: flex;
  cursor: pointer;
`
const Cell = styled.span`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;

  &.title {
    width: 18rem;
  }

  &.releaseDate {
    width: 21.5rem;
    @media (max-width: 500px) {
      display: none;
    }
  }

  &.rating {
    width: 10.3rem;
    justify-content: flex-end;
  }

  &.remove {
    width: 8rem;
    justify-content: flex-end;
  }
`

const TrashIcon = styled.img`
  width: 2rem;
  margin-top: -12rem;
  cursor: pointer;
  height: fit-content;
  margin-top: 1px;
`

interface TableProps {
  original_title: string
  release_date: string
  rating: number
  id: number
  overview: string
  poster_path: string
  vote_average: number
}

const WatchListTableRows: React.FC<TableProps> = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [trailer, setTrailer] = useState<Trailer[]>([])
  const [availableOn, setAvailableOn] = useState<string[]>([])
  const [rentOn, setRentOn] = useState<string[]>([])
  const [reviews, setReviews] = useState<[]>([])
  const [cast, setCast] = useState<string[]>([])
  const [director, setDirector] = useState<[]>([])
  const { userWatchList, currentUID, setUserWatchList, currentCountryKey } = useContext(MainStore)

  useEffect(() => {
    getTrailer(props.id)
      .then(setTrailer)
      .catch(() => {})
  }, [])

  useEffect(() => {
    getAvailableOn(props.id, setAvailableOn, setRentOn, currentCountryKey)
      .then()
      .catch(() => {})
  }, [currentCountryKey])

  useEffect(() => {
    getReviews(props.id)
      .then(setReviews)
      .catch(() => {})
  }, [])

  useEffect(() => {
    getCastAndCrew(props.id, setCast, setDirector)
      .then()
      .catch(() => {})
  }, [])

  const youtubeTrailerUrls = trailer.map((trailer) => `${youTubeEmbed}${trailer.key}`)

  const handleRemoveWatchList = async (): Promise<void> => {
    const userWatchListMinusFilm =
      userWatchList.length === 0 ? [] : userWatchList.filter((film) => film.id !== props.id)
    try {
      await removeWatchListInDB(userWatchListMinusFilm, currentUID)
      setUserWatchList(userWatchListMinusFilm)
    } catch (e) {
      console.log(e)
    }
  }

  const toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen)
  }

  return (
    <>
      <ListItem className='table-row'>
        <Cell className='title' onClick={toggleModal}>
          {props.original_title}
        </Cell>
        <Cell className='releaseDate' onClick={toggleModal}>
          {props.release_date}
        </Cell>
        <Cell className='rating' onClick={toggleModal}>
          {props.rating}
        </Cell>
        <Cell className='remove'>
          {' '}
          <TrashIcon src={removeSvg} onClick={() => handleRemoveWatchList} />
        </Cell>
      </ListItem>
      <CardModal
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
        youtubeTrailers={youtubeTrailerUrls}
        props={props}
        availableOn={availableOn}
        rentOn={rentOn}
        reviews={reviews}
        cast={cast}
        director={director}
      />
    </>
  )
}

export default WatchListTableRows
