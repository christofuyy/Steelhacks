import type { NextPage } from "next";
import Button from "components/elements/Button";
import { useAuth } from "contexts/AuthContext";
import LoadingPage from "components/templates/LoadingPage";
import Typography from "components/elements/Typography";

const Home: NextPage = () => {
  const { loading, user } = useAuth();

  if (loading) return <LoadingPage />;
  return (
    <div>
      {user === null ? (
        <Typography>Not authenticated</Typography>
      ) : (
        <Typography>Currently signed in as {user.email}</Typography>
      )}
      <Button href={user !== null ? "/auth/signout" : "/auth/signin"}>
        {user !== null ? "Sign Out" : "Sign In"}
      </Button>
    </div>
  );
};

export default Home;
