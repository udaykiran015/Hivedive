import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EngineerNavbar from "../components/EngineerNavbar";
import "../styles/EngineerMaintenanceDetails.css";

// Fake names & contacts for fallback
const fakeOwners = [
  { name: "Aarav Sharma", phone: "9876543210" },
  { name: "Priya Verma", phone: "9822334455" },
  { name: "Rohan Mehta", phone: "9845678912" },
  { name: "Ishita Reddy", phone: "9812345678" },
  { name: "Aditya Nair", phone: "9798765432" },
];

function getRandomOwner() {
  return fakeOwners[Math.floor(Math.random() * fakeOwners.length)];
}

export default function EngineerMaintenanceDetails() {
  const { communityId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [building, setBuilding] = useState(location.state?.building || null);
  const [loading, setLoading] = useState(!location.state?.building);

  useEffect(() => {
    if (!building) {
      fetch(
        "https://0cb4cxszyf.execute-api.eu-north-1.amazonaws.com/engineer-data"
      )
        .then((res) => res.json())
        .then((data) => {
          const match = data.find((d) => d.community === communityId);
          if (match) {
            const owner = getRandomOwner();
            setBuilding({
              ...match,
              owner_name: owner.name,
              owner_contact: owner.phone,
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching building data:", err);
          setLoading(false);
        });
    }
  }, [building, communityId]);

  if (loading || !building) {
    return (
      <div className="maintenance-detail-container">
        <EngineerNavbar />
        <div className="content-wrapper">
          <h2>Loading building details...</h2>
          <button className="back-button" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>
        </div>
      </div>
    );
  }

  const emergency =
    building.ai_severity === "High" ||
    building.ai_alert?.toLowerCase().includes("critical");

  return (
    <div className="maintenance-detail-container">
      <EngineerNavbar />
      <div className="content-wrapper">
        <button className="back-button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>

        <h2 className="detail-title">
          Maintenance Detail - {building.community}
        </h2>

        <div className="info-box">
          <h3>👤 Owner Information</h3>
          <p>
            <strong>Name:</strong> {building.owner_name}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href={`tel:${building.owner_contact}`}>
              {building.owner_contact}
            </a>
          </p>
        </div>

        <div className="info-box">
          <h3>📣 Current Status</h3>
          <p>
            <strong>Severity:</strong> {building.ai_severity}
          </p>
          <p>
            <strong>Alert:</strong> {building.ai_alert}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(building.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="info-box">
          <h3>🛠 Recommended Actions</h3>
          <ul>
            <li>
              {building.crack_width > 2
                ? "🧱 Crack width high — Schedule structural inspection"
                : "✅ Crack width within range — Monitor weekly"}
            </li>
            <li>
              {building.humidity > 70
                ? "💧 High humidity — Check waterproofing or ventilation"
                : "✅ Humidity levels acceptable"}
            </li>
            <li>📋 Notify owner & log report in maintenance portal</li>
          </ul>
        </div>

        {emergency && (
          <div className="emergency-box">
            <h3>🚨 Emergency Protocol</h3>
            <p>
              This building has <strong>critical structural risks</strong>.
              Please take immediate action.
            </p>
            <button
              className="emergency-button"
              onClick={() =>
                window.open(`tel:${building.owner_contact}`, "_self")
              }
            >
              📞 Call Owner
            </button>
            <button
              className="emergency-button email"
              onClick={() =>
                alert("🚨 Emergency alert sent to the city response team.")
              }
            >
              📧 Notify Emergency Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
