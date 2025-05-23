import React, { useState } from "react";
import Modal from "../../modalView/Modal";
import { deleteUser } from "../../services/apiFacade";
import { useNavigate } from "react-router-dom";


const AdminDeleteUserModal = ({ show, onClose, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      await deleteUser(user.id);
      alert("Bruger slettet!");
      onClose();
      window.location.reload();
    } catch (error) {
      alert("Der skete en fejl: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    console.log("Rendering modal content with user:", user);
    return (
      <div className="delete-user-confirm">
        <p>Er du sikker på, at du vil slette denne bruger?</p>
        <p>Brugernavn: <strong>{user?.firstName || "Ingen bruger valgt"}</strong></p>
        <p>User ID: <strong>{user?.id || "Ingen ID"}</strong></p>
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
    onClose={!isLoading ? onClose : () => {}}
    title="Slet Bruger"
    footer={renderFooter()}
  >
    {renderContent()}
  </Modal>
  );

}

export default AdminDeleteUserModal;