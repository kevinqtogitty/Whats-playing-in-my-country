import React from 'react'

import CurrrentlyPlaying from '../components/getCurrentlyPlaying'
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
