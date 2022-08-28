import { Auth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, getDocs, setDoc } from 'firebase/firestore'

import { collectionReference, firestoreDB } from '../main'
import { CurrentUser } from '../types/interfaces_types'

interface SignUpProps {
  uid: string
  email: string | null
  firstName: string | null
  lastName?: string
}

const createUser = (auth: Auth, email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

const addUserDoc = async ({ uid, email, firstName, lastName }: SignUpProps) => {
  console.log(uid, email, firstName)
  if (lastName === undefined) lastName = ''
  await setDoc(doc(firestoreDB, 'users', uid), {
    email: email,
    first_name: firstName,
    last_name: lastName,
    watchList: [],
  })
  return
}

const retrieveUserDoc = async (currentUID: string) => {
  const docRef = doc(firestoreDB, 'users', currentUID)
  const userDoc = await getDoc(docRef)
  const currentUserDoc: CurrentUser = {
    ...userDoc.data(),
    id: userDoc.id,
  }
  return currentUserDoc
}

export const checkIfGoogleUserIsReturning = async (uid: string) => {
  const snapshot = await getDocs(collectionReference)
  let newGoogleUser: boolean = false
  snapshot.forEach((doc) => {
    doc.id === uid ? (newGoogleUser = false) : (newGoogleUser = true)
  })
  return newGoogleUser
}

export { retrieveUserDoc, addUserDoc, createUser }
