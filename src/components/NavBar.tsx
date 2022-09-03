import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { MainStore } from '../contexts/context'
import ChooseCountry from './ChooseCountryDropdown'
import gearSvg from '../assets/img/settings.svg'

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 0px;
  width: 100%;
  background: linear-gradient(to bottom, #090506, #070709);
`

const UlNavList = styled.ul`
  display: flex;
  width: 100%;
  column-gap: 1rem;
  text-decoration: none;
  align-items: center;
  margin-left: -1.5rem;
`

const LiNavList = styled.li`
  text-decoration: none;
  list-style: none;
  list-style-type: none;
  color: #f8f8f9;
  font-size: 1rem;
`
const Icon = styled.img`
  filter: invert(100%);
  width: 1.3rem;
  margin-top: 6px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-self: center;
  margin-right: 1rem;
`

const NavBar: React.FC = () => {
  const { signedInOrNot } = useContext(MainStore)
  return (
    <Navigation>
      <UlNavList>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <LiNavList>Home</LiNavList>
        </Link>
        {signedInOrNot === 'false' ? (
          <Link to='/signIn' style={{ textDecoration: 'none' }}>
            <LiNavList>Sign In</LiNavList>
          </Link>
        ) : (
          <>
            <Link to='/account' style={{ textDecoration: 'none' }}>
              <LiNavList>Account</LiNavList>
            </Link>
          </>
        )}
        <ChooseCountry />
      </UlNavList>
      {signedInOrNot === 'false' ? null : (
        <ButtonContainer>
          <Link to='/settings' style={{ textDecoration: 'none' }}>
            <Icon src={gearSvg} />
          </Link>
        </ButtonContainer>
      )}
    </Navigation>
  )
}

export default NavBar
