import React, { useState } from "react";
import Modal from "../../modalView/modal";
import { deleteParking } from "../../services/apiFacade";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import DeleteAnimation from "../../components/animationer/DeleteAnimation.json";


const AdminDeleteUserParkingModal = ({ show, onClose, parking }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!parking) return;
    setIsLoading(true);

    try {
      await deleteParking(parking.id);
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
          <p className="delete-success-message">Parkering slettet!</p>
        </div>
      );

    }
    return (
      <div className="delete-parking-confirm">
        <p>Er du sikker på, at du vil slette denne parkering?</p>
        <p>Parkering ID: <strong>{parking?.id}</strong></p>
        <p>Bil: <strong>{parking?.plateNumber}</strong></p>
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
            {isLoading ? "Arbejder..." : "Slet Parkering"}
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
      title={showSuccessAnimation ? "Parkering slettet" : "Slet Parkering"}
      footer={renderFooter()}
    >
      {renderContent()}
    </Modal>
  );
}
export default AdminDeleteUserParkingModal;
    