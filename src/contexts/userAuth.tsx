import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface AuthRouteProps {
  children: React.ReactNode
}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const { children } = props
  const auth = getAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    AuthCheck()
    return () => AuthCheck()
  }, [auth])

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false)
    } else {
      console.log('Unauthorized')
      navigate('/signIn')
    }
  })

  if (loading) return <p>Loading...</p>

  return <>{children}</>
}

export default AuthRoute
