import React from 'react'

import CurrrentlyPlaying from '../components/CurrentlyPlaying'
import UpcomingIn from '../components/UpcomingIn'

const Home: React.FC = () => {
  return (
    <>
      <CurrrentlyPlaying />
      <UpcomingIn />
    </>
  )
}

export default Home
