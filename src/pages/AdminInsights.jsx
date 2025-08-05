import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/AdminInsights.css";

export default function AdminInsights() {
  const [sensorData, setSensorData] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      "https://07m3ciyyla.execute-api.eu-north-1.amazonaws.com/community/sensor"
    )
      .then((res) => res.json())
      .then((data) => {
        const grouped = {};
        data.forEach((item) => {
          const { community, timestamp } = item;
          if (
            !grouped[community] ||
            new Date(timestamp) > new Date(grouped[community].timestamp)
          ) {
            grouped[community] = item;
          }
        });

        const sorted = Object.values(grouped).sort((a, b) => {
          const numA = parseInt(a.community.match(/\d+/)?.[0] || 0);
          const numB = parseInt(b.community.match(/\d+/)?.[0] || 0);
          return numA - numB;
        });

        setSensorData(sorted);
      })
      .catch((err) => console.error("Error fetching admin sensor data:", err));
  }, []);

  const handleCommunityClick = (communityName) => {
    const filtered = sensorData.find((c) => c.community === communityName);
    setSelectedCommunity(filtered);
  };

  const getSeverityBadgeClass = (severity) => {
    switch ((severity || "").toLowerCase()) {
      case "high":
        return "badge red";
      case "medium":
        return "badge yellow";
      case "low":
        return "badge green";
      default:
        return "badge gray";
    }
  };

  const filteredData = sensorData.filter((item) =>
    item.community.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-insights-container">
      <AdminNavbar />
      <h2 className="page-title"> Admin Community Insights</h2>
      <p className="description">
        Click on a community card to view the most recent alerts and suggested
        actions.
      </p>

      <input
        className="search-bar"
        type="text"
        placeholder="🔍 Search community..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="card-grid">
        {filteredData.map((item) => (
          <div
            key={item.community}
            className="community-card"
            onClick={() => handleCommunityClick(item.community)}
          >
            <h3>{item.community}</h3>
            <p>
              <strong>Last Alert:</strong>{" "}
              {item.recommended_action || "No alerts"}
            </p>
            <p>
              <strong>Severity:</strong>{" "}
              <span className={getSeverityBadgeClass(item.severity)}>
                {item.severity || "N/A"}
              </span>
            </p>
            <p>
              <strong>Updated:</strong>{" "}
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {selectedCommunity && (
        <div className="details-drawer">
          <button
            className="close-btn"
            onClick={() => setSelectedCommunity(null)}
          >
            ✕
          </button>
          <h3>📌 {selectedCommunity.community} - Overview</h3>
          <p>
            <strong>Leak Status:</strong> {selectedCommunity.leak_status}
          </p>
          <p>
            <strong>Humidity:</strong> {selectedCommunity.humidity}%
          </p>
          <p>
            <strong>Crack Width:</strong> {selectedCommunity.crack_width} mm
          </p>
          <p>
            <strong>Severity:</strong>{" "}
            <span className={getSeverityBadgeClass(selectedCommunity.severity)}>
              {selectedCommunity.severity}
            </span>
          </p>
          <p>
            <strong>Recommended Action:</strong>{" "}
            {selectedCommunity.recommended_action}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(selectedCommunity.timestamp).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
