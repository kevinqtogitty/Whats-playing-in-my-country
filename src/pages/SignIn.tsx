import React, { useContext, useState } from 'react'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { FormBody } from '../functional components/individual styled components/body'
import { Input } from '../functional components/individual styled components/input'
import styled from 'styled-components'
import { Button } from '../functional components/individual styled components/buttons'
import { MainStore } from '../contexts/context'
import { addUserDoc, checkIfGoogleUserIsReturning } from '../firebase/userServices'

const FormWrapper = styled.div`
  margin-top: 6rem;
  width: auto;
`
const FlexWrapper = styled.div`
  display: flex;
`
export const ErrorMessage = styled.div`
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

const SignIn = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState<boolean>(false)

  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')

  const { setSignedInOrNot } = useContext(MainStore)

  const signInWithGoogle = async () => {
    setAuthing(true)

    try {
      const googleUser = await signInWithPopup(auth, new GoogleAuthProvider())
      const {
        user: { displayName, email, uid },
      } = googleUser
      const newGoogleUser = await checkIfGoogleUserIsReturning(uid)
      if (newGoogleUser === true) {
        const firstName = displayName
        addUserDoc({ uid, email, firstName })
      }
      setSignedInOrNot('true')
      navigate('/account')
    } catch (e) {
      console.log(e)
      setAuthing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
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
      return
    }
  }

  const signInOldSchool = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  return (
    <>
      <FormBody>
        <FormWrapper>
          {error === false ? null : <ErrorMessage>Error: Invalid email or password</ErrorMessage>}
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
            <Button onClick={() => signInWithGoogle()} disabled={authing}>
              Sign In With Google
            </Button>
          </FlexWrapper>
          <p>
            Don't have an account? <Link to='/signUp'>Sign Up</Link>
          </p>
          <p>Forgot password?</p>
        </FormWrapper>
      </FormBody>
    </>
  )
}

export default SignIn
