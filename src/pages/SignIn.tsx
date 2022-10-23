/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MainStore } from '../contexts/context'
import { addUserDoc, checkIfGoogleUserIsReturning } from '../firebase/userServices'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword
} from 'firebase/auth'

import { FormBody } from '../stylesheets/styled_components/body'
import { Button } from '../stylesheets/styled_components/buttons'
import { Input } from '../stylesheets/styled_components/input'
import {
  FlexWrapperColumn,
  FormWrapper,
  Notification
} from '../stylesheets/styled_components/styles_for_pages/signInPageStyles'
import { FlexWrapper } from '../stylesheets/styled_components/styles_for_pages/accountPageStyles'

const SignIn: React.FC = (): JSX.Element => {
  const [authing, setAuthing] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')

  const { setSignedInOrNot } = useContext(MainStore)

  const auth = getAuth()
  const navigate = useNavigate()

  const signInWithGoogle = async (): Promise<void> => {
    setAuthing(true)

    try {
      const googleUser = await signInWithPopup(auth, new GoogleAuthProvider())
      const {
        user: { displayName, email, uid }
      } = googleUser
      const newGoogleUser = await checkIfGoogleUserIsReturning(uid)
      if (!newGoogleUser) {
        const firstName = displayName
        addUserDoc({ uid, email, firstName })
          .then(() => {})
          .catch(() => {})
      }
      setSignedInOrNot(true)
      navigate('/')
    } catch (e) {
      console.log(e)
      setAuthing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      await signInOldSchool(email, password)
      setSignedInOrNot(true)
      navigate('/')
    } catch (e) {
      setError(!error)
      setTimeout(() => {
        setError(false)
      }, 5000)
      console.log(e)
    }
  }

  const signInOldSchool = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  return (
    <>
      <FormBody>
        <FormWrapper>
          {!error ? null : <Notification>Error: Invalid email or password</Notification>}
          <form action='submit' id='signInForm' onSubmit={handleSubmit}>
            <Input
              value={email}
              type='text'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              value={password}
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <FlexWrapper>
            <Button type='submit' form='signInForm'>
              Sign In
            </Button>{' '}
            <br />
            <Button onClick={signInWithGoogle} disabled={authing}>
              Sign In With Google
            </Button>
          </FlexWrapper>
          <FlexWrapperColumn>
            <p>
              Don&apos;t have an account? <Link to='/signUp'>Sign Up</Link>
            </p>
            <p>Forgot password?</p>
          </FlexWrapperColumn>
        </FormWrapper>
      </FormBody>
    </>
  )
}

export default SignIn
