/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { MainStore } from '../contexts/context'
import { getAuth, User, Auth } from 'firebase/auth'
import { deleteAccount, resetPassword, signOutUser } from '../firebase/userServices'

import { Notification } from '../stylesheets/styled_components/styles_for_pages/signInPageStyles'
import { LogoutButton } from '../stylesheets/styled_components/buttons'

const Settings: React.FC = (): JSX.Element => {
  const [notification, setNotification] = useState<string>('')
  const [showNotification, setShowNotification] = useState<boolean>(false)

  const { setSignedInOrNot, setCurrentUID } = useContext(MainStore)

  const auth: Auth = getAuth()
  const user: User | null = auth.currentUser

  const handleSignOut = (): void => {
    signOutUser(auth)
      .then(
        () => setSignedInOrNot(false),
        () => setCurrentUID('')
      )
      .catch(() => {})
  }

  const handleDelete = (): void => {
    if (user !== null) {
      deleteAccount(user)
        .then()
        .catch(() => {})
    }
  }

  const handlePassWordReset = async (): Promise<void> => {
    if (user !== null) {
      if (user.email !== null) {
        await resetPassword(auth, user.email)
        const message = 'Password reset E-mail has been sent'
        handleNotification(message)
      }
    }
  }

  const handleNotification = (message: string): void => {
    setNotification(message)
    setShowNotification(true)
    console.log('hello')
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
