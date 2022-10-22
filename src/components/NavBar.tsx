import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { MainStore } from '../contexts/context'
import ChooseCountry from './ChooseCountryDropdown'
import gearSvg from '../assets/img/settings.svg'
import {
  Navigation,
  UlNavList,
  LiNavList,
  ButtonContainer
} from '../stylesheets/styled_components/navBarStyles'
import { Icon } from '../stylesheets/styled_components/currentFilmCardStyles'

const NavBar: React.FC = (): JSX.Element => {
  const { signedInOrNot } = useContext(MainStore)

  return (
    <Navigation>
      <UlNavList>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <LiNavList>Home</LiNavList>
        </Link>
        {!signedInOrNot ? (
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
      {!signedInOrNot ? null : (
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
