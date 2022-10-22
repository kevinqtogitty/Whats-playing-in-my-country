import React, { useContext, useEffect, useState } from 'react'
import { removeWatchListInDB } from '../firebase/watchlistServices'

import { getAvailableOn, getCastAndCrew, getReviews, getTrailer } from '../services/films'
import { youTubeEmbed } from '../constants/constants'
import { MainStore } from '../contexts/context'
import CardModal from './Modal'

import removeSvg from '../assets/img/trash.svg'
import { TableProps, Trailer } from '../types/interfaces_types'
import { TrashIcon } from '../stylesheets/styled_components/watchListCardsStyles'
import { Cell, ListItem } from '../stylesheets/styled_components/watchListTableStyles'

const WatchListTableRows: React.FC<TableProps> = (props): JSX.Element => {
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
      <br />
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
