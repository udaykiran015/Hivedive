// src/components/AlertCard.js
import React from "react";
import "./AlertCard.css";

const AlertCard = ({ alert }) => {
  const severityColors = {
    High: "#ff4d4f",
    Moderate: "#faad14",
    Low: "#52c41a",
  };

  return (
    <div
      className="alert-card"
      style={{ borderLeft: `6px solid ${severityColors[alert.severity]}` }}
    >
      <h3>
        {alert.problem} in {alert.location}
      </h3>
      <p>
        <strong>Severity:</strong> {alert.severity}
      </p>
      <p>
        <strong>Prediction:</strong> {alert.prediction}
      </p>
      <p>
        <strong>Action:</strong> {alert.action}
      </p>
      <p>
        <strong>Contact:</strong> {alert.contact}
      </p>
      <p className="timestamp">
        <strong>Reported at:</strong>{" "}
        {new Date(alert.timestamp * 1000).toLocaleString()}
      </p>
    </div>
  );
};

export default AlertCard;
