import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "constants/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
