import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { getAuth, User, Auth } from 'firebase/auth'
import { deleteAccount, resetPassword, signOutUser } from '../firebase/userServices'

import { MainStore } from '../contexts/context'

import { LogoutButton } from '../components/re-usables/buttons'
import { Notification } from './SignIn'

const Settings: React.FC = () => {
  const [notification, setNotification] = useState('')
  const [showNotification, setShowNotification] = useState<boolean>(false)

  const { setSignedInOrNot, setCurrentUID } = useContext(MainStore)

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

  const handleNotification = (message: string): void => {
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
