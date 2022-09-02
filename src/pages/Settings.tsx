import React from 'react'
import { getAuth, User, Auth } from 'firebase/auth'
import { useContext, useState } from 'react'
import { Notification } from './SignIn'
import styled from 'styled-components'
import { MainStore } from '../contexts/context'
import { deleteAccount, resetPassword, signOutUser } from '../firebase/userServices'
import { LogoutButton } from '../functional components/individual styled components/buttons'

const Settings: React.FC = () => {
  const { setSignedInOrNot, setCurrentUID } = useContext(MainStore)
  const [notification, setNotification] = useState('')
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const auth: Auth = getAuth()
  const user: User | null = auth.currentUser

  const handleSignOut = (): void => {
    signOutUser(auth, setSignedInOrNot, setCurrentUID)
  }

  const handleDelete = (): void => {
    deleteAccount(user!)
  }

  const handlePassWordReset = async (): Promise<void> => {
    await resetPassword(auth, user!.email!)
    const message = 'Password reset E-mail has been sent'
    handleNotification(message)
  }

  const handleNotification = (message: string) => {
    setNotification(message)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 5000)
  }

  const SettingsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `
  return (
    <SettingsWrapper>
      {!showNotification ? null : <Notification>{notification}</Notification>}
      <h2>Wanna leave?</h2>
      <LogoutButton onClick={handleSignOut}>Logout</LogoutButton>
      <h2>Wanna leave forever?</h2>
      <LogoutButton onClick={handleDelete}>Delete Account</LogoutButton>
      <h2>Wanna reset your password?</h2>
      <LogoutButton onClick={handlePassWordReset}>Reset Password</LogoutButton>
    </SettingsWrapper>
  )
}

export default Settings
