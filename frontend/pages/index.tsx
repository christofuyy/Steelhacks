import type { NextPage } from 'next'
import { signIn, signOut, useSession} from 'next-auth/react'

const Home: NextPage = () => {
  const {data: session, status} = useSession();
  const loading = status === "loading"

  if (loading){
    return null
  }

  if (!loading && !session){
    return (
      <>
        <div>BRO LOG IN</div>
        <button onClick={() => signIn()}>Sign In</button>
      </>

    )
  }
  return (
    <>
      <div>Hello World</div>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  )
}

export default Home
