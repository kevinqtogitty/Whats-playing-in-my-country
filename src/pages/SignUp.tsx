import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserCredentials } from '../context'
import NavBar from '../functional components/NavBar'
import { Button } from '../styled components/buttons'
import { Input } from '../styled components/input'

const SignUp: React.FC = () => {
  const { email, setEmail } = useContext(UserCredentials)
  const { password, setPassword } = useContext(UserCredentials)
  const { firstName, setFirstName } = useContext(UserCredentials)
  const { lastName, setLastName } = useContext(UserCredentials)

  return (
    <>
      <NavBar />
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

      <p>
        Already have an account? <Link to='/signIn'>Sign In</Link>
      </p>
      <p>Forgot password?</p>
    </>
  )
}

export default SignUp
