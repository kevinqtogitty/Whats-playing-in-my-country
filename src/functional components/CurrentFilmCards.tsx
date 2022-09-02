import styled from 'styled-components'
import { posterBaseUrl, youTubeEmbed } from '../constants/constants'
import mySvg from '../assets/img/videoplus.svg'
import React, { useContext, useEffect, useState } from 'react'
import { MainStore } from '../contexts/context'
import { useNavigate } from 'react-router-dom'
import { addToWatchList, addWatchListInDB } from '../firebase/watchlistServices'
import { Films, Trailer, WatchlistProps } from '../types/interfaces_types'
import CardModal from './Modal'
import { getAvailableOn, getCastAndCrew, getReviews, getTrailer } from '../services/films'

//Styled Components
const FilmPosters = styled.img`
  border-radius: 5px;
  height: 20rem;
  width: auto;
  border: 2px solid grey;
  &:hover {
    opacity: 50%;
  }
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
`

const CardText = styled.p`
  color: white;
  margin: 0;
`

export const Icon = styled.img`
  filter: invert(100%);
  width: 1rem;
`
export const IconTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`

const CurrentFilmCards: React.FC<WatchlistProps> = (props) => {
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
    films,
  } = useContext(MainStore)
  const navigate = useNavigate()

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen)
  }

  useEffect(() => {
    getAvailableOn(props.id, setAvailableOn, setRentOn, currentCountryKey)
  }, [currentCountryKey])

  useEffect(() => {
    getReviews(props.id, setReviews)
  }, [films])

  useEffect(() => {
    getTrailer(props.id, setTrailer)
  }, [films])

  useEffect(() => {
    getCastAndCrew(props.id, setCast, setDirector)
  }, [films])

  const youtubeTrailerUrls = trailer.map((trailer) => `${youTubeEmbed}${trailer.key}`)

  const handleAddToWatchlist = async () => {
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

  const handleNotification = () => {
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
