import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import "../styles/OwnerDashboard.css";

export default function OwnerDashboard() {
  const [searchParams] = useSearchParams();
  const flat = searchParams.get("flat") || "Flat A1";

  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [problemFilter, setProblemFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  useEffect(() => {
    fetch("https://tespzukiia.execute-api.eu-north-1.amazonaws.com/")
      .then((res) => res.json())
      .then((data) => {
        const flatAlerts = data.filter((item) => item.flat === flat);
        setAlerts(flatAlerts);
        setFilteredAlerts(flatAlerts);
      })
      .catch((err) => console.error("Error fetching alerts:", err));
  }, [flat]);

  const applyFilters = () => {
    const now = Date.now() / 1000;
    let result = alerts;

    if (locationFilter.trim()) {
      result = result.filter((a) =>
        a.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (problemFilter.trim()) {
      result = result.filter((a) =>
        a.problem.toLowerCase().includes(problemFilter.toLowerCase())
      );
    }

    if (timeFilter) {
      const seconds = parseInt(timeFilter) * 3600;
      result = result.filter((a) => now - a.timestamp <= seconds);
    }

    setFilteredAlerts(result);
  };

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h2 className="dashboard-heading"> Owner Insights – {flat}</h2>

        <div className="filters">
          <input
            type="text"
            placeholder=" Location (e.g. Kitchen)"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder=" Problem (e.g. Crack)"
            value={problemFilter}
            onChange={(e) => setProblemFilter(e.target.value)}
          />
          <input
            type="number"
            placeholder=" Last N hours"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          />
          <button onClick={applyFilters} className="filter-btn">
            🎯 Apply Filter
          </button>
        </div>

        <div className="alerts">
          {filteredAlerts.length === 0 ? (
            <p className="no-alerts">🚫 No alerts found for the filters.</p>
          ) : (
            filteredAlerts.map((alert, idx) => (
              <motion.div
                key={idx}
                className={`alert-card severity-${alert.severity.toLowerCase()}`}
                onClick={() => toggleExpand(idx)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <h4>🚨 {alert.problem}</h4>
                <p>
                  <strong>📍 Location:</strong> {alert.location}
                </p>
                <p>
                  <strong>⚠️ Severity:</strong> {alert.severity}
                </p>
                <AnimatePresence>
                  {expandedIndex === idx && (
                    <motion.div
                      className="extra-info"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="horizontal-subcards">
                        <div className="subcard">
                          <h5>🔮 Prediction</h5>
                          <p>{alert.prediction}</p>
                        </div>
                        <div className="subcard">
                          <h5>🛠 Action</h5>
                          <p>{alert.action}</p>
                        </div>
                        <div className="subcard">
                          <h5>📞 Contact</h5>
                          <p>{alert.contact}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
