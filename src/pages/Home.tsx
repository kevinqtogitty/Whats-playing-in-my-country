import CurrrentlyPlaying from '../functional components/CurrentlyPlaying'
import UpcomingIn from '../functional components/UpcomingIn'

const Home: React.FC = () => {
  return (
    <>
      <CurrrentlyPlaying />
      <UpcomingIn />
    </>
  )
}

export default Home
