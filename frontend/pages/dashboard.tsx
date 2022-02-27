import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore/lite";
import { db } from "constants/firebase";
import type { NextPage } from "next";
import { useAuth } from "contexts/AuthContext";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Header from "components/modules/Dashboard/Header";
import PageHeader from "components/modules/Dashboard/Header/PageHeader";
import ImageForm from "components/modules/Dashboard/ImageForm";
import ImageList from "components/modules/Dashboard/ImageList";
import LoadingPage from "components/templates/LoadingPage";
import Redirect from "components/elements/Redirect";

const Dashboard: NextPage = () => {
  const { loading, user } = useAuth();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "users", user.uid, "images"));
    getDocs(q).then((querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          downloadUrl: data.downloadUrl,
          healthyProb: parseFloat(data.healthyProb),
          unhealthyProb: parseFloat(data.unhealthyProb),
        };
      });
      setImages(docs);
    });
  }, [loading]);

  if (loading) return <LoadingPage />;
  if (!user) return <Redirect to="/auth/signin" />;
  return (
    <>
      <Stack bgcolor="#EFF1F4" minHeight="100vh">
        <Header />
        <PageHeader />
        <Container sx={{ py: 4 }}>
          <ImageForm images={images} setImages={setImages} />
          <ImageList images={images} />
        </Container>
      </Stack>
    </>
  );
};

export default Dashboard;
