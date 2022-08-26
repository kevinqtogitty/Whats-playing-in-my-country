import styled from 'styled-components'
import { posterBaseUrl } from '../constants/constants'

//Styled Components
const FilmPosters = styled.img`
  border-radius: 3px;
  height: 20rem;
  width: auto;
  &:hover {
    opacity: 50%;
  }
`
const CardText = styled.p`
  color: white;
`
//Props/function
interface Props {
  filmPosterPath: string
  original_title: string
  release_date: string
}

const UpcomingFilmCards: React.FC<Props> = ({ filmPosterPath, original_title, release_date }) => {
  return (
    <>
      <div>
        <FilmPosters src={`${posterBaseUrl}/${filmPosterPath}`} />
        <CardText>{original_title}</CardText>
        <CardText>Release Date: {release_date}</CardText>
      </div>
    </>
  )
}

export default UpcomingFilmCards
