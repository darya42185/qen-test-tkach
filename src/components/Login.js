import React, { useState } from "react";
import "../styles/login.css";
import googleIcon from "../assets/google.png";
import githubIcon from "../assets/code.png";
import hideEye from "../assets/hide.png";
import viewEye from "../assets/view.png";

const Login = ({
  onForgotPasswordClick,
  handleLogin,
  handleEmailChange,
  isEmailValid,
  username,
  error,
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h1 className="header-name">Qencode</h1>
      <h2 className="log-in">Log in to your account</h2>
      <div className="social-login">
        <button className="google-login">
          <img src={googleIcon} alt="Google" />
          <h3>Google</h3>
        </button>
        <button className="github-login">
          <img src={githubIcon} alt="GitHub" />
          <h3>Github</h3>
        </button>
      </div>
      <div className="separator">OR</div>

      <input
        className="email-input"
        type="text"
        placeholder="Work email"
        value={username}
        onChange={handleEmailChange}
      />
      {isEmailValid && (
        <div className="password-input-container">
          <input
            className="password-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="show-password-button"
            onClick={handleTogglePassword}
          >
            <img
              src={showPassword ? hideEye : viewEye}
              alt={showPassword ? "Hide" : "Show"}
            />
          </button>
        </div>
      )}
      {isEmailValid && (
        <button className="forgot-password" onClick={onForgotPasswordClick}>
          Forgot your password?
        </button>
      )}
      <button className="login-button" onClick={handleLogin}>
        Log in to Qencode
      </button>
      <h2 className="sign-up">
        Is your company new to Quencode?
        <button className="sign-up-btn">Sign up</button>
      </h2>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
