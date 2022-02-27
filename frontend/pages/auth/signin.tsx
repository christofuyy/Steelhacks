import type { NextPage } from "next";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "contexts/AuthContext";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "components/elements/Typography";
import Link from "components/elements/Link";
import Card from "@mui/material/Card";
import Button from "components/elements/Button";
import LoadingPage from "components/templates/LoadingPage";
import Redirect from "components/elements/Redirect";

import { FaGoogle, FaGithub } from "react-icons/fa";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const SignIn: NextPage = () => {
  const { user, loading, signIn } = useAuth();

  if (loading) return <LoadingPage />;
  if (user) return <Redirect to="/dashboard" />;
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Stack alignItems="center" mb={2}>
        <Typography variant="h2" color="primary.main">
          XScanner
        </Typography>
        <Typography variant="h2">Sign in to your account</Typography>
        <Typography variant="body1">
          Or{" "}
          <Link href="/" underline="hover">
            return to the home page
          </Link>
        </Typography>
      </Stack>
      <Card
        sx={{ p: 2, width: 1, border: 1, borderColor: "grey.200" }}
        elevation={4}
      >
        <Stack spacing={1}>
          <Typography variant="body1" align="center">
            Sign in with
          </Typography>
          <Button
            sx={{ border: 1, borderColor: "grey.300", bgcolor: "white" }}
            variant="contained"
            size="large"
            color="inherit"
            startIcon={<FaGoogle />}
            disableElevation={false}
            onClick={signIn(googleProvider, GoogleAuthProvider)}
          >
            Google
          </Button>
          <Button
            sx={{ border: 1, borderColor: "grey.300", bgcolor: "white" }}
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<FaGithub />}
            disableElevation={false}
            onClick={signIn(githubProvider, GithubAuthProvider)}
          >
            GitHub
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default SignIn;
