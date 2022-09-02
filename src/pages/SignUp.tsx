import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../functional components/individual styled components/input'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FormBody } from '../functional components/individual styled components/body'
import styled from 'styled-components'
import { Button } from '../functional components/individual styled components/buttons'
import { Notification } from './SignIn'
import { addUserDoc, createUser } from '../firebase/userServices'

const FormWrapper = styled.div`
  margin-top: 6rem;
`

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const navigate = useNavigate()

  const auth = getAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (confirmPassword !== password) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000)
      return
    }

    try {
      const newUser = await createUser(auth, email, password)
      const {
        user: { uid },
      } = newUser
      await addUserDoc({ uid, email, firstName, lastName })
      navigate('/signIn')
    } catch (error) {
      console.log(error)
    }
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    switch (key) {
      case 'FN':
        setFirstName(e.target.value)
        break
      case 'LN':
        setLastName(e.target.value)
        break
      case 'EM':
        setEmail(e.target.value)
        break
      case 'PW':
        setPassword(e.target.value)
        break
      case 'CPW':
        setConfirmPassword(e.target.value)
        break
      default:
        return
    }
  }

  return (
    <>
      <FormBody>
        <FormWrapper>
          {error === false ? null : <Notification>Error: Passwords do not match</Notification>}
          <form action='submit' id='signUpForm' onSubmit={handleSubmit}>
            <Input
              name='firstName'
              value={firstName}
              type='text'
              placeholder='First Name'
              onChange={(e) => inputHandler(e, 'FN')}
            />
            <Input
              name='lastName'
              value={lastName}
              type='text'
              placeholder='Last Name'
              onChange={(e) => inputHandler(e, 'LN')}
            />
            <Input
              name='email'
              value={email}
              type='text'
              placeholder='Email'
              onChange={(e) => inputHandler(e, 'EM')}
            />
            <Input
              name='password'
              value={password}
              type='password'
              placeholder='Password'
              onChange={(e) => inputHandler(e, 'PW')}
            />
            <Input
              name='confirmPassword'
              value={confirmPassword}
              type='password'
              placeholder='Confirm Password'
              onChange={(e) => inputHandler(e, 'CPW')}
            />
          </form>
          <Button type='submit' form='signUpForm'>
            Sign Up
          </Button>{' '}
          <br />
          <p>
            Already have an account? <Link to='/signIn'>Sign In</Link>
          </p>
        </FormWrapper>
      </FormBody>
    </>
  )
}

export default SignUp
