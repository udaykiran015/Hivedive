// src/pages/EngineerTechnicalDetails.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EngineerNavbar from "../components/EngineerNavbar";
import "../styles/EngineerTechnicalDetails.css";

export default function EngineerTechnicalDetails() {
  const [allData, setAllData] = useState([]);
  const [latestCommunityData, setLatestCommunityData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://0cb4cxszyf.execute-api.eu-north-1.amazonaws.com/engineer-data"
    )
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);

        const communityMap = {};
        data.forEach((item) => {
          const { community, timestamp } = item;
          if (
            community &&
            (!communityMap[community] ||
              new Date(timestamp) > new Date(communityMap[community].timestamp))
          ) {
            communityMap[community] = item;
          }
        });

        const fullList = [];
        for (let i = 1; i <= 20; i++) {
          const name = `QL${i}`;
          if (communityMap[name]) {
            fullList.push(communityMap[name]);
          } else {
            fullList.push({
              community: name,
              ai_alert: "No data available",
              ai_severity: "N/A",
              crack_width: null,
              humidity: null,
            });
          }
        }

        setLatestCommunityData(fullList);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSelect = (communityName) => {
    const building = latestCommunityData.find(
      (b) => b.community === communityName
    );
    const data = allData.filter((d) => d.community === communityName);

    if (!building) return;

    navigate(`/technical-details/${communityName}`, {
      state: {
        building,
        data,
      },
    });
  };

  return (
    <div className="technical-container">
      <EngineerNavbar />
      <h2 className="tech-title"> Community Technical Overview</h2>

      <div className="community-grid">
        {latestCommunityData.map((item, index) => (
          <div
            key={index}
            className="community-card"
            onClick={() => handleSelect(item.community)}
          >
            <h3>{item.community}</h3>
            <p>
              Severity: <strong>{item.ai_severity}</strong>
            </p>
            <p>
              Alert: <em>{item.ai_alert}</em>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
