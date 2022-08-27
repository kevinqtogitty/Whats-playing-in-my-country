import React, { ChangeEvent, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../functional components/individual styled components/input'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { FormBody } from '../functional components/individual styled components/body'
import styled from 'styled-components'
import { Button } from '../functional components/individual styled components/buttons'
import { ErrorMessage } from './SignIn'
import { collectionReference, firestoreDB } from '../main'
import { CurrentCountryContext } from '../contexts/context'

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

  const { currentUID, setCurrentUID } = useContext(CurrentCountryContext)

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
      const newUser = await createUser(email, password)

      await setDoc(doc(firestoreDB, 'users', newUser.user.uid), {
        email: email,
        first_name: firstName,
        last_name: lastName,
        watchList: [],
      })

      navigate('/signIn')
    } catch (error) {
      console.log(error)
    }
  }

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }

  const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  return (
    <>
      <FormBody>
        <FormWrapper>
          {error === false ? null : <ErrorMessage>Error: Passwords do not match</ErrorMessage>}
          <form action='submit' id='signUpForm' onSubmit={handleSubmit}>
            <Input
              name='firstName'
              value={firstName}
              type='text'
              placeholder='First Name'
              onChange={handleFirstName}
            />
            <Input
              name='lastName'
              value={lastName}
              type='text'
              placeholder='Last Name'
              onChange={handleLastName}
            />
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
            <Input
              name='confirmPassword'
              value={confirmPassword}
              type='password'
              placeholder='Confirm Password'
              onChange={handleConfirmPassword}
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
