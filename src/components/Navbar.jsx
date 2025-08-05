// src/components/Navbar.js
import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const flat = searchParams.get("flat") || "Flat A1";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand"> InspectPro</span>
        <Link to={`/home?flat=${flat}`} className="nav-item">
          Home
        </Link>
        <Link to={`/owner-dashboard?flat=${flat}`} className="nav-item">
          Report
        </Link>
        <Link to={`/my-house?flat=${flat}`} className="nav-item">
          My House
        </Link>
      </div>
      <div className="navbar-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
