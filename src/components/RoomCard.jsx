// src/components/RoomCard.js
import React from "react";
import "../styles/MyHouseDashboard.css";

export default function RoomCard({ title, alert, image }) {
  const severityClass = alert
    ? alert.severity.toLowerCase().replace(" ", "-")
    : "safe";

  return (
    <div className={`room-card ${severityClass}`}>
      <div
        className="room-image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className="room-info">
        <h2>{title}</h2>
        {alert ? (
          <>
            <p>
              ⚠️ <strong>{alert.problem}</strong>
            </p>
            <p>🔮 {alert.prediction}</p>
            <p>🛠️ {alert.action}</p>
            <p>📞 {alert.contact}</p>
          </>
        ) : (
          <p className="safe-text">✅ All Clear</p>
        )}
      </div>
    </div>
  );
}
