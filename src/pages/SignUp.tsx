import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserCredentials } from '../contexts/context'
import NavBar from '../functional components/NavBar'
import { Button } from '../styled components/buttons'
import { Input } from '../styled components/input'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Body } from '../styled components/body'
import { FormWrapper } from '../styled components/formWrapper'

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const auth = getAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createUser(email, password)
      navigate('/signIn')
    } catch (error) {
      console.log(error)
    }
  }

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <NavBar />
      <Body>
        <FormWrapper>
          <form action='submit' onSubmit={handleSubmit}>
            <Input
              name='email'
              value={email}
              type='text'
              placeholder='Email'
              onChange={handleEmail}
            />
            <Input
              name='password'
              value={password}
              type='password'
              placeholder='Password'
              onChange={handlePassword}
            />
            <Button type='submit'>Sign Up</Button> <br />
          </form>
          <p>
            Already have an account? <Link to='/signIn'>Sign In</Link>
          </p>
          <p>Forgot password?</p>
        </FormWrapper>
      </Body>
    </>
  )
}

export default SignUp
