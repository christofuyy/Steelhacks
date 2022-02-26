import type { NextPage } from "next";
import { useAuth } from "contexts/AuthContext";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Header from "components/modules/Dashboard/Header";
import PageHeader from "components/modules/Dashboard/Header/PageHeader";
import ImageForm from "components/modules/Dashboard/ImageForm";
import LoadingPage from "components/templates/LoadingPage";
import Redirect from "components/elements/Redirect";

const Dashboard: NextPage = () => {
  const { loading, user } = useAuth();

  if (loading) return <LoadingPage />;
  if (!user) return <Redirect to="/auth/signin" />;
  return (
    <>
      <Stack bgcolor="#EFF1F4" minHeight="100vh">
        <Header />
        <PageHeader />
        <Container sx={{ py: 4 }}>
          <ImageForm />
        </Container>
      </Stack>
    </>
  );
};

export default Dashboard;
