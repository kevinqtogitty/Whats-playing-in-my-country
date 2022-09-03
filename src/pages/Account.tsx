import React, { useEffect, ChangeEvent, useContext, useState } from 'react'
import styled from 'styled-components'
import { MainStore } from '../contexts/context'
import { Films } from '../types/interfaces_types'

import WatchlistCards from '../components/cards/WatchlistCards'
import { Input } from '../components/re-usables/input'
import { Button } from '../components/re-usables/buttons'
import WatchListTableRows from '../components/WatchListTable'

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0%;
  justify-content: space-around;
  @media (max-width: 500px) {
    width: auto;
  }
`

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0%;
  justify-content: space-between;
  @media (max-width: 700px) {
    justify-content: center;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 700px) {
    width: 100%;
    justify-content: space-around;
  }
`
const TableContainer = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`
const UnorderedList = styled.ul`
  border-radius: 3px;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  flex-direction: column;
`
const ColumnHeader = styled.li`
  background-color: #95a5a6;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  list-style-type: none;
  display: flex;
  justify-content: space-around;
`
const Header = styled.div`
  &.releaseDate {
    @media (max-width: 500px) {
      display: none;
    }
  }
`

const Account: React.FC = () => {
  const [ascOrder, setOrder] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [toggleWatchListView, setToggleWatchListView] = useState<boolean>(false)
  const [cardsToDisplay, setCardsToDisplay] = useState<Films[]>([])

  const { userWatchList } = useContext(MainStore)

  const handleSearchRequest = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value)
  }

  const handleViewToggle = (): void => {
    setToggleWatchListView(!toggleWatchListView)
  }

  useEffect(() => {
    setCardsToDisplay([...userWatchList])
  }, [userWatchList])

  const handleSort = (): void => {
    const filmsSorted = [...cardsToDisplay]

    switch (ascOrder) {
      case false:
        console.log(ascOrder, '1st')
        filmsSorted.sort((a, b) => b.vote_average - a.vote_average)
        console.log(filmsSorted)
        setOrder(true)
        setCardsToDisplay(filmsSorted)
        break
      case true:
        console.log(ascOrder, 'running')
        filmsSorted.sort((a, b) => a.vote_average - b.vote_average)
        setOrder(false)
        setCardsToDisplay(filmsSorted)
        break
      default:
        break
    }
  }

  return (
    <>
      <HeaderWrapper>
        <h2 style={{ marginLeft: '1rem' }}>Whats on your watchlist!</h2>
      </HeaderWrapper>
      <Toolbar>
        <Input placeholder='Search...' type='text' onChange={(e) => handleSearchRequest(e)} />{' '}
        <ButtonWrapper>
          <Button onClick={handleViewToggle}>
            Switch to {!toggleWatchListView ? <>list</> : <>card</>} view
          </Button>
          <Button onClick={handleSort}>Sort by rating {!ascOrder ? <>↑</> : <>↓</>}</Button>
        </ButtonWrapper>
      </Toolbar>

      {!toggleWatchListView ? (
        <FlexWrapper>
          {searchQuery === ''
            ? cardsToDisplay.map((film, index) => (
                <WatchlistCards
                  key={index}
                  original_title={film.original_title}
                  release_date={film.release_date}
                  vote_average={film.vote_average}
                  overview={film.overview}
                  poster_path={film.poster_path}
                  id={film.id}
                ></WatchlistCards>
              ))
            : cardsToDisplay.map((film) =>
                film.original_title.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                  <WatchlistCards
                    original_title={film.original_title}
                    release_date={film.release_date}
                    vote_average={film.vote_average}
                    overview={film.overview}
                    poster_path={film.poster_path}
                    id={film.id}
                  ></WatchlistCards>
                ) : null
              )}
        </FlexWrapper>
      ) : (
        <div>
          <TableContainer>
            <UnorderedList>
              <ColumnHeader className='table-header'>
                <Header className='title'>Title</Header>
                <Header className='releaseDate'>Release Date</Header>
                <Header className='rating'>Rating</Header>
              </ColumnHeader>
              {searchQuery === ''
                ? cardsToDisplay.map((film, index) => (
                    <WatchListTableRows
                      key={index}
                      original_title={film.original_title}
                      rating={film.vote_average}
                      release_date={film.release_date}
                      overview={film.overview}
                      poster_path={film.poster_path}
                      id={film.id}
                      vote_average={film.vote_average}
                    />
                  ))
                : cardsToDisplay.map((film, index) =>
                    film.original_title.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                      <WatchListTableRows
                        key={index}
                        original_title={film.original_title}
                        rating={film.vote_average}
                        release_date={film.release_date}
                        overview={film.overview}
                        poster_path={film.poster_path}
                        id={film.id}
                        vote_average={film.vote_average}
                      />
                    ) : null
                  )}
            </UnorderedList>
          </TableContainer>
        </div>
      )}
    </>
  )
}

export default Account
