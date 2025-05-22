import React from "react";
import { useParkingAreas } from "../../hooks/useParkingAreas";
import "./ParkingAreas.css"; 

export const ParkingAreaList: React.FC = () => {
  const { areas } = useParkingAreas();
  
  return (
    <div className="parking-container">
      <h1 className="parking-title">Parkering områder</h1>
      
      <div className="parking-areas-grid">
        {areas.map((area) => (
          <div key={area.id} className="parking-area-card">
            <div className="parking-area-header">
              <h2 className="parking-area-name">{area.areaName}</h2>
              <div className="parking-area-indicator"></div>
            </div>
            <span className="days-allowed-parking">Dage tilladt parkering: {area.daysAllowedParking}</span>
            <div className="parking-area-details">
              <div className="parking-area-location">
                <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{area.city}, {area.postalCode}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};