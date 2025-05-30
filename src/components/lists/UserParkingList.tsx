import React, { useState } from "react";
import type { Parking } from "../../services/apiFacade";
import ParkingInfoModal from "../../modalView/ParkinginfoModal";
import ParkingDeleteModal from "../../modalView/ParkingDeleteModal";
import ParkingCard from "../partials/ParkingCard";
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
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    parking: null as ExtendedParking | null
  });
  const navigate = useNavigate();

  const openModal = (parkingId: number) => {
    setActiveModal(parkingId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const openDeleteModal = (parking: ExtendedParking) => {
    setDeleteModal({ show: true, parking });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, parking: null });
  };

  const activeParkingArea = activeModal !== null
    ? parkings.find(p => p.id === activeModal)?.parea
    : undefined;

  return (
    <div className="parking-app">
      <nav className="app-nav">
        <div className="nav-content">
          <div className="logo-container">
            <img
              src="https://i.ibb.co/5X0tBbJV/Chat-GPT-Image-Apr-28-2025-01-54-15-PM.png"
              alt="AM Parking Logo"
              className="logo-image"
            />
            <span className="logo-text-parking">PARKING</span>
          </div>
        </div>
      </nav>

      <div className="parking-container">
        {loading && <p className="loading">Indlæser dine parkeringer...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && parkings.length === 0 && (
          <p className="empty">Du har ingen aktive parkeringer.</p>
        )}

        {!loading && parkings.length > 0 && (
          <div className="parking-list">
            {parkings.map((parking) => (
              <ParkingCard
                key={parking.id}
                parking={parking}
                onInfoClick={() => openModal(parking.id)}
                onDelete={() => openDeleteModal(parking)}
              />
            ))}
          </div>
        )}
      </div>

      <ParkingInfoModal
        show={activeModal !== null}
        onClose={closeModal}
        parkingArea={activeParkingArea}
      />

      <ParkingDeleteModal
        show={deleteModal.show}
        onClose={closeDeleteModal}
        parking={deleteModal.parking}
      />

      <div className="add-button">
        <span onClick={() => navigate("/create-parking")} className="add-icon">
          +
        </span>
      </div>
    </div>
  );
};

export default UserParkingList;
