import React, { useState } from "react";
import hideEye from "../assets/hide.png";
import viewEye from "../assets/view.png";
import "../styles/reset.css";

const ResetPassword = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSetNewPassword = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      onSubmit(password);
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      console.error("Set New Password Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="header-name">Qencode</h1>
      <h2>Create new password</h2>
      <div className="password-control">
        <h2 className="password-header">Password</h2>
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
      </div>
      <div className="password-control">
        <h2 className="confirm-password-header">Confirm password</h2>
        <div className="password-input-container">
          <input
            className="password-input"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleSetNewPassword} className="reset-button">
        Set New Password
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ResetPassword;
