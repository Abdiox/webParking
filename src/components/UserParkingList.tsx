import React, { useState } from "react";
import type { Parking } from "../services/apiFacade";
import ParkingInfoModal from "../modalView/ParkinginfoModal";
import ParkingEditModal from "../modalView/ParkingEditModal";
import ParkingDeleteModal from "../modalView/ParkingDeleteModal"; // Fixed import (removed curly braces)
import { useNavigate } from "react-router-dom";
import "./UserParkingList.css";

interface ParkingArea {
  areaName: string;
  city: string;
  daysAllowedParking: number;
  id: number;
  postalCode: number;
}

interface ExtendedParking extends Parking {
  parea?: ParkingArea;
}

interface Props {
  parkings: ExtendedParking[];
  loading: boolean;
  error: string | null;
}

const UserParkingList: React.FC<Props> = ({ parkings, loading, error }) => {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const navigate = useNavigate();
  
  // Fixed state initialization for edit modal
  const [editModal, setEditModal] = useState({
    show: false,
    parking: null as ExtendedParking | null,
    actionType: ""
  });
  
  // New state for delete modal
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    parking: null as ExtendedParking | null
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}, ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const isActive = (endTime: string) => {
    return new Date(endTime) > new Date();
  };

  // Functions for info modal
  const openModal = (parkingId: number) => {
    setActiveModal(parkingId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  
  const openEditModal = (parking: ExtendedParking) => {
    setEditModal({
      show: true,
      parking: parking,
      actionType: "edit"
    });
  };
  
  const closeEditModal = () => {
    setEditModal({
      show: false,
      parking: null,
      actionType: ""
    });
  };
  
  const openDeleteModal = (parking: ExtendedParking) => {
    setDeleteModal({
      show: true,
      parking: parking
    });
  };
  
  const closeDeleteModal = () => {
    setDeleteModal({
      show: false,
      parking: null
    });
  };

  const activeParkingArea = activeModal !== null
    ? parkings.find(p => p.id === activeModal)?.parea
    : undefined;

  return (
    <div className="parking-app">
      {/* Navigation */}
      <nav className="app-nav">
        <div className="nav-content">
          <div className="logo-container">
            <img src="https://i.ibb.co/5X0tBbJV/Chat-GPT-Image-Apr-28-2025-01-54-15-PM.png" alt="AM Parking Logo" className="logo-image" />
            <span className="logo-text-parking">PARKING</span>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="parking-container">
        {loading && <p className="loading">Indlæser dine parkeringer...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && parkings.length === 0 && (
          <p className="empty">Du har ingen aktive parkeringer.</p>
        )}

        {!loading && parkings.length > 0 && (
          <div className="parking-list">
            {parkings.map((parking) => (
              <div className="parking-card" key={parking.id}>
                <div className="parking-header">
                  <div className="parking-logo">
                    <img src="https://i.ibb.co/5X0tBbJV/Chat-GPT-Image-Apr-28-2025-01-54-15-PM.png" alt="AM Parking Logo" className="parking-logo-small" />
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
                      {parking.parea ? `${parking.parea.areaName} - ${parking.parea.city} ${parking.parea.postalCode}` : (parking.zone?.name || "Parkeringsområde ikke angivet")}
                    </p>
                    
                    {parking.parea && (
                      <span 
                        className="settings-icon" 
                        onClick={() => openModal(parking.id)}
                        title="Vis parkeringsområde detaljer"
                      >
                        ⚙️
                      </span>
                    )}
                  </div>
                  <p className="parking-validity">Gyldig t.o.m: {formatDate(parking.endTime)}</p>
                </div>
                
                <div className="parking-actions">
                  <button 
                    className="action-button edit" 
                    onClick={() => openEditModal(parking)}
                  >
                    ÆNDRE
                  </button>
                  <button 
                    className="action-button delete" 
                    onClick={() => openDeleteModal(parking)}
                  >
                    SLET
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <ParkingInfoModal 
        show={activeModal !== null}
        onClose={closeModal}
        parkingArea={activeParkingArea}
      />
      
      <ParkingEditModal
        show={editModal.show}
        onClose={closeEditModal}
        parking={editModal.parking}
        actionType={editModal.actionType}
      />
      
      <ParkingDeleteModal
        show={deleteModal.show}
        onClose={closeDeleteModal}
        parking={deleteModal.parking}
      />

      <div className="add-button">
        <span onClick={() => navigate("/create-parking")} className="add-icon">+</span>
      </div>
    </div>
  );
};

export default UserParkingList;