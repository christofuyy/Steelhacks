import type { NextPage } from "next";
import { useAuth } from "contexts/AuthContext";
import LoadingPage from "components/templates/LoadingPage";
import Box from "@mui/material/Box";
import Header from "components/modules/Header";
import Hero from "components/modules/Landing/Hero";

const Home: NextPage = () => {
  const { loading } = useAuth();

  if (loading) return <LoadingPage />;
  return (
    <>
      <Box bgcolor="#EFF6FF">
        <Header />
        <Hero />
      </Box>
    </>
  );
};

export default Home;
