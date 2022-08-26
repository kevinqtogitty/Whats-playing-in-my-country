import { Link } from 'react-router-dom'
import ChooseCountry from './ChooseCountryDropdown'
import styled from 'styled-components'
import { useContext } from 'react'
import { CurrentCountryContext } from '../contexts/context'
import { LogoutButton } from './individual styled components/buttons'
import { getAuth, signOut } from 'firebase/auth'

const Navigation = styled.nav`
  display: flex;
  justify-content: flex-start;
  margin: 0px;
`

const UlNavList = styled.ul`
  display: flex;
  column-gap: 1rem;
  text-decoration: none;
  align-items: center;
`

const LiNavList = styled.li`
  text-decoration: none;
  list-style: none;
  list-style-type: none;
  color: black;
`

const NavBar: React.FC = () => {
  const { signedInOrNot, setSignedInOrNot } = useContext(CurrentCountryContext)
  const auth = getAuth()

  const handleSignOut = () => {
    setSignedInOrNot(!signedInOrNot)
    signOut(auth)
  }

  return (
    <Navigation>
      <UlNavList>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <LiNavList>Home</LiNavList>
        </Link>
        {signedInOrNot === false ? (
          <Link to='/signIn' style={{ textDecoration: 'none' }}>
            <LiNavList>Sign In</LiNavList>
          </Link>
        ) : (
          <>
            <Link to='/account' style={{ textDecoration: 'none' }}>
              <LiNavList>Account</LiNavList>
            </Link>
            <LogoutButton onClick={handleSignOut}>Logout</LogoutButton>
          </>
        )}
        <ChooseCountry />
      </UlNavList>
    </Navigation>
  )
}

export default NavBar
