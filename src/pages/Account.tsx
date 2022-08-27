import { doc, getDoc } from 'firebase/firestore'
import { useContext } from 'react'
import { CurrentCountryContext } from '../contexts/context'
import WatchlistCards from '../functional components/WatchlistCards'
import { firestoreDB } from '../main'

const Account = () => {
  // const { userWatchList, setUserWatchList, signedInOrNot, currentUID } =
  //   useContext(CurrentCountryContext)
  //if user is logged in
  //Then take the current UID and retrieve every film from the watchlist collection
  //Then populate the usersWatchlist
  //map out the cards to display the current users watchlist
  // if (userDoc) {
  //   console.log(userDoc)
  // } else {
  //   console.log('nothing found')
  // }
  return (
    <>
      <h2>Whats on your watchlist!</h2>
      <WatchlistCards></WatchlistCards>
    </>
  )
}

export default Account
