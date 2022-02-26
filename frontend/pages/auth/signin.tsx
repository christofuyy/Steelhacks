import type { NextPage } from "next";
import { auth } from "constants/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  fetchSignInMethodsForEmail,
  linkWithCredential,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAuth } from "contexts/AuthContext";

const PROVIDER_ID_MAP = {
  [GithubAuthProvider.PROVIDER_ID]: GithubAuthProvider,
  [GoogleAuthProvider.PROVIDER_ID]: GoogleAuthProvider,
};

type Provider = GoogleAuthProvider | GithubAuthProvider;

const SignIn: NextPage = () => {
  const { user, loading } = useAuth();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

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

  const handleSignOut = () => signOut(auth);

  return (
    <div>
      <h1>Sign IN Page</h1>
      {user ? <p>Logged in as {user.email}</p> : <p>Not logged in</p>}
      <button onClick={signIn(googleProvider, GoogleAuthProvider)}>
        Sign In With Google
      </button>
      <button onClick={signIn(githubProvider, GithubAuthProvider)}>
        Sign In with GitHub
      </button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignIn;
