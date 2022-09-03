import {
  Auth,
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signOut,
  User,
  UserCredential
} from 'firebase/auth'
import { doc, getDoc, getDocs, setDoc } from 'firebase/firestore'

import { collectionReference, firestoreDB } from '../main'
import { CurrentUser } from '../types/interfaces_types'

interface SignUpProps {
  uid: string
  email: string | null
  firstName: string | null
  lastName?: string
}

const createUser = async (auth: Auth, email: string, password: string): Promise<UserCredential> => {
  const newUser: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
  return newUser
}

const addUserDoc = async ({ uid, email, firstName, lastName }: SignUpProps): Promise<void> => {
  try {
    if (lastName === undefined) lastName = ''
    await setDoc(doc(firestoreDB, 'users', uid), {
      // eslint-disable-next-line object-shorthand
      email: email,
      first_name: firstName,
      last_name: lastName,
      watchList: []
    })
    return
  } catch (error) {
    console.log(error)
  }
}

const retrieveUserDoc = async (currentUID: string): Promise<CurrentUser> => {
  try {
    const docRef = doc(firestoreDB, 'users', currentUID)
    const userDoc = await getDoc(docRef)
    const currentUserDoc: CurrentUser = {
      ...userDoc.data(),
      id: userDoc.id
    }
    return currentUserDoc
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const checkIfGoogleUserIsReturning = async (uid: string): Promise<boolean> => {
  try {
    const snapshot = await getDocs(collectionReference)
    let newGoogleUser: boolean = false

    snapshot.forEach((doc) => {
      doc.id === uid ? (newGoogleUser = false) : (newGoogleUser = true)
    })
    return newGoogleUser
  } catch (error) {
    console.log(error)
    return false
  }
}

export const signOutUser = async (auth: Auth): Promise<any> => {
  try {
    await signOut(auth)
    return
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteAccount = async (user: User): Promise<void> => {
  try {
    await deleteUser(user)
    return
  } catch (error) {
    console.log(error)
  }
}

export const resetPassword = async (auth: Auth, email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.log(error)
  }
}

export { retrieveUserDoc, addUserDoc, createUser }
