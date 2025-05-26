import React, { useState } from "react";
import Modal from "./Modal";
import { deleteCar } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import DeleteAnimation from "../components/animationer/DeleteAnimation.json";
import "./ParkingDeleteModal.css"; 



const CarsDeleteModal = ({ show, onClose, car }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const navigate = useNavigate();
    
    const handleDelete = async () => {
        if (!car) return;
        setIsLoading(true);
    
        try {
        await deleteCar(car.id);
        setShowSuccessAnimation(true);

        setShowSuccessAnimation(true);
        setTimeout(() => {
            setShowSuccessAnimation(false);
            onClose();
            window.location.reload();
        }, 3000);

        } catch (error) {
        alert("Der skete en fejl: " + error);
        } finally {
        setIsLoading(false);
        }
    };
    
    const renderContent = () => {
        if (showSuccessAnimation) {
            return (
                <div className="delete-animation-container">
                    <Lottie 
                        animationData={DeleteAnimation} 
                        loop={false} 
                        autoplay={true}
                    />
                    <p className="delete-success-message">Bil slettet!</p>
                </div>
            );
        }
        
        return (
            <div className="delete-car-confirm">
                <p>Er du sikker på, at du vil slette denne bil?</p>
                <p>Registreringsnummer: <strong>{car?.plateNumber || car?.licensePlate}</strong></p>
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
        onClose={!isLoading && !showSuccessAnimation ? onClose : () => {}}
        title={showSuccessAnimation ? "Bil slettet" : "Slet Bil"}
        footer={renderFooter()}
      >
        {renderContent()}
      </Modal>
   
    );
}
export default CarsDeleteModal;