import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { youTubeEmbed } from '../constants/constants'
import { MainStore } from '../contexts/context'
import { removeWatchListInDB } from '../firebase/watchlistServices'
import { getTrailer } from '../services/films'
import { Trailer } from '../types/interfaces_types'
import CardModal from './Modal'
// import { TrashIcon } from './WatchlistCards'
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
}

const WatchListTableRows: React.FC<TableProps> = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [trailer, setTrailer] = useState<Trailer[]>([])
  const { userWatchList, currentUID, setUserWatchList } = useContext(MainStore)

  useEffect(() => {
    getTrailer(props.id, setTrailer)
  }, [])

  const youtubeTrailerUrls = trailer.map((trailer) => `${youTubeEmbed}${trailer.key}`)

  const handleRemoveWatchList = async () => {
    const userWatchListMinusFilm =
      userWatchList.length === 0 ? [] : userWatchList.filter((film) => film.id !== props.id)
    try {
      await removeWatchListInDB(userWatchListMinusFilm, currentUID)
      setUserWatchList(userWatchListMinusFilm)
    } catch (e) {
      console.log(e)
    }
  }

  const toggleModal = () => {
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
          <TrashIcon src={removeSvg} onClick={handleRemoveWatchList} />
        </Cell>
      </ListItem>
      <CardModal
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
        youtubeTrailers={youtubeTrailerUrls}
        props={props}
      />
    </>
  )
}

export default WatchListTableRows
