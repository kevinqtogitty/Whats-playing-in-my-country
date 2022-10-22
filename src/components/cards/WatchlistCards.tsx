/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from 'react'
import { MainStore } from '../../contexts/context'

import { removeWatchListInDB } from '../../firebase/watchlistServices'

import CardModal from './../Modal'
import { getAvailableOn, getCastAndCrew, getReviews, getTrailer } from '../../services/films'
import { CardProps, Trailer } from '../../types/interfaces_types'

import { posterBaseUrl, youTubeEmbed } from '../../constants/constants'
import removeSvg from '../../assets/img/trash.svg'
import { Button } from '../../stylesheets/styled_components/buttons'
import { FilmPosters } from '../../stylesheets/styled_components/currentFilmCardStyles'
import {
  WatchlistCard,
  PosterWrapper,
  CardH3,
  ButtonWrapper,
  TrashIcon
} from '../../stylesheets/styled_components/watchListCardsStyles'

const WatchlistCards: React.FC<CardProps> = (props): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [trailer, setTrailer] = useState<Trailer[]>([])
  const [availableOn, setAvailableOn] = useState<string[]>([])
  const [rentOn, setRentOn] = useState<string[]>([])
  const [reviews, setReviews] = useState<[]>([])
  const [cast, setCast] = useState<string[]>([])
  const [director, setDirector] = useState<[]>([])

  const { userWatchList, setUserWatchList, currentUID, currentCountryKey } = useContext(MainStore)

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

  const handleRemoveWatchList = async (): Promise<any> => {
    console.log('running')
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
      <WatchlistCard>
        <PosterWrapper>
          <CardH3>{props.original_title}</CardH3>
          <FilmPosters src={`${posterBaseUrl}${props.poster_path}`} />
          <ButtonWrapper>
            <Button onClick={toggleModal}>More info</Button>
            <TrashIcon src={removeSvg} onClick={handleRemoveWatchList} />
          </ButtonWrapper>
        </PosterWrapper>
      </WatchlistCard>
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

export default WatchlistCards
