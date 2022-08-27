import ReactDOM from 'react-dom/client'
import React, { useContext } from 'react'
import App from './pages/App'

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore'
import { config } from './firebase'
import { CurrentCountryContext } from './contexts/context'

//Init firesbase app
initializeApp(config.firebase)

//DB
export const firestoreDB = getFirestore()

//Collection
export const collectionReference = collection(firestoreDB, 'users')

//get the collection data
// getDocs(collectionReference).then((snapshot) => {
//   let users = []

//   snapshot.docs.forEach((doc) => {
//     users.push({ ...doc.data(), id: doc.id })
//   })

//   console.log(users)
// })

// const docRef = doc(firestoreDB, 'users', currentUID)
// const userDoc = await getDoc(docRef)

// if (userDoc) {
//   console.log(userDoc)
// } else {
//   console.log('nothing found')
// }

// const addDoc = (collectionReference, {} ) => {

// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
