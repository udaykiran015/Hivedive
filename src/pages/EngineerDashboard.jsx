// src/pages/EngineerDashboard.js
import React from "react";
import EngineerNavbar from "../components/EngineerNavbar";
import "../styles/EngineerDashboard.css";

export default function EngineerDashboard() {
  return (
    <div className="engineer-dashboard">
      <EngineerNavbar />

      <h1 className="engineer-title"> Welcome, Engineer</h1>

      <div className="welcome-box">
        <h2>Your Daily Mission</h2>
        <p>
          Monitor your assigned communities and assist in ensuring building
          safety. Use the tools below to take action or check alerts.
        </p>

        <div className="action-buttons">
          <button>🔍 View Reports</button>
          <button>📡 Monitor Sensors</button>
          <button>🚨 View AI Alerts</button>
        </div>
      </div>

      <div className="community-grid">
        {/* You can add cards here if you want to preview communities */}
        {/* Or just leave this clean for the welcome page only */}
      </div>
    </div>
  );
}
