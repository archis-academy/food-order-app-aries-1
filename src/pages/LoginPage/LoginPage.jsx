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
    <div>
      <h1>Login page</h1>
      <form onSubmit={(e) => handleUserLogin(e)}>
        <input
          onKeyUp={(e) => handleChange(e)}
          name="password"
          type="password"
        />
        <input onKeyUp={(e) => handleChange(e)} name="email" type="email" />
        <input type="submit" value="Login" />
      </form>

      <button
        onClick={() => {
          signOut(auth);
          console.log("clicked");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default LoginPage;
