import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { MainStore } from '../contexts/context'
import { Input } from '../functional components/individual styled components/input'
import WatchlistCards from '../functional components/WatchlistCards'
import styled from 'styled-components'
import { Button } from '../functional components/individual styled components/buttons'
import WatchListTableRows from '../functional components/WatchListTable'

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
  width: 100%;
  padding: 0%;
  /* column-gap: 5rem; */
  justify-content: space-around;
  @media (max-width: 500px) {
    width: auto;
  }
`
const ToggleBar = styled.div`
  display: flex;
  justify-content: flex-end;
`

const TableContainer = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  /* display: flex;
  flex-direction: column; */
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

const Account = () => {
  const { userWatchList } = useContext(MainStore)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [toggleWatchListView, setToggleWatchListView] = useState<boolean>(false)

  const handleSearchRequest = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleViewToggle = () => {
    setToggleWatchListView(!toggleWatchListView)
  }

  return (
    <>
      <HeaderWrapper>
        <h2>Whats on your watchlist!</h2>
        <Input placeholder='Search...' type='text' onChange={(e) => handleSearchRequest(e)} />
      </HeaderWrapper>
      <ToggleBar>
        <Button onClick={handleViewToggle}>
          Switch to {toggleWatchListView == false ? <>list</> : <>card</>} view
        </Button>
      </ToggleBar>
      {toggleWatchListView === false ? (
        <FlexWrapper>
          {searchQuery === ''
            ? userWatchList.map((film) => (
                <WatchlistCards
                  original_title={film.original_title}
                  release_date={film.release_date}
                  vote_average={film.vote_average}
                  overview={film.overview}
                  poster_path={film.poster_path}
                  id={film.id}
                ></WatchlistCards>
              ))
            : userWatchList.map((film) =>
                film.original_title.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                  <WatchlistCards
                    original_title={film.original_title}
                    release_date={film.release_date}
                    vote_average={film.vote_average}
                    overview={film.overview}
                    poster_path={film.poster_path}
                    id={film.id}
                  ></WatchlistCards>
                ) : null,
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
                ? userWatchList.map((film) => (
                    <WatchListTableRows
                      original_title={film.original_title}
                      rating={film.vote_average}
                      release_date={film.release_date}
                      overview={film.overview}
                      poster_path={film.poster_path}
                      id={film.id}
                    />
                  ))
                : userWatchList.map((film) =>
                    film.original_title.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                      <WatchListTableRows
                        original_title={film.original_title}
                        rating={film.vote_average}
                        release_date={film.release_date}
                        overview={film.overview}
                        poster_path={film.poster_path}
                        id={film.id}
                      />
                    ) : null,
                  )}
            </UnorderedList>
          </TableContainer>
        </div>
      )}
    </>
  )
}

export default Account
