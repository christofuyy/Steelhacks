import type { NextPage } from "next";
import Button from "components/elements/Button";
import Stack from "@mui/material/Stack";
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
      <Stack spacing={2} alignItems="flex-start">
        <Button variant="contained" href="/dashboard" disabled={user === null}>
          Dashboard
        </Button>
        <Button
          variant="contained"
          href={user !== null ? "/auth/signout" : "/auth/signin"}
        >
          {user !== null ? "Sign Out" : "Sign In"}
        </Button>
      </Stack>
    </div>
  );
};

export default Home;
