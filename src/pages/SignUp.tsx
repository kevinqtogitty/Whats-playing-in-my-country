import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../functional components/NavBar'
import { Button } from '../functional components/styled components/buttons'
import { Input } from '../functional components/styled components/input'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FormBody } from '../functional components/styled components/body'
import styled from 'styled-components'

const FormWrapper = styled.div`
  margin-top: 6rem;
`

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
      <FormBody>
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
      </FormBody>
    </>
  )
}

export default SignUp
