import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-navbar">
      <div className="logo" onClick={() => navigate("/admin-dashboard")}>
        🛡️ InspectPro
        <span className="role-tag">Admin</span>
      </div>
      <ul className="nav-links">
        <li onClick={() => navigate("/admin-dashboard")}>Home</li>
        <li onClick={() => navigate("/admin-insights")}>Insights</li>
        <li onClick={() => navigate("/admin-maintenance-reports")}>Reports</li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
