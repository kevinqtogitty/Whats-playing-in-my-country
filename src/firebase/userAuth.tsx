import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainStore } from '../contexts/context'
import { AuthRouteProps } from '../types/interfaces_types'

const AuthRoute: React.FC<AuthRouteProps> = (props): JSX.Element => {
  const { children } = props
  const auth = getAuth()
  const navigate = useNavigate()
  const { setCurrentUID } = useContext(MainStore)

  useEffect(() => {
    AuthCheck()
    return () => AuthCheck()
  }, [auth])

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      setCurrentUID(user.uid)
      // eslint-disable-next-line no-useless-return
      return
    } else {
      navigate('/signIn')
    }
  })

  return <>{children}</>
}

export default AuthRoute
