import "./SignupPage.scss";
import { useState } from "react";
import { auth, db } from "@/config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import visibility from "../../assets/visibility.svg";
import visibilityOff from "../../assets/visibility-off.svg";
import personIcon from "../../assets/person-icon.svg";
import mailIcon from "../../assets/mail-icon.svg";
import lockIcon from "../../assets/lock-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg";
import { NavLink } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  function togglePasswordVisibility() {
    setPasswordVisibility(!passwordVisibility);
  }

  const signupUser = async (e) => {
    e.preventDefault();

    const { fullName, phoneNumber, email, password, confirmPassword } =
      formData;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be minimum 6 characters, at least one uppercase letter, one lowercase letter and one number"
      );
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: fullName,
        phoneNumber: phoneNumber,
      });
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userDocRef, {
        fullName: auth.currentUser.displayName,
        phoneNumber: auth.currentUser.phoneNumber,
        email: auth.currentUser.email,
        cart: null,
        role: "user",
      });
    } catch (error) {
      console.error(error);
    }
  };

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <main className="signup-page">
      <div className="signup-form-container">
        <h1>Signup </h1>
        <form onSubmit={(e) => signupUser(e)} className="signup-form">
          <div className="signup-full-name signup-input">
            <img src={personIcon} alt="person-icon" />
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              onKeyUp={handleChange}
            />
          </div>
          <div className="signup-phone-number signup-input">
            <img src={phoneIcon} alt="phone-icon" />
            <input
              type="tel"
              placeholder="Phone number"
              name="phoneNumber"
              onKeyUp={handleChange}
            />
          </div>
          <div className="signup-e-mail signup-input">
            <img src={mailIcon} alt="mail-icon" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onKeyUp={handleChange}
            />
          </div>
          <div className="signup-password signup-input">
            <img src={lockIcon} alt="lock-icon" />
            <input
              type={passwordVisibility ? "text" : "password"}
              placeholder="Password"
              name="password"
              onKeyUp={handleChange}
            />
            <img
              src={passwordVisibility ? visibility : visibilityOff}
              alt="toggle password visibility"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="signup-confirm-password signup-input">
            <img src={lockIcon} alt="lock-icon" />
            <input
              type={passwordVisibility ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              onKeyUp={handleChange}
            />
          </div>
          <input type="submit" value="Signup" className="signup-btn" />
          <button className="signup-login-btn">
            <NavLink to="/login">Login</NavLink>
          </button>
        </form>
      </div>
    </main>
  );
}

export default SignupPage;
