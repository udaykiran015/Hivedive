import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EngineerNavbar from "../components/EngineerNavbar";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "../styles/EngineerCommunityDetails.css";

export default function EngineerCommunityDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { building, data } = location.state || {};

  if (!building) {
    return (
      <div className="community-details-container">
        <EngineerNavbar />
        <div className="content-wrapper">
          <h2>No building data available</h2>
          <button className="back-button" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="community-details-container">
      <EngineerNavbar />
      <div className="content-wrapper">
        <button className="back-button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>

        <h2 className="details-title">
          {building.community} - Technical Details
        </h2>

        <div className="details-box">
          <h3>🔧 Sensor Summary</h3>
          <p>
            Crack Width:{" "}
            <strong>
              {building.crack_width !== null
                ? `${building.crack_width} mm`
                : "N/A"}
            </strong>
          </p>
          <p>
            Humidity:{" "}
            <strong>
              {building.humidity !== null ? `${building.humidity} %` : "N/A"}
            </strong>
          </p>
        </div>

        <div className="details-box">
          <h3>📣 AI Analysis</h3>
          <p>
            Severity: <strong>{building.ai_severity}</strong>
          </p>
          <p>
            Alert: <em>{building.ai_alert}</em>
          </p>
        </div>

        {data && data.length > 0 ? (
          <div className="chart-wrapper">
            <h3>📊 Crack Width & Humidity Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCrack" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d32f2f" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#d32f2f" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorHumidity"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#0288d1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0288d1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="crack_width"
                  stroke="#d32f2f"
                  fillOpacity={1}
                  fill="url(#colorCrack)"
                  name="Crack Width (mm)"
                />
                <Area
                  type="monotone"
                  dataKey="humidity"
                  stroke="#0288d1"
                  fillOpacity={1}
                  fill="url(#colorHumidity)"
                  name="Humidity (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="details-box">
            <p>No historical sensor data available for this building.</p>
          </div>
        )}
      </div>
    </div>
  );
}
