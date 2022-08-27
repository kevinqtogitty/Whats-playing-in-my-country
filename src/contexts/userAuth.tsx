import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentCountryContext } from './context'

export interface AuthRouteProps {
  children: React.ReactNode
}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const { children } = props
  const auth = getAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { currentUID, setCurrentUID } = useContext(CurrentCountryContext)

  //user login check
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log(user.uid)
  //   }
  // })

  useEffect(() => {
    AuthCheck()
    return () => AuthCheck()
  }, [auth])

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false)
    } else if (!user) {
      console.log('Unauthorized')
      navigate('/signIn')
    }
  })
  if (loading) return <p>Loading...</p>

  return <>{children}</>
}

export default AuthRoute
