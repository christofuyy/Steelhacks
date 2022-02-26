import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "constants/firebase";
import {
  onAuthStateChanged,
  User as FirebaseUser,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (currUser: FirebaseUser) => {
      setLoading(true);
      console.log(currUser);
      setUser(currUser);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const PROVIDER_ID_MAP = {
  [GithubAuthProvider.PROVIDER_ID]: GithubAuthProvider,
  [GoogleAuthProvider.PROVIDER_ID]: GoogleAuthProvider,
};

type Provider = GoogleAuthProvider | GithubAuthProvider;

const signIn = (provider: Provider, providerType) => async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const credential = providerType.credentialFromResult(res);
  } catch (err) {
    console.error((err as FirebaseError).message);

    if (
      (err as FirebaseError).code ===
      "auth/account-exists-with-different-credential"
    ) {
      const pendingCred = providerType.credentialFromError(err);
      const email = err.customData?.email;
      const methods = await fetchSignInMethodsForEmail(auth, email);

      const newProvider = new PROVIDER_ID_MAP[methods[0]]();
      console.log("Trying new provider", newProvider);
      const newRes = await signInWithPopup(auth, newProvider);
      await linkWithCredential(newRes.user, pendingCred);
    }
  }
};

export default AuthProvider;
