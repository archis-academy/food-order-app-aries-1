import { useState, useEffect } from "react";
import "./LoginPage.scss";
import { auth, googleProvider } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { useAuth } from "@/components/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const { fireStoreUser } = useAuth();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!fireStoreUser);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      const rememberedEmail = localStorage.getItem("rememberedEmail");

      if (rememberedEmail) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          email: rememberedEmail,
        }));
        setRememberMe(true);
      }
    }
  }, [isLoggedIn]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }
  function handleRememberMeChange(event) {
    setRememberMe(event.target.checked);
  }

  async function handleUserLogin(e) {
    e.preventDefault();
    const { email, password } = formData;
    if (email && password) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res);
        setIsLoggedIn(true);
        navigate("/");
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail", email);
        }
      } catch (error) {
        console.error(error);
        toast.error("Incorrect email or password");
      }
    } else {
      toast.warn("Please fill in all fields");
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
  async function handleGoogleLogin() {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/cancelled-popup-request") {
        toast.error("Cancelled popup request");
      } else if (error.code === "auth/popup-blocked") {
        toast.error("Popup blocked, please allow pop-ups in your browser");
      } else {
        toast.error("Google sign-in failed");
      }
    } finally {
      setLoading(false);
    }
  }

  function togglePasswordVisibility() {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  }
  const authenticatedUserView = (
    <div>
      <h1 className="login-welcome">
        Welcome Again <br /> {fireStoreUser?.displayName}
      </h1>
      <LoginForm
        handleUserLogin={handleUserLogin}
        handleChange={handleChange}
        passwordVisible={passwordVisible}
        togglePasswordVisibility={togglePasswordVisibility}
        handleRememberMeChange={handleRememberMeChange}
        rememberMe={rememberMe}
        formData={formData}
      />

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        {isLoggedIn ? (
          authenticatedUserView
        ) : (
          <>
            <LoginForm
              handleUserLogin={handleUserLogin}
              handleChange={handleChange}
              passwordVisible={passwordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
              handleRememberMeChange={handleRememberMeChange}
              rememberMe={rememberMe}
              formData={formData}
            />
            <div className="google-login">
              <img className="google-icon" src="google-icon.svg" alt="" />
              <button
                className="google-login-btn"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign in with Google"}
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
