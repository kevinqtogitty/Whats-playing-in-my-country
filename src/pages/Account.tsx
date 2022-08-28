import { useContext } from 'react'
import { MainStore } from '../contexts/context'
import WatchlistCards from '../functional components/WatchlistCards'

const Account = () => {
  const { userWatchList } = useContext(MainStore)

  return (
    <>
      <h2>Whats on your watchlist!</h2>
      {userWatchList.map((film) => (
        <WatchlistCards
          title={film.original_title}
          release_date={film.release_date}
          rating={film.vote_average}
          overview={film.overview}
          poster_path={film.poster_path}
          id={film.id}
        ></WatchlistCards>
      ))}
    </>
  )
}

export default Account
