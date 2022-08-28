import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './pages/App'

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, getDocs } from 'firebase/firestore'
import { config } from './firebase/firebaseConfig'
import {} from './contexts/context'

//Init firesbase app
initializeApp(config.firebase)

//DB
export const firestoreDB = getFirestore()

//User collection so all you need to do is pass the doc/UID
export const collectionReference = collection(firestoreDB, 'users')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
