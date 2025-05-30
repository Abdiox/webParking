import React from "react";
import { useParkingAreas } from "../../hooks/useParkingAreas";
import { useNavigate } from "react-router-dom";

import "./ParkingAreas.css"; 

export const ParkingAreaList: React.FC = () => {
  const { areas, loading, error } = useParkingAreas();
  const navigate = useNavigate();
  
  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  
  return (
    <div className="parking-container-area">
      <h1 className="parking-title">Parkering områder</h1>
      
      <div className="parking-stats">
        <div className="stat-card">
          <div className="stat-value">{areas.length}</div>
          <div className="stat-label">Tilgængelige områder</div>
        </div>
      </div>
      
      <div className="parking-areas-grid">
        {areas.map((area) => (
          <div key={area.id} className="parking-area-card">
            <div className="parking-area-header">
              <h2 className="parking-area-name">{area.areaName}</h2>
              <div className="parking-area-status">
                <div className="parking-area-indicator"></div>
                <span>Aktiv</span>
              </div>
            </div>
            
            <div className="parking-area-details">
              <div className="detail-row">
                <div className="detail-label">
                  <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Dage tilladt:
                </div>
                <div className="detail-value">{area.daysAllowedParking} dage</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">
                  <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Lokation:
                </div>
                <div className="detail-value">{area.city}, {area.postalCode}</div>
              </div>
            </div>
            
            <div className="parking-area-footer">
            <button className="view-details-btn" onClick={() => navigate(`/create-parking`)}>
              Opret Parkering
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};