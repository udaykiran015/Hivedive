import React, { useEffect, useState } from "react";
import EngineerNavbar from "../components/EngineerNavbar";
import "../styles/EngineerMaintenance.css";
import { useNavigate } from "react-router-dom";

export default function EngineerMaintenance() {
  const [communityData, setCommunityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://0cb4cxszyf.execute-api.eu-north-1.amazonaws.com/engineer-data"
    )
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        data.forEach((item) => {
          const { community, timestamp } = item;
          if (
            !map[community] ||
            new Date(timestamp) > new Date(map[community].timestamp)
          ) {
            map[community] = item;
          }
        });
        const list = Object.values(map).sort((a, b) =>
          a.community.localeCompare(b.community)
        );
        setCommunityData(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (buildingData) => {
    if (!buildingData) return;

    navigate(`/engineer-maintenance/${buildingData.community}`, {
      state: { building: buildingData },
    });
  };

  return (
    <div className="maintenance-container">
      <EngineerNavbar />
      <h2 className="page-title"> Maintenance Overview</h2>

      {loading ? (
        <p className="loading">Loading maintenance data...</p>
      ) : (
        <div className="maintenance-grid">
          {communityData.map((c) => (
            <div
              key={c.community}
              className="maintenance-card"
              onClick={() => handleCardClick(c)}
            >
              <h3>{c.community}</h3>
              <p>
                <strong>Latest Issue:</strong>{" "}
                {c.ai_alert?.trim() || "No issues reported"}
              </p>
              <p>
                <strong>Severity:</strong> {c.ai_severity?.trim() || "Unknown"}
              </p>
              <p>
                <strong>Last updated:</strong>{" "}
                {c.timestamp
                  ? new Date(c.timestamp).toLocaleString()
                  : "No data"}
              </p>
              <p className={c.ai_severity === "High" ? "emergency-alert" : ""}>
                {c.ai_severity === "High"
                  ? "🚨 Emergency Attention Required"
                  : "🛠 Under Monitoring"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
