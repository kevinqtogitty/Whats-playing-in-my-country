import React, { useState } from 'react'
import { Button } from '../styled components/buttons'
import { Input } from '../styled components/input'

const LoginForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [signUpOrLogin, setFormType] = useState<boolean>(true)

  const handleFormSwitch = () => {
    setFormType(!signUpOrLogin)
  }

  if (signUpOrLogin) {
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

  return (
    <>
      <form action='submit'>
        <Input
          name='firstName'
          value={firstName}
          type='text'
          placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          name='lastName'
          value={lastName}
          type='text'
          placeholder='Surname'
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          name='email'
          value={email}
          type='text'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name='password'
          value={password}
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit'>Login</Button> <br />
      </form>
      <Button onClick={handleFormSwitch}>Login</Button>
      <p>Forgot password?</p>
    </>
  )
}

export default LoginForm
