import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MainStore } from '../../contexts/context'
import { Films, Trailer, WatchlistProps } from '../../types/interfaces_types'
import { getAvailableOn, getCastAndCrew, getReviews, getTrailer } from '../../services/films'
import { addToWatchList, addWatchListInDB } from '../../firebase/watchlistServices'

import CardModal from '../Modal'
import { posterBaseUrl, youTubeEmbed } from '../../constants/constants'
import watchListIcon from '../../assets/img/videoplus.svg'
import {
  CardText,
  IconTextWrapper,
  Icon,
  FilmPosters
} from '../../stylesheets/styled_components/currentFilmCardStyles'

const UpcomingFilmCards: React.FC<WatchlistProps> = (props): JSX.Element => {
  const [trailer, setTrailer] = useState<Trailer[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [availableOn, setAvailableOn] = useState<string[]>([])
  const [rentOn, setRentOn] = useState<string[]>([])
  const [reviews, setReviews] = useState<[]>([])
  const [cast, setCast] = useState<any[]>([])
  const [director, setDirector] = useState<[]>([])
  const {
    signedInOrNot,
    userWatchList,
    setUserWatchList,
    currentUID,
    setShowAddedMessage,
    setShowTheMessage,
    currentCountryKey,
    upcomingFilms
  } = useContext(MainStore)
  const navigate = useNavigate()

  const toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen)
  }

  // Get Trailers, streaming, and reviews
  useEffect(() => {
    getAvailableOn(props.id, setAvailableOn, setRentOn, currentCountryKey)
      .then()
      .catch(() => {})
  }, [currentCountryKey])

  useEffect(() => {
    getReviews(props.id)
      .then(setReviews)
      .catch(() => {})
  }, [upcomingFilms])

  useEffect(() => {
    getTrailer(props.id)
      .then(setTrailer)
      .catch(() => {})
  }, [upcomingFilms])

  useEffect(() => {
    getCastAndCrew(props.id, setCast, setDirector)
      .then()
      .catch(() => {})
  }, [upcomingFilms])

  const youtubeTrailerUrls = trailer.map((trailer) => `${youTubeEmbed}${trailer.key}`)

  // Deal with user adding films to watchlist
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

  // Display added notification
  const handleNotification = (): void => {
    setShowAddedMessage(props.original_title)
    setShowTheMessage(true)
    setTimeout(() => {
      setShowTheMessage(false)
    }, 3000)
  }

  return (
    <>
      <FilmPosters src={`${posterBaseUrl}${props.poster_path}`} onClick={toggleModal} />
      <CardText>{props.original_title}</CardText>
      <IconTextWrapper>
        <CardText>Coming {props.release_date}</CardText>
        <Icon src={watchListIcon} onClick={() => handleAddToWatchlist} />
      </IconTextWrapper>
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

export default UpcomingFilmCards
