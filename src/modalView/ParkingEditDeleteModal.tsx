import React, { useState } from "react";
import Modal from "./Modal";
import { editParking, deleteParking } from "../services/apiFacade";

// Simpel modal til redigering eller sletning af en parkering
const ParkingEditDeleteModal = ({ show, onClose, parking, actionType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [extendDays, setExtendDays] = useState(1);
  
  const handleEdit = async () => {
    if (!parking) return;
    setIsLoading(true);
    
    try {
      await editParking(parking.id, { extensionDays: extendDays });
      alert("Parkering forlænget!");
      onClose();
    } catch (error) {
      alert("Der skete en fejl: " + error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!parking) return;
    setIsLoading(true);
    
    try {
      await deleteParking(parking.id);
      alert("Parkering slettet!");
      onClose();
    } catch (error) {
      alert("Der skete en fejl: " + error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Bestem indhold baseret på handling
  const renderContent = () => {
    if (actionType === "edit") {
      return (
        <div>
          <p>Forlæng parkering for: {parking?.plateNumber || parking?.licensePlate}</p>
          <div>
            <label>Antal dage:</label>
            <select 
              value={extendDays} 
              onChange={(e) => setExtendDays(Number(e.target.value))}
              disabled={isLoading}
            >
              {[1, 2, 3, 5, 7, 14, 30].map(days => (
                <option key={days} value={days}>{days} {days === 1 ? 'dag' : 'dage'}</option>
              ))}
            </select>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>Er du sikker på, at du vil slette denne parkering?</p>
          <p>Registreringsnummer: {parking?.plateNumber || parking?.licensePlate}</p>
        </div>
      );
    }
  };
  
  // Bestem footer-knapper baseret på handling
  const renderFooter = () => {
    return (
      <>
        <button 
          onClick={actionType === "edit" ? handleEdit : handleDelete}
          disabled={isLoading}
          className={`modal-button ${actionType === "delete" ? "delete" : ""}`}
        >
          {isLoading ? "Arbejder..." : actionType === "edit" ? "Forlæng" : "Slet"}
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
      title={actionType === "edit" ? "Forlæng parkering" : "Slet parkering"}
      footer={renderFooter()}
    >
      {renderContent()}
    </Modal>
  );
};

export default ParkingEditDeleteModal;