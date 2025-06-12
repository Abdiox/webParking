import { useState } from "react";
import Modal from "../../modalView/Modal";
import { deleteUser } from "../../services/apiFacade";
import Lottie from "lottie-react";
import DeleteAnimation from "../../components/animationer/DeleteAnimation.json";

const AdminDeleteUserModal = ({ show, onClose, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleDelete = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      await deleteUser(user.id);
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
        <p className="delete-success-message">Bruger slettet!</p>
      </div>
    );

  }

    return (
      <div className="delete-user-confirm">
        <p>Er du sikker på, at du vil slette denne bruger?</p>
        <p>Navn: <strong>{user?.firstName} {user?.lastName}</strong></p>
        <p>Email: <strong>{user?.email}</strong></p>
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
          {isLoading ? "Arbejder..." : "Slet bruger"}
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
      title={showSuccessAnimation ? "Bruger slettet" : "Slet Bruger"}
      footer={renderFooter()}
    >
      {renderContent()}
    </Modal>
  );

}

export default AdminDeleteUserModal;