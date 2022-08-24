import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserCredentials } from '../contexts/context'
import NavBar from '../functional components/NavBar'
import { Button } from '../styled components/buttons'
import { Input } from '../styled components/input'
import AuthRoute from '../contexts/userAuth'
import { Body } from '../styled components/body'
import { FlexWrapper, FormWrapper } from '../styled components/formWrapper'

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
      <Body>
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
      </Body>
    </>
  )
}

export default SignIn
