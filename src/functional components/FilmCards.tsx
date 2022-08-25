import styled from 'styled-components'
import { posterBaseUrl } from '../constants/constants'

interface Props {
  filmPosterPath: string
}

const FilmPosters = styled.img`
  border-radius: 1rem;
  &:hover {
    opacity: 50%;
  }
`

const CardText = styled.p`
  color: white;
`

const FilmCards: React.FC<Props> = ({ filmPosterPath }) => {
  return (
    <>
      <div>
        <FilmPosters src={`${posterBaseUrl}/${filmPosterPath}`} />
        <CardText>Films is</CardText>
        <CardText>Release Date</CardText>
        <CardText>Rating</CardText>
      </div>
    </>
  )
}

export default FilmCards
