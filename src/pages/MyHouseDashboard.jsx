// src/pages/MyHouseDashboard.js
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/MyHouseDashboard.css";

import bedroomImg from "../assets/rooms/bedroom.jpg";
import kitchenImg from "../assets/rooms/kitchen.jpg";
import bathroomImg from "../assets/rooms/bathroom.jpg";
import livingroomImg from "../assets/rooms/livingroom.jpg";
import balconyImg from "../assets/rooms/balcony.jpg";
//import storeImg from "../assets/rooms/store.jpg";

export default function MyHouseDashboard() {
  const [searchParams] = useSearchParams();
  const flat = searchParams.get("flat") || "Flat A1";
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    fetch("https://tespzukiia.execute-api.eu-north-1.amazonaws.com/")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((entry) => entry.flat === flat);
        setAlerts(filtered);
      });
  }, [flat]);

  const rooms = [
    { name: "Bedroom", location: "Bedroom Wall", image: bedroomImg },
    { name: "Kitchen", location: "Kitchen Ceiling", image: kitchenImg },
    { name: "Bathroom", location: "Bathroom Sink", image: bathroomImg },
    {
      name: "Living Room",
      location: "Living Room Window",
      image: livingroomImg,
    },
    { name: "Balcony", location: "Balcony Floor", image: balconyImg },
    // { name: "Store Room", location: "Store Room Wall", image: storeImg },
  ];

  const handleImageClick = (location) => {
    const roomAlerts = alerts.filter((a) => a.location === location);
    if (roomAlerts.length > 0) {
      setSelectedAlert(roomAlerts[0]);
    }
  };

  const closeModal = () => {
    setSelectedAlert(null);
  };

  return (
    <div className="house-container">
      <Navbar />
      <h1 className="house-title">My Home - {flat}</h1>
      <div className="room-grid">
        {rooms.map((room, index) => {
          const alert = alerts.find((a) => a.location === room.location);
          return (
            <div
              key={index}
              className="room-card"
              onClick={() => handleImageClick(room.location)}
            >
              {alert && <div className="floating-alert-icon">🚨</div>}
              <img src={room.image} alt={room.name} className="room-image" />
              <h2>{room.name}</h2>
              {alert ? (
                <div className="status-alert">⚠️ Alert: {alert.problem}</div>
              ) : (
                <div className="status-ok">✅ No Issues</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Alert Modal */}
      {selectedAlert && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
            <h2>🚨 {selectedAlert.location}</h2>
            <p>
              <strong>Problem:</strong> {selectedAlert.problem}
            </p>
            <p>
              <strong>Severity:</strong> {selectedAlert.severity}
            </p>
            <p>
              <strong>Prediction:</strong> {selectedAlert.prediction}
            </p>
            <p>
              <strong>Suggested Action:</strong> {selectedAlert.action}
            </p>
            <p>
              <strong>Contact:</strong>{" "}
              <a href={`tel:${selectedAlert.contact}`}>
                {selectedAlert.contact}
              </a>
            </p>

            <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
              🛠️ Call Civil Engineer: Available Now
            </p>

            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.9755163214413!2d80.21920961482258!3d12.971598590857167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52678fbca3c079%3A0x3f23e28e642a4df3!2sPlumber%20Nearby!5e0!3m2!1sen!2sin!4v1688495722743"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Service Location"
              ></iframe>
            </div>

            <button className="close-button" onClick={closeModal}>
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
