import React, { useState } from "react";
import "../styles/forgot.css";

const ForgotPassword = ({ onCancel, handleSend }) => {
  const [username, setUsername] = useState("");

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="forgot-container">
      <h1 className="header-name">Qencode</h1>
      <h2 className="forgot">Forgot Password?</h2>

      <input
        className="email-input"
        type="text"
        placeholder="Work email"
        value={username}
        onChange={handleEmailChange}
      />

      <div className="controls">
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
