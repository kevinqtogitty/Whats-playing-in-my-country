/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { addToWatchList, addWatchListInDB } from '../../firebase/watchlistServices'

import CardModal from '../Modal'
import { MainStore } from '../../contexts/context'
import { getAvailableOn, getCastAndCrew, getReviews, getTrailer } from '../../services/films'
import { posterBaseUrl, youTubeEmbed } from '../../constants/constants'
import { Films, Trailer, WatchlistProps } from '../../types/interfaces_types'

import mySvg from '../../assets/img/videoplus.svg'
import {
  CardWrapper,
  CardText,
  IconTextWrapper,
  Icon,
  FilmPosters
} from '../../stylesheets/styled_components/currentFilmCardStyles'

const CurrentFilmCards: React.FC<WatchlistProps> = (props): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [trailer, setTrailer] = useState<Trailer[]>([])
  const [availableOn, setAvailableOn] = useState<string[]>([])
  const [rentOn, setRentOn] = useState<string[]>([])
  const [reviews, setReviews] = useState<[]>([])
  const [cast, setCast] = useState<any[]>([])
  const [director, setDirector] = useState<[]>([])

  const {
    userWatchList,
    setUserWatchList,
    signedInOrNot,
    currentUID,
    setShowAddedMessage,
    setShowTheMessage,
    currentCountryKey,
    films
  } = useContext(MainStore)
  const navigate = useNavigate()

  const toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen)
  }

  useEffect(() => {
    getAvailableOn(props.id, setAvailableOn, setRentOn, currentCountryKey)
      .then()
      .catch(() => {})
  }, [currentCountryKey])

  useEffect(() => {
    getReviews(props.id)
      .then(setReviews)
      .catch(() => {})
  }, [films])

  useEffect(() => {
    getTrailer(props.id)
      .then(setTrailer)
      .catch(() => {})
  }, [films])

  useEffect(() => {
    getCastAndCrew(props.id, setCast, setDirector)
      .then()
      .catch(() => {})
  }, [films])

  const youtubeTrailerUrls = trailer.map((trailer) => `${youTubeEmbed}${trailer.key}`)

  const handleAddToWatchlist = async (): Promise<void> => {
    if (!signedInOrNot) {
      navigate('/signIn')
      return
    }
    try {
      const newWatchListFilm = await addToWatchList(props)
      await addWatchListInDB(currentUID, newWatchListFilm)

      let updatedUserWatchList: Films[] = []
      userWatchList.length === 0
        ? (updatedUserWatchList = updatedUserWatchList.concat(newWatchListFilm))
        : (updatedUserWatchList = [...userWatchList, newWatchListFilm])
      setUserWatchList(updatedUserWatchList)

      handleNotification()
    } catch (e) {
      console.log(e)
    }
  }

  const handleNotification = (): void => {
    setShowAddedMessage(props.original_title)
    setShowTheMessage(true)
    setTimeout(() => {
      setShowTheMessage(false)
    }, 3000)
  }

  return (
    <>
      <CardWrapper>
        <FilmPosters src={`${posterBaseUrl}${props.poster_path}`} onClick={toggleModal} />
        <CardText>{props.original_title}</CardText>
        <IconTextWrapper>
          <CardText>Rating: {props.vote_average}</CardText>

          <Icon src={mySvg} onClick={handleAddToWatchlist} />
        </IconTextWrapper>
      </CardWrapper>
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
      ></CardModal>
    </>
  )
}

export default CurrentFilmCards
