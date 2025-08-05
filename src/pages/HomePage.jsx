// src/pages/HomePage.js
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/HomePage.css";
import bgImage from "../assets/home-bg.jpg"; // ✅ Import background image

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const flat = searchParams.get("flat") || "Flat A1";
  const navigate = useNavigate();

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <Navbar />
      <div className="home-hero">
        <div className="overlay">
          <div className="welcome-card">
            <h1>Welcome to InspectPro</h1>
            <p className="flat-info">Your Building: {flat}</p>

            <div className="overview-box">
              <h2>📋 Overview</h2>
              <ul>
                <li>📡 Live monitoring of your home's safety</li>
                <li>🤖 AI-based early predictions</li>
                <li>🛠️ Smart maintenance actions</li>
                <li>📞 Connect with verified professionals</li>
              </ul>
              <button
                className="know-more-button"
                onClick={() => navigate(`/owner-dashboard?flat=${flat}`)}
              >
                🔎 Know More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
