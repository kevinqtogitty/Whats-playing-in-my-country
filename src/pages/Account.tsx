import React, { useEffect, ChangeEvent, useContext, useState } from 'react'
import { MainStore } from '../contexts/context'
import { Films } from '../types/interfaces_types'

import WatchlistCards from '../components/cards/WatchlistCards'
import { Button } from '../stylesheets/styled_components/buttons'
import { Input } from '../stylesheets/styled_components/input'
import { FlexWrapper } from '../stylesheets/styled_components/modalStyles'
import { ButtonWrapper } from '../stylesheets/styled_components/watchListCardsStyles'
import WatchListTableRows from '../components/WatchListTable'
import {
  HeaderWrapper,
  Toolbar,
  TableContainer,
  UnorderedList,
  ColumnHeader,
  Header
} from '../stylesheets/styled_components/styles_for_pages/accountPageStyles'

const Account: React.FC = (): JSX.Element => {
  const [ascOrder, setOrder] = useState<boolean>(false)
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
