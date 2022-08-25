import { useState } from 'react'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../functional components/styled components/buttons'
import { FormBody } from '../functional components/styled components/body'
import { Input } from '../functional components/styled components/input'
import NavBar from '../functional components/NavBar'
import styled from 'styled-components'

export const FormWrapper = styled.div`
  margin-top: 6rem;
`
export const FlexWrapper = styled.div`
  display: flex;
`

const SignIn = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const signInWithGoogle = async () => {
    setAuthing(true)

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid)
        navigate('/account')
      })
      .catch((error) => {
        console.log(error)
        setAuthing(false)
      })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInOldSchool(email, password)
      navigate('/account')
    } catch (error) {
      console.log(error)
    }
  }

  const signInOldSchool = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  return (
    <>
      <NavBar></NavBar>
      <FormBody>
        <FormWrapper>
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
