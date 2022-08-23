import React, { useContext, useState } from 'react'
import { UserCredentials } from '../context'
import { Button } from '../styled components/buttons'
import { Input } from '../styled components/input'

const LoginForm: React.FC = () => {
  const { email, setEmail } = useContext(UserCredentials)
  const { password, setPassword } = useContext(UserCredentials)
  const { signUpOrLogin, setFormType } = useContext(UserCredentials)

  const handleFormSwitch = () => setFormType(!signUpOrLogin)

  return (
    <>
      <form action='submit'>
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
        <Button type='submit'>Login</Button> <br />
      </form>
      <Button onClick={handleFormSwitch}>Sign Up</Button>
      <p>Forgot password?</p>
    </>
  )
}

export default LoginForm
