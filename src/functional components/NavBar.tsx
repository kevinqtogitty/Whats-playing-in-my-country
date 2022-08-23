import { LiNavList, Navigation, UlNavList } from '../styled components/navBar'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <Navigation>
      <UlNavList>
        <LiNavList>
          <Link to='/'>Home</Link>
        </LiNavList>
        <LiNavList>
          <Link to='/login'>Login</Link>
        </LiNavList>
      </UlNavList>
    </Navigation>
  )
}

export default NavBar
