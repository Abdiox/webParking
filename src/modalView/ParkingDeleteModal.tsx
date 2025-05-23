import React, { useState } from "react";
import Modal from "./modal";
import type { Parking } from "../services/apiFacade";
import { deleteParking } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";

const ParkingDeleteModal = ({ show, onClose, parking }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!parking) return;
    setIsLoading(true);
    
    try {
      await deleteParking(parking.id);
      alert("Parkering slettet!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting parking:", error);
      alert("Der skete en fejl: " + (error.message || error));
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderContent = () => {
    return (
      <div className="delete-parking-confirm">
        <p>Er du sikker på, at du vil slette denne parkering?</p>
        <p>Registreringsnummer: <strong>{parking?.plateNumber || parking?.licensePlate}</strong></p>
        <p>Dette kan ikke fortrydes.</p>
      </div>
    );
  };
  
  const renderFooter = () => {
    return (
      <>
        <button 
          onClick={handleDelete}
          disabled={isLoading}
          className="modal-button delete"
        >
          {isLoading ? "Arbejder..." : "Slet parkering"}
        </button>
        <button 
          onClick={onClose}
          disabled={isLoading}
          className="modal-button cancel"
        >
          Annuller
        </button>
      </>
    );
  };
  
  return (
    <Modal
      show={show}
      onClose={!isLoading ? onClose : () => {}}
      title="Slet parkering"
      footer={renderFooter()}
    >
      {renderContent()}
    </Modal>
  );
};

export default ParkingDeleteModal;