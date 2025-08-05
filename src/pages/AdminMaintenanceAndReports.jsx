import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/AdminMaintenanceReports.css";

export default function AdminMaintenanceReports() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetch(
      "https://07m3ciyyla.execute-api.eu-north-1.amazonaws.com/community/sensor"
    )
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching maintenance data:", err));
  }, []);

  const filteredData = data
    .filter((item) => {
      const severityMatch = filter === "All" || item.severity === filter;
      const searchMatch = item.community
        .toLowerCase()
        .includes(search.toLowerCase());
      return severityMatch && searchMatch;
    })
    .sort((a, b) => {
      const priority = { High: 1, Moderate: 2, Low: 3 };
      return priority[a.severity] - priority[b.severity];
    });

  const fakeOwners = [
    {
      name: "Mr. Ramesh",
      phone: "+91 98765 43210",
      email: "ramesh@example.com",
    },
    { name: "Ms. Kavya", phone: "+91 99887 76654", email: "kavya@example.com" },
    { name: "Mr. Arjun", phone: "+91 90123 45678", email: "arjun@example.com" },
    { name: "Ms. Diya", phone: "+91 91234 56789", email: "diya@example.com" },
    { name: "Mr. Vivek", phone: "+91 98700 12345", email: "vivek@example.com" },
    { name: "Ms. Sneha", phone: "+91 93456 78901", email: "sneha@example.com" },
  ];

  const downloadReport = () => {
    const content = filteredData
      .map((item, index) => {
        const owner = fakeOwners[index % fakeOwners.length];
        return (
          `Community: ${item.community}\n` +
          `Alert: ${item.recommended_action}\n` +
          `Severity: ${item.severity}\n` +
          `Owner: ${owner.name}\n` +
          `Contact: ${owner.phone}\n` +
          `Timestamp: ${new Date(item.timestamp).toLocaleString()}\n` +
          `------------------------\n`
        );
      })
      .join("");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "maintenance_report.txt";
    a.click();
  };

  const selectedItem =
    selectedCard !== null ? filteredData[selectedCard] : null;
  const selectedOwner =
    selectedCard !== null ? fakeOwners[selectedCard % fakeOwners.length] : null;

  return (
    <div className="admin-maintenance-container">
      <AdminNavbar />
      <div className="maintenance-content">
        <h2> Admin Maintenance Overview</h2>
        <p>Track real-time maintenance alerts and engineer-reported issues.</p>

        <div className="filters">
          <input
            type="text"
            placeholder="Search community..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Severities</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
          <button className="download-btn" onClick={downloadReport}>
            ⬇️ Download Report
          </button>
        </div>

        {selectedItem && (
          <div className="floating-detail-tab glassy-glow">
            <h3>🚨 Report Detail</h3>
            <p>
              <strong>Community:</strong> {selectedItem.community}
            </p>
            <p>
              <strong>Owner:</strong> {selectedOwner.name}
            </p>
            <p>
              <strong>Contact:</strong> {selectedOwner.phone}
            </p>
            <p>
              <strong>Email:</strong> {selectedOwner.email}
            </p>
            <p>
              <strong>Recommended Action:</strong>{" "}
              {selectedItem.recommended_action || "N/A"}
            </p>
            <p>
              <strong>AI Suggestion:</strong>{" "}
              {selectedItem.severity === "High"
                ? "🚨 Urgently deploy maintenance team"
                : selectedItem.severity === "Moderate"
                ? "🕒 Schedule inspection in 24 hrs"
                : "✅ Routine check"}
            </p>
            <div className="action-buttons">
              <button
                onClick={() => alert(`📞 Calling ${selectedOwner.name}...`)}
              >
                📞 Call
              </button>
              <button
                onClick={() =>
                  alert(`✉️ Message sent to ${selectedOwner.name}`)
                }
              >
                📨 Message
              </button>
              <button
                onClick={() => alert(`📧 Email sent to ${selectedOwner.email}`)}
              >
                📧 Mail
              </button>
            </div>
          </div>
        )}

        <div className="report-grid">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className={`report-card severity-${item.severity?.toLowerCase()}`}
              onClick={() => setSelectedCard(index)}
            >
              <h3>{item.community}</h3>
              <p>
                <strong>Alert:</strong> {item.recommended_action || "N/A"}
              </p>
              <p>
                <strong>Severity:</strong>
                <span className={`badge severity-${item.severity}`}>
                  {item.severity}
                  {item.severity === "High" && (
                    <span className="alert-label"> 🚨 ALERT</span>
                  )}
                </span>
              </p>
              <p>
                <strong>Leak:</strong> {item.leak_status}
              </p>
              <p>
                <strong>Humidity:</strong> {item.humidity}%
              </p>
              <p>
                <strong>Crack Width:</strong> {item.crack_width} mm
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
          {filteredData.length === 0 && (
            <p>No results found for selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
