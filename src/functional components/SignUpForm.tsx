import { useContext } from 'react'
import { UserCredentials } from '../context'
import { Button } from '../styled components/buttons'
import { Input } from '../styled components/input'

const SignUpForm: React.FC = () => {
  const { email, setEmail } = useContext(UserCredentials)
  const { password, setPassword } = useContext(UserCredentials)
  const { signUpOrLogin, setFormType } = useContext(UserCredentials)
  const { firstName, setFirstName } = useContext(UserCredentials)
  const { lastName, setLastName } = useContext(UserCredentials)

  const handleFormSwitch = () => setFormType(!signUpOrLogin)

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
        <Input
          name='confirmPassword'
          value={password}
          type='password'
          placeholder='Confirm Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit'>Login</Button> <br />
      </form>
      <Button onClick={handleFormSwitch}>Login</Button>
      <p>Forgot password?</p>
    </>
  )
}

export default SignUpForm
