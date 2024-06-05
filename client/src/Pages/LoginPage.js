// LoginPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/login.css";

import logo from "../../src/logo.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    // Logic to authenticate user
    // On successful authentication:

    const data = "jihan";
    localStorage.setItem("authToken", data);
    navigate("/hr"); // Redirect to a protected route after login

    if (e.target.loginas.value == "hr") {
      navigate("/hr");
    } else {
      navigate("/FinanceDashboard");
    }
  };

  return (
    <div className="loginpage">
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>
        <form className="login-form " onSubmit={handleLogin}>
          <div className="form-group">
            <input type="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="dropdown">Select an option:</label>
            <select id="dropdown" name="loginas">
              <option value="">Select...</option>
              <option value="hr">HR</option>
              <option value="accounts">Accounts</option>
            </select>
          </div>
          <div className="form-group">
            <button className="button1" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
