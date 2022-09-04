import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainStore } from '../contexts/context'

export interface AuthRouteProps {
  children: React.ReactNode
}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const { children } = props
  const auth = getAuth()
  const navigate = useNavigate()
  // const [loading, setLoading] = useState(false)
  const { setCurrentUID } = useContext(MainStore)

  useEffect(() => {
    AuthCheck()
    return () => AuthCheck()
  }, [auth])

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    console.log('hello')
    if (user !== null) {
      console.log('runnning')
      setCurrentUID(user.uid)
      // eslint-disable-next-line no-useless-return
      return
    } else {
      console.log('Unauthorized')
      navigate('/signIn')
    }
  })
  // if (loading) return <p>Loading...</p>

  return <>{children}</>
}

export default AuthRoute
