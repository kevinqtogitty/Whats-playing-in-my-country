import React, { useState } from 'react'
import { UserCredentials } from '../context'
import LoginForm from '../functional components/LoginForm'
import NavBar from '../functional components/NavBar'
import SignUpForm from '../functional components/SignUpForm'

const LoginPage = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [signUpOrLogin, setFormType] = useState<boolean>(true)

  const whichForm = signUpOrLogin === true ? <LoginForm /> : <SignUpForm />

  return (
    <>
      <NavBar></NavBar>
      <UserCredentials.Provider
        value={{
          firstName,
          setFirstName,
          lastName,
          setLastName,
          email,
          setEmail,
          password,
          setPassword,
          signUpOrLogin,
          setFormType,
        }}
      >
        {whichForm}
      </UserCredentials.Provider>
    </>
  )
}

export default LoginPage
