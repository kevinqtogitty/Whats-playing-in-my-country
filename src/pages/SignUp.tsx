/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { ChangeEvent, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { getAuth, UserCredential } from 'firebase/auth'
import { addUserDoc, createUser } from '../firebase/userServices'

import { Notification } from '../stylesheets/styled_components/styles_for_pages/signInPageStyles'
import { FormBody } from '../stylesheets/styled_components/body'
import { Button } from '../stylesheets/styled_components/buttons'
import { Input } from '../stylesheets/styled_components/input'
import { MainStore } from '../contexts/context'

const SignUp: React.FC = (): JSX.Element => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const { setSignedInOrNot } = useContext(MainStore)

  const navigate = useNavigate()
  const auth = getAuth()

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (confirmPassword !== password) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000)
      return
    }
    try {
      const newUser: UserCredential = await createUser(auth, email, password)
      const {
        user: { uid }
      } = newUser
      await addUserDoc({ uid, email, firstName, lastName })
      setSignedInOrNot(true)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement>, key: string): void => {
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
    }
  }

  return (
    <>
      <FormBody>
        <FormWrapper>
          {!error ? null : <Notification>Error: Passwords do not match</Notification>}
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

const FormWrapper = styled.div`
  margin-top: 6rem;
`
