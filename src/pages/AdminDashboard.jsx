import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/AdminDashboard.css"; // Make sure this path is correct

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="dashboard-content">
        <h2>👋 Welcome to InspectPro</h2>
        <p className="subtitle">
          You're currently monitoring 20 active communities for ongoing
          maintenance and alert resolution.
        </p>

        <div className="admin-panels">
          <div className="panel">
            <h3>🔔 Alerts & Instructions</h3>
            <ul>
              <li>Check urgent alerts across buildings</li>
              <li>Issue maintenance instructions</li>
              <li>Log community reports</li>
            </ul>
          </div>

          <div className="panel">
            <h3>🏘️ Community Overview</h3>
            <ul>
              <li>20 Communities under monitoring</li>
              <li>5 buildings marked for inspection</li>
              <li>Owner contacts verified</li>
            </ul>
          </div>

          <div className="panel">
            <h3>🧾 Tasks & Reports</h3>
            <ul>
              <li>View pending maintenance tasks</li>
              <li>Access monthly service reports</li>
              <li>Send instructions to engineers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
