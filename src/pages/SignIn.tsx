import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { addUserDoc, checkIfGoogleUserIsReturning } from '../firebase/userServices'

import { MainStore } from '../contexts/context'

import { FormBody } from '../components/re-usables/body'
import { Input } from '../components/re-usables/input'
import { Button } from '../components/re-usables/buttons'

const FormWrapper = styled.div`
  margin-top: 6rem;
  width: auto;
  margin-right: -0.5rem;
`
const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const FlexWrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px 0 12px;
`
export const Notification = styled.div`
  border: 1px solid;
  border-radius: 5px;
  margin: 10px 0px;
  padding: 15px 10px 15px 50px;
  background-repeat: no-repeat;
  background-position: 10px center;
  color: #d8000c;
  background-color: #ffbaba;
  display: block;
`

const SignIn: React.FC = () => {
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
      setSignedInOrNot('true')
      navigate('/account')
    } catch (e) {
      console.log(e)
      setAuthing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      await signInOldSchool(email, password)
      setSignedInOrNot('true')
      navigate('/account')
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
          <form action='submit' id='signInForm' onSubmit={() => handleSubmit}>
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
            <Button onClick={() => signInWithGoogle} disabled={authing}>
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
