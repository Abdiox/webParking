import React from "react";
import ExpirationWarning from "../partials/ExpirationWarning";

import "./ParkingCard.css";

interface ParkingArea {
  areaName: string;
  city: string;
  daysAllowedParking: number;
  id: number;
  postalCode: number;
}

interface Parking {
  id: number;
  plateNumber?: string;
  licensePlate?: string;
  endTime: string;
  parea?: ParkingArea;
  zone?: {
    name: string;
  };
}

interface Props {
  parking: Parking;
  onInfoClick: () => void;
  onDelete: () => void;
}

const ParkingCard: React.FC<Props> = ({ parking, onInfoClick, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}, ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const isActive = (endTime: string) => new Date(endTime) > new Date();

  return (
    <div className="parking-card">
      <div className="parking-header">
        <div className="parking-logo">
          <img
            src="https://i.ibb.co/5X0tBbJV/Chat-GPT-Image-Apr-28-2025-01-54-15-PM.png"
            alt="AM Parking Logo"
            className="parking-logo-small"
          />
        </div>
        <div className="parking-info">
          <h3 className="plate-number">{parking.plateNumber || parking.licensePlate}</h3>
        </div>
        <div className="parking-status">
          <span className={`status-indicator ${isActive(parking.endTime) ? "active" : ""}`}></span>
          <span className="status-text">{isActive(parking.endTime) ? "AKTIV" : "UDLØBET"}</span>
        </div>
      </div>

      <div className="parking-body">
        <div className="parking-location-container">
          <p className="parking-location">
            {parking.parea
              ? `${parking.parea.areaName} - ${parking.parea.city} ${parking.parea.postalCode}`
              : parking.zone?.name || "Parkeringsområde ikke angivet"}
          </p>
          {parking.parea && (
            <span
              className="settings-icon"
              onClick={onInfoClick}
              title="Vis parkeringsområde detaljer"
            >
              ⚙️
            </span>
          )}
        </div>
        <p className="parking-validity">Gyldig t.o.m: {formatDate(parking.endTime)}</p>
        <ExpirationWarning endTime={parking.endTime} />
      </div>

      <div className="parking-actions">
        <button className="action-button delete" onClick={onDelete}>
          SLET
        </button>
      </div>
    </div>
  );
};

export default ParkingCard;
