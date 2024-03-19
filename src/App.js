import React, { useState } from "react";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [username, setUsername] = useState("");
  const [password] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [error, setError] = useState("");

  const handleSend = () => {
    setIsEmailSent(true);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://auth-qa.qencode.com/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { access_token, refresh_token, error } = data;

        if (error === 0 && access_token && refresh_token) {
          setLoggedInUser(access_token, refresh_token);
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setUsername(value);
    setIsEmailValid(isValidEmail);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPassword = (email) => {
    setForgotPasswordEmail(email);
    setShowForgotPassword(false);
  };

  const handleResetPassword = (password) => {
    setResetPasswordToken(password);
    setForgotPasswordEmail("");
  };

  const handleCancelForgotPassword = () => {
    setForgotPasswordEmail("");
    setShowForgotPassword(false);
  };

  return (
    <div>
      {!loggedInUser && !showForgotPassword && (
        <Login
          onForgotPasswordClick={handleForgotPasswordClick}
          handleLogin={handleLogin}
          handleEmailChange={handleEmailChange}
          isEmailValid={isEmailValid}
          username={username}
          error={error}
        />
      )}
      {loggedInUser && !forgotPasswordEmail && <p>Welcome, {loggedInUser}!</p>}
      {showForgotPassword && (
        <ForgotPassword
          onSubmit={handleForgotPassword}
          onCancel={handleCancelForgotPassword}
          handleSend={handleSend}
        />
      )}
      {isEmailSent && <ResetPassword email={username} />}
      {loggedInUser && forgotPasswordEmail && !resetPasswordToken && (
        <ResetPassword onSubmit={handleResetPassword} />
      )}
    </div>
  );
};

export default App;
