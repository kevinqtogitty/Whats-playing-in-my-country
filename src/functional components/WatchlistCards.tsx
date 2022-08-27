import React from 'react'
import styled from 'styled-components'
import { posterBaseUrl } from '../constants/constants'

import removeSvg from '../assets/img/trash.svg'
import { Icon } from './CurrentFilmCards'

const Body = styled.body`
  margin: 0px;
`

const WatchlistCard = styled.div`
  display: flex;
  width: 35rem;
  height: 15rem;
  justify-content: space-between;
  padding-left: 5px;
  @media (max-width: 390px) {
    width: auto;
  }
`

const Info = styled.div``

const CardH3 = styled.h3`
  margin-top: -1px;
  margin-bottom: 10px;
`
const FilmPosters = styled.img`
  border-radius: 3px;

  &:hover {
    opacity: 50%;
  }
`
const Information = styled.div`
  font-size: 0.8em;
`

const Description = styled.div`
  font-size: 0.9em;
`
const TrashIcon = styled.img`
  width: 2rem;
  margin-top: 2rem;
`

interface CardProps {
  title: string
  release_date: string
  rating: number
  filmPosterPath: string
  overview: string
}

const WatchlistCards: React.FC<CardProps> = ({
  title,
  release_date,
  rating,
  filmPosterPath,
  overview,
}) => {
  return (
    // <Body>
    <>
      <WatchlistCard>
        <Info>
          <CardH3>{title} Luck</CardH3>
          <Information>{release_date}August 30th 2022</Information>
          <Information>{rating}7.8</Information>
          <Description>
            {overview} "Suddenly finding herself in the never-before-seen Land of Luck, the
            unluckiest person in the world must unite with the magical creatures there to turn her
            luck around."
          </Description>
          {/* <TrashIcon src={removeSvg} /> */}
        </Info>
        <FilmPosters src={'https://image.tmdb.org/t/p/w300/1HOYvwGFioUFL58UVvDRG6beEDm.jpg'} />
      </WatchlistCard>
    </>
    // </Body>
  )
}

export default WatchlistCards
