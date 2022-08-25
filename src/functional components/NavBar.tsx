import { Link } from 'react-router-dom'
import ChooseCountry from './ChooseCountryDropdown'
import styled from 'styled-components'

const Navigation = styled.nav`
  display: flex;
  justify-content: flex-start;
  border: 1rem, solid, black;
  margin: 0px;
`

const UlNavList = styled.ul`
  display: flex;
  column-gap: 1rem;
  text-decoration: none;
`

const LiNavList = styled.li`
  text-decoration: none;
  list-style: none;
  list-style-type: none;
  color: black;
`

const NavBar = () => {
  return (
    <Navigation>
      <UlNavList>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <LiNavList>Home</LiNavList>
        </Link>
        <Link to='/signIn' style={{ textDecoration: 'none' }}>
          <LiNavList>Sign In</LiNavList>
        </Link>
        <ChooseCountry />
      </UlNavList>
    </Navigation>
  )
}

export default NavBar
