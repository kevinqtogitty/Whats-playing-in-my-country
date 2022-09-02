import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { posterBaseUrl, youTubeEmbed } from '../constants/constants'

import removeSvg from '../assets/img/trash.svg'
import { MainStore } from '../contexts/context'
import { removeWatchListInDB } from '../firebase/watchlistServices'
import { Button } from './individual styled components/buttons'
import { getAvailableOn, getCastAndCrew, getReviews, getTrailer } from '../services/films'
import CardModal from './Modal'
import { Trailer } from '../types/interfaces_types'

const WatchlistCard = styled.div`
  display: flex;
  /* column-gap: 1rem; */
  width: 20rem;
  height: 20rem;
  justify-content: flex-start;
  padding-left: 5px;
  /* @media (max-width: 380px) {
    width: auto;
  } */
`

const ButtonWrapper = styled.div`
  /* border: 2px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 18rem;
  padding-top: 10px;
`

const PosterWrapper = styled.div`
  margin: 0px;
  display: flex;
  flex-direction: column;
`

const CardH3 = styled.h4`
  margin-bottom: 10px;
`
export const FilmPosters = styled.img`
  border-radius: 3px;
  height: 15rem;
  margin: 0px;
`
export const Information = styled.div`
  font-size: 0.8em;
`
const TrashIcon = styled.img`
  width: 2rem;
  margin-top: -12rem;
  cursor: pointer;
  height: 3rem;
`

interface CardProps {
  original_title: string
  release_date: string
  vote_average: number
  poster_path: string
  overview: string
  id: number
}

const WatchlistCards: React.FC<CardProps> = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [trailer, setTrailer] = useState<Trailer[]>([])
  const [availableOn, setAvailableOn] = useState<string[]>([])
  const [rentOn, setRentOn] = useState<string[]>([])
  const [reviews, setReviews] = useState<[]>([])
  const [cast, setCast] = useState<string[]>([])
  const [director, setDirector] = useState<[]>([])

  const { userWatchList, setUserWatchList, currentUID, currentCountryKey } = useContext(MainStore)

  useEffect(() => {
    getTrailer(props.id, setTrailer)
  }, [])

  useEffect(() => {
    getAvailableOn(props.id, setAvailableOn, setRentOn, currentCountryKey)
  }, [currentCountryKey])

  useEffect(() => {
    getReviews(props.id, setReviews)
  }, [])

  useEffect(() => {
    getCastAndCrew(props.id, setCast, setDirector)
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
      <WatchlistCard>
        <PosterWrapper>
          <CardH3>{props.original_title}</CardH3>
          <FilmPosters src={`${posterBaseUrl}${props.poster_path}`} />
        </PosterWrapper>
        <ButtonWrapper>
          <Button onClick={toggleModal}>More info</Button>
          <TrashIcon src={removeSvg} onClick={handleRemoveWatchList} />
        </ButtonWrapper>
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
