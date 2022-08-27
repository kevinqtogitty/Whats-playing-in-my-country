import { doc, updateDoc } from 'firebase/firestore'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { posterBaseUrl } from '../constants/constants'
import { CurrentCountryContext } from '../contexts/context'
import { firestoreDB } from '../main'
import { Films } from '../types/film'

export interface WatchlistProps {
  posterBaseUrl?: string
  poster_path: string
  original_title: string
  release_date: string
  vote_average: number
  overview: string
}

const addToWatchList = async (props: WatchlistProps) => {
  const newWatchListFilm = {
    original_title: props.original_title,
    poster_path: `${posterBaseUrl}/${props.poster_path}`,
    release_date: props.release_date,
    vote_average: props.vote_average,
    overview: props.overview,
  }

  return newWatchListFilm
}

export const updateWatchListInDB = () => {
  console.log('working')

  //   const userRef = doc(firestoreDB, 'users', currentUID)
  //   await updateDoc(userRef, {
  //     first_name: 'jan',
  //   })
}

export default addToWatchList
