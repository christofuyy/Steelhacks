import type { NextPage } from "next";
import { useEffect } from "react";
import { useAuth } from "contexts/AuthContext";
import { auth } from "constants/firebase";
import { signOut } from "firebase/auth";
import Redirect from "components/elements/Redirect";
import LoadingScreen from "components/templates/LoadingPage";

const SignOut: NextPage = () => {
  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading) {
      signOut(auth);
    }
  }, [loading, user]);

  if (loading) return <LoadingScreen />;

  if (user !== null) return <LoadingScreen title="Signing Out" />;

  return <Redirect to="/" title="Redirecting" />;
};

export default SignOut;
