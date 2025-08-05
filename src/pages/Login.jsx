import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logon.jpg";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("owner");

  // ✅ Fix body padding issue only for login page
  useEffect(() => {
    document.body.classList.add("login-body"); // apply class to body
    return () => {
      document.body.classList.remove("login-body"); // cleanup on unmount
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    // Save to localStorage (demo)
    localStorage.setItem("user", role);
    localStorage.setItem("username", username);

    // Redirect based on role
    if (role === "owner") {
      navigate("/home?flat=Flat A1");
    } else if (role === "engineer") {
      navigate("/engineer-dashboard");
    } else if (role === "admin") {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div className="login-container animate-fade">
      <div className="logo-container">
        <img src={logo} alt="InspectPro Logo" className="logo" />
      </div>
      <h1 className="brand-title">InspectPro</h1>
      <p className="brand-subtitle">Building Quality Monitoring System</p>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="🔑 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="role-select">
          <label htmlFor="role">Select Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="owner">Owner</option>
            <option value="engineer">Engineer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="login-button">
          🔐 Login
        </button>
      </form>
    </div>
  );
}
