import { useState } from "react";
import "./LoginPage.scss";
import { auth } from "@/config/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function LoginPage() {
  onAuthStateChanged(auth, (currentUser) => {
    // setUser(currentUser);
    console.log(currentUser);
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form onSubmit={(e) => handleUserLogin(e)}>
          <div className="login-email-container">
            <img className="login-icon" src="/person-icon.svg"></img>
            <input
              className="login-email"
              onKeyUp={(e) => handleChange(e)}
              name="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="login-password-container">
            <img className="login-icon" src="/lock-icon.svg"></img>
            <input
              className="login-password"
              onKeyUp={(e) => handleChange(e)}
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <input className="login-btn" type="submit" value="Login" />

          <a className="login-signup" href="#">
            Sign Up
          </a>
        </form>

        {/* <button
        onClick={() => {
          signOut(auth);
          console.log("clicked");
          }}
          >
          Logout
          </button> */}
      </div>
    </div>
  );
}

export default LoginPage;
