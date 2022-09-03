import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { MainStore } from '../../contexts/context'
import { Films, Trailer, WatchlistProps } from '../../types/interfaces_types'
import { getAvailableOn, getCastAndCrew, getReviews, getTrailer } from '../../services/films'
import { addToWatchList, addWatchListInDB } from '../../firebase/watchlistServices'

import CardModal from '../Modal'
import { posterBaseUrl, youTubeEmbed } from '../../constants/constants'
import { IconTextWrapper, Icon } from '../cards/CurrentFilmCards'
import watchListIcon from '../../assets/img/videoplus.svg'

// Styled Components
const FilmPosters = styled.img`
  border-radius: 3px;
  height: 20rem;
  width: auto;
  border: 2px solid grey;
  &:hover {
    opacity: 50%;
  }
`

const CardText = styled.p`
  color: white;
  margin: 0;
`

const UpcomingFilmCards: React.FC<WatchlistProps> = (props) => {
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
  }, [currentCountryKey])

  useEffect(() => {
    getReviews(props.id, setReviews)
  }, [upcomingFilms])

  useEffect(() => {
    getTrailer(props.id, setTrailer)
  }, [upcomingFilms])

  useEffect(() => {
    getCastAndCrew(props.id, setCast, setDirector)
  }, [upcomingFilms])

  const youtubeTrailerUrls = trailer.map((trailer) => `${youTubeEmbed}${trailer.key}`)

  // Deal with user adding films to watchlist
  const handleAddToWatchlist = async (): Promise<void> => {
    if (signedInOrNot === 'false') {
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
      <div>
        <FilmPosters src={`${posterBaseUrl}${props.poster_path}`} onClick={toggleModal} />
        <CardText>{props.original_title}</CardText>
        <IconTextWrapper>
          <CardText>Coming {props.release_date}</CardText>
          <Icon src={watchListIcon} onClick={handleAddToWatchlist} />
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
        ></CardModal>
      </div>
    </>
  )
}

export default UpcomingFilmCards
