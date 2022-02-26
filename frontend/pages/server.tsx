import { GetServerSideProps } from "next"
import type { Session } from "next-auth"
import { useSession, getSession } from "next-auth/react"

export default function Home() {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    return (
        <div>idk what to put here rn</div>
    )
}

//exports session prop with ssr
export const getServerSideProps: GetServerSideProps<{
    session: Session | null
  }> = async (context) => {
    return {
      props: {
        session: await getSession(context),
      },
    }
  }

