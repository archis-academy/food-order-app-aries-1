import { useState, useEffect } from "react";
import "./LoginPage.scss";
import { auth } from "@/config/firebase";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useAuth } from "@/components/AuthProvider";

function LoginPage() {
  const { fireStoreUser } = useAuth();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!fireStoreUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser);
    });
    return () => unsubscribe();
  }, []);
  // onAuthStateChanged(auth, (currentUser) => {
  //   // setUser(currentUser);
  //   console.log(currentUser);
  // });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleUserLogin(e) {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  async function handleLogout() {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }
  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        {isLoggedIn ? (
          <div>
            <h1>Welcome {fireStoreUser?.displayName}</h1>
            {/* <Link>
              
              replace={true} to="/login" onClick={signOut(auth)}
              > Logout
            </Link> */}

            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <LoginForm
            handleUserLogin={handleUserLogin}
            handleChange={handleChange}
            passwordVisible={passwordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
