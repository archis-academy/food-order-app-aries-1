import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [fireStoreUser, setFireStoreUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
        const userDoc = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDoc);

        if (!userSnap.exists()) {
          await setDoc(userDoc, {
            image: currentUser.photoURL || "/photo.svg",
            displayName: currentUser.displayName || currentUser.email,
            email: currentUser.email,
            role: currentUser.role || "user",
          });
        }
      } else {
        setUser(null);
        setFireStoreUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          setFireStoreUser({ ...user, ...userSnap.data() });
        }
      }
    };
    fetchUserDetails();
  }, [user]);

  const userValues = {
    user,
    fireStoreUser,
    setUser,
  };

  return (
    <AuthContext.Provider value={userValues}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context.user === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
