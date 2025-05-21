import React, { useState } from "react";
import Modal from "../../modalView/modal";
import { deleteParking } from "../../services/apiFacade";
import { useNavigate } from "react-router-dom";



const AdminDeleteUserParkingModal = ({ show, onClose, parking }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!parking) return;
    setIsLoading(true);

    try {
      await deleteParking(parking.id);
      alert("Parkering slettet!");
      onClose();
      navigate("/admin/parkings");
    } catch (error) {
      alert("Der skete en fejl: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    console.log("Rendering modal content with parking:", parking);
    return (
      <div className="delete-parking-confirm">
        <p>Er du sikker på, at du vil slette denne parkering?</p>
        <p>Parkering ID: <strong>{parking?.id || "Ingen parkering valgt"}</strong></p>
        <p>Brugernavn: <strong>{parking?.username || "Ingen bruger valgt"}</strong></p>
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
            onClose={onClose}
            title="Bekræft sletning af parkering"
            content={renderContent()}
            footer={renderFooter()}
        />
    );
}
export default AdminDeleteUserParkingModal;
    