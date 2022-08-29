import { ChangeEvent, useContext, useState } from 'react'
import { MainStore } from '../contexts/context'
import { Input } from '../functional components/individual styled components/input'
import WatchlistCards from '../functional components/WatchlistCards'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: flex;
  column-gap: 2rem;
  width: 100%;

  @media (max-width: 730px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50rem;
  column-gap: 5rem;
  @media (max-width: 500px) {
    width: auto;
  }
`

const Account = () => {
  const { userWatchList } = useContext(MainStore)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchRequest = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    console.log(searchQuery)
    console.log(userWatchList[0].original_title)
  }

  return (
    <>
      <HeaderWrapper>
        <h2>Whats on your watchlist!</h2>
        <Input placeholder='Search...' type='text' onChange={(e) => handleSearchRequest(e)} />
      </HeaderWrapper>

      <FlexWrapper>
        {searchQuery === ''
          ? userWatchList.map((film) => (
              <WatchlistCards
                title={film.original_title}
                release_date={film.release_date}
                rating={film.vote_average}
                overview={film.overview}
                poster_path={film.poster_path}
                id={film.id}
              ></WatchlistCards>
            ))
          : userWatchList.map((film) =>
              film.original_title.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                <WatchlistCards
                  title={film.original_title}
                  release_date={film.release_date}
                  rating={film.vote_average}
                  overview={film.overview}
                  poster_path={film.poster_path}
                  id={film.id}
                ></WatchlistCards>
              ) : null,
            )}
      </FlexWrapper>
    </>
  )
}

export default Account
