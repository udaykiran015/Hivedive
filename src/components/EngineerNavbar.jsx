import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/EngineerNavbar.css";

export default function EngineerNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="engineer-navbar">
      <div className="nav-left" onClick={() => navigate("/engineer-dashboard")}>
        <span className="logo">
          InspectPro <span className="role-tag">Engineer</span>
        </span>
      </div>

      <div className="nav-center">
        <ul className="nav-links">
          <li
            className={isActive("/engineer-dashboard") ? "active" : ""}
            onClick={() => navigate("/engineer-dashboard")}
          >
            Home
          </li>
          <li
            className={isActive("/engineer-technical") ? "active" : ""}
            onClick={() => navigate("/engineer-technical")}
          >
            Technical
          </li>
          <li
            className={isActive("/engineer-maintenance") ? "active" : ""}
            onClick={() => navigate("/engineer-maintenance")}
          >
            Maintenance
          </li>
        </ul>
      </div>

      <div className="nav-right">
        <button className="logout-btn" onClick={() => navigate("/")}>
          🔒 Logout
        </button>
      </div>
    </nav>
  );
}
