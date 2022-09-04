import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

import { posterBaseUrl } from '../constants/constants'
import { collectionReference } from '../main'
import { Films, WatchlistProps } from '../types/interfaces_types'

const addToWatchList = async (props: WatchlistProps): Promise<Films> => {
  const newWatchListFilm = {
    original_title: props.original_title,
    poster_path: `${posterBaseUrl}${props.poster_path}`,
    release_date: props.release_date,
    vote_average: props.vote_average,
    overview: props.overview,
    id: props.id
  }

  return newWatchListFilm
}

const addWatchListInDB = async (currentUID: string, newWatchListFilm: Films): Promise<void> => {
  const userRef = doc(collectionReference, currentUID)
  await updateDoc(userRef, {
    watchList: arrayUnion(newWatchListFilm)
  })
}

const removeWatchListInDB = async (
  userWatchListMinusFilm: Films[],
  currentUID: string
): Promise<void> => {
  const userRef = doc(collectionReference, currentUID)
  await updateDoc(userRef, {
    watchList: userWatchListMinusFilm
  })
}

export { addToWatchList, addWatchListInDB, removeWatchListInDB }
