import styled from 'styled-components'
import { posterBaseUrl } from '../constants/constants'
import watchListIcon from '../assets/img/videoplus.svg'
import { IconTextWrapper } from './CurrentFilmCards'
import { Icon } from './CurrentFilmCards'
import { addToWatchList, addWatchListInDB } from '../firebase/watchlistServices'
import { useContext } from 'react'
import { MainStore } from '../contexts/context'
import { useNavigate } from 'react-router-dom'
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
const CardText = styled.p`
  color: white;
  margin: 0;
`

const UpcomingFilmCards: React.FC<WatchlistProps> = (props) => {
  const { signedInOrNot, userWatchList, setUserWatchList, currentUID } = useContext(MainStore)
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
      <div>
        <FilmPosters src={`${posterBaseUrl}${props.poster_path}`} />
        <CardText>{props.original_title}</CardText>
        <IconTextWrapper>
          <CardText>Coming {props.release_date}</CardText>
          <Icon src={watchListIcon} onClick={handleAddToWatchlist} />
        </IconTextWrapper>
      </div>
    </>
  )
}

export default UpcomingFilmCards
