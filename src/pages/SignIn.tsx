import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserCredentials } from '../context'
import NavBar from '../functional components/NavBar'
import { Button } from '../styled components/buttons'
import { Input } from '../styled components/input'

const SignIn = () => {
  const { email, setEmail } = useContext(UserCredentials)
  const { password, setPassword } = useContext(UserCredentials)

  return (
    <>
      <NavBar></NavBar>
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
      <p>
        Don't have an account? <Link to='/signUp'>Sign Up</Link>
      </p>
      <p>Forgot password?</p>
    </>
  )
}

export default SignIn
