import { useState } from "react";
import "./LoginForm.scss";

const LoginForm = ({
  handleUserLogin,
  handleChange,
  passwordVisible,
  togglePasswordVisibility,
  handleRememberMeChange,
  rememberMe,
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
        />
        <img
          src={passwordVisible ? "/visibility-off.svg" : "/visibility.svg"}
          alt="toggle password visibility"
          onClick={togglePasswordVisibility}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="login-rememberme-container">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={handleRememberMeChange}
        />
        <span>Remember Me</span>
      </div>
      <input className="login-btn" type="submit" value="Login" />
      <a className="login-signup" href="#">
        Sign Up
      </a>
    </form>
  );
};

export default LoginForm;
