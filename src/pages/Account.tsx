import NavBar from '../functional components/NavBar'
import { getAuth, signOut } from 'firebase/auth'
import { Button } from '../styled components/buttons'

const Account = () => {
  const auth = getAuth()
  return (
    <>
      <NavBar></NavBar>
      <div>Account</div>
      <Button onClick={() => signOut(auth)}>Sign Out</Button>
    </>
  )
}

export default Account
