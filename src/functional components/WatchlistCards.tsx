import React, { SetStateAction, useContext, useState } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { posterBaseUrl } from '../constants/constants'

import removeSvg from '../assets/img/trash.svg'
import { MainStore } from '../contexts/context'
import { removeWatchListInDB } from '../firebase/watchlistServices'
import { Button } from './individual styled components/buttons'

const Body = styled.body`
  margin: 0px;
  border: 2px solid green;
  width: 100rem;
  display: flex;
  flex-direction: row;
  height: 100rem;
`

const WatchlistCard = styled.div`
  display: flex;
  column-gap: 1rem;
  width: 20rem;
  height: 20rem;
  justify-content: space-between;
  padding-left: 5px;
  /* border: 2px solid blue; */
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

const Info = styled.div``

const CardH3 = styled.h4`
  margin-bottom: 10px;
  padding-left: 7px;
`
const FilmPosters = styled.img`
  border-radius: 3px;
  height: 15rem;
  margin: 0px;
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
  /* border: 2px solid black; */
  height: 3rem;
`

interface CardProps {
  title: string
  release_date: string
  rating: number
  poster_path: string
  overview: string
  id: number
  // modalIsOpen: boolean
  // setModalIsOpen: React.SetStateAction<SetStateAction<boolean>>
}

const WatchlistCards: React.FC<CardProps> = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const { userWatchList, setUserWatchList, currentUID, setShowAddedMessage, setShowTheMessage } =
    useContext(MainStore)

  const handleRemoveWatchList = async () => {
    const userWatchListMinusFilm =
      userWatchList.length === 0 ? [] : userWatchList.filter((film) => film.id !== props.id)
    try {
      await removeWatchListInDB(userWatchListMinusFilm, currentUID)
      setUserWatchList(userWatchListMinusFilm)
      handleNotification()
    } catch (e) {
      console.log(e)
    }
  }

  const handleNotification = () => {
    setShowAddedMessage(props.title)
    setShowTheMessage(true)
    setTimeout(() => {
      setShowTheMessage(false)
    }, 3000)
  }

  return (
    <>
      <WatchlistCard>
        <PosterWrapper>
          <CardH3>{props.title}</CardH3>
          <FilmPosters src={`${posterBaseUrl}${props.poster_path}`} />
        </PosterWrapper>
        {/* <Info>
          <Information>{release_date}</Information>
          <Information>{rating}</Information>
          <br />
        </Info> */}
        <ButtonWrapper>
          <Button onClick={() => setModalIsOpen(!modalIsOpen)}>More info</Button>
          <TrashIcon src={removeSvg} onClick={handleRemoveWatchList} />
        </ButtonWrapper>

        {/* <button onClick={() => setModalIsOpen(!modalIsOpen)}>More info</button> */}
      </WatchlistCard>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(!modalIsOpen)}
        // style={{
        //   overlay: {
        //     position: 'fixed',
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     backgroundColor: 'rgba(255, 255, 255, .8)',
        //   },
        //   content: {
        //     position: 'absolute',
        //     top: '40px',
        //     left: '40px',
        //     right: '40px',
        //     bottom: '40px',
        //     border: '1px solid #ccc',
        //     background: '#fff',
        //     overflow: 'auto',
        //     WebkitOverflowScrolling: 'touch',
        //     borderRadius: '4px',
        //     outline: 'none',
        //     padding: '20px',
        //   },
        // }}
      >
        <h2>{props.title}</h2>
        <FilmPosters src={`${posterBaseUrl}${props.poster_path}`} />
        <Information>{props.release_date}</Information>
        <Information>{props.rating}</Information>
        <p>{props.overview}</p>
        <Button onClick={() => setModalIsOpen(!modalIsOpen)}>Close</Button>

        {/* <button onClick={() => setModalIsOpen(!modalIsOpen)}>Close</button> */}
      </Modal>
    </>
  )
}

export default WatchlistCards
