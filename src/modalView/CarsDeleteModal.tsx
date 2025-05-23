import React, { useState } from "react";
import Modal from "./Modal";
import { deleteCar } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";


const CarsDeleteModal = ({ show, onClose, car }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleDelete = async () => {
        if (!car) return;
        setIsLoading(true);
    
        try {
        await deleteCar(car.id);
        alert("Bil slettet!");
        onClose();
        window.location.reload();
        } catch (error) {
        alert("Der skete en fejl: " + error);
        } finally {
        setIsLoading(false);
        }
    };
    
    const renderContent = () => {
        console.log("Rendering modal content with car:", car);
        return (
        <div className="delete-car-confirm">
            <p>Er du sikker på, at du vil slette denne bil?</p>
            <p>Nummerplade: <strong>{car?.registrationNumber || "Ingen bil valgt"}</strong></p>
            <p>Bil ID: <strong>{car?.id || "Ingen ID"}</strong></p>
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
            {isLoading ? "Arbejder..." : "Slet bil"}
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
        title="Bekræft Sletning"
        footer={renderFooter()}
      >
        {renderContent()}
      </Modal>
    );
}
export default CarsDeleteModal;