import { useState } from "react";
import Modal from "./Modal";
import { deleteCar } from "../services/apiFacade";
import Lottie from "lottie-react";
import DeleteAnimation from "../components/animationer/DeleteAnimation.json";
import "./ParkingDeleteModal.css"; 

const CarsDeleteModal = ({ show, onClose, car, onDelete }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    
    const handleDelete = async () => {
        if (!car) return;
        setIsLoading(true);
    
        try {
            await deleteCar(car.id);
            setShowSuccessAnimation(true);
            
            setTimeout(() => {
                setShowSuccessAnimation(false);
                if (onDelete) {
                    onDelete();
                }
            }, 3000);
        } catch (error) {
            console.error("Error deleting car:", error);
            alert("Der skete en fejl: " + error);
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
                <p>Registreringsnummer: <strong>{car?.registrationNumber}</strong></p>
                <p>Dette kan ikke fortrydes.</p>
            </div>
        );
    };
    
    const renderFooter = () => {
        if (showSuccessAnimation) {
            return null; // Don't show buttons during animation
        }
        
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
