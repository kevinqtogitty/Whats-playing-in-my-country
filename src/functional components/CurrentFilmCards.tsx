import styled from 'styled-components'
import { posterBaseUrl } from '../constants/constants'
import mySvg from '../assets/img/videoplus.svg'
import React, { useContext } from 'react'
import { MainStore } from '../contexts/context'
import { useNavigate } from 'react-router-dom'
import { addToWatchList, addWatchListInDB } from '../firebase/watchlistServices'
import { Films, WatchlistProps } from '../types/interfaces_types'

//Styled Components
const FilmPosters = styled.img`
  border-radius: 3px;
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
  const { userWatchList, setUserWatchList, signedInOrNot, currentUID } = useContext(MainStore)
  const navigate = useNavigate()

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
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <CardWrapper>
        <FilmPosters src={`${posterBaseUrl}${props.poster_path}`} />
        <CardText>{props.original_title}</CardText>
        <IconTextWrapper>
          <CardText>Rating: {props.vote_average}</CardText>
          <Icon src={mySvg} onClick={handleAddToWatchlist}></Icon>
        </IconTextWrapper>
      </CardWrapper>
    </>
  )
}

export default CurrentFilmCards
