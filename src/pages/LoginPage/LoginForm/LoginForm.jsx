import { useState } from "react";
import "./LoginForm.scss";

const LoginForm = ({
  handleUserLogin,
  handleChange,
  passwordVisible,
  togglePasswordVisibility,
  handleRememberMeChange,
  rememberMe,
  formData,
}) => {
  return (
    <form onSubmit={(e) => handleUserLogin(e)}>
      <div className="login-email-container">
        <img className="login-icon" src="/mail-icon.svg" alt="person icon" />
        <input
          className="login-email"
          onKeyUp={(e) => handleChange(e)}
          name="email"
          type="email"
          placeholder="Email"
          // value={formData.email}
        />
      </div>
      <div className="login-password-container">
        <img className="login-icon" src="/lock-icon.svg" alt="lock icon" />
        <input
          className="login-password"
          onKeyUp={(e) => handleChange(e)}
          name="password"
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          // value={formData.password}
        />
        <img
          src={passwordVisible ? "/visibility-off.svg" : "/visibility.svg"}
          alt="toggle password visibility"
          onClick={togglePasswordVisibility}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="login-rememberme-container">
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          Remember Me
        </label>
      </div>
      <input className="login-btn" type="submit" value="Login" />
      <div className="login-signup-div">
        <p>Don't have an accout?</p>
        <a className="login-signup" href="/signup">
          Sign Up
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
