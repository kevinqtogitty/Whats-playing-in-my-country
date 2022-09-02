import {
  Auth,
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signOut,
  User,
} from 'firebase/auth'
import { doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import React, { SetStateAction } from 'react'

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
  try {
    console.log(uid, email, firstName)
    if (lastName === undefined) lastName = ''
    await setDoc(doc(firestoreDB, 'users', uid), {
      email: email,
      first_name: firstName,
      last_name: lastName,
      watchList: [],
    })
    return
  } catch (error) {
    console.log(error)
  }
}

const retrieveUserDoc = async (currentUID: string) => {
  try {
    const docRef = doc(firestoreDB, 'users', currentUID)
    const userDoc = await getDoc(docRef)
    const currentUserDoc: CurrentUser = {
      ...userDoc.data(),
      id: userDoc.id,
    }
    return currentUserDoc
  } catch (error) {
    console.log(error)
  }
}

export const checkIfGoogleUserIsReturning = async (uid: string) => {
  try {
    const snapshot = await getDocs(collectionReference)
    let newGoogleUser: boolean = false
    snapshot.forEach((doc) => {
      doc.id === uid ? (newGoogleUser = false) : (newGoogleUser = true)
    })
    return newGoogleUser
  } catch (error) {
    console.log(error)
  }
}

export const signOutUser = async (
  auth: Auth,
  setSignedInOrNot: React.Dispatch<React.SetStateAction<string>>,
  setCurrentUID: React.Dispatch<React.SetStateAction<string>>,
) => {
  try {
    await signOut(auth)
    setSignedInOrNot('false')
    setCurrentUID('')
  } catch (error) {
    console.log(error)
  }
}

export const deleteAccount = async (user: User) => {
  try {
    await deleteUser(user)
    return
  } catch (error) {
    console.log(error)
  }
}

export const resetPassword = async (auth: Auth, email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.log(error)
  }
}

export { retrieveUserDoc, addUserDoc, createUser }
