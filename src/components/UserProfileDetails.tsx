import React from "react";
import type { UserDetails } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";
import UserEditModal from "../modalView/UserEditModal";
import { editUser } from "../services/apiFacade";
import './UserProfileDetails.css'

interface Props {
  user: UserDetails;
}

const UserProfileDetails: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const [editModal, setEditModal] = React.useState({
    show: false,
    user: null as UserDetails | null,
  });

  const openEditModal = (user: UserDetails) => {
    setEditModal({
      show: true,
      user: user,
    });
  };

  const closeEditModal = () => {
    setEditModal({
      show: false,
      user: null,
    });
  };

  const handleEdit = async (editedUser: UserDetails) => {
    if (!editedUser) return;

    try {
      await editUser(editedUser);
      alert("Brugeroplysninger opdateret!");
      window.location.reload();
      navigate("/my-profile");
      closeEditModal();
    } catch (error) {
      alert("Der skete en fejl: " + error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Brugeroplysninger</h2>

        <div className="profile-row">
          <span className="label">Lejemåls ID:</span>
          <span>{user.rentalUnit}</span>
        </div>

        <div className="profile-row">
          <span className="label">Fornavn:</span>
          <span>{user.firstName}</span>
        </div>

        <div className="profile-row">
          <span className="label">Efternavn:</span>
          <span>{user.lastName}</span>
        </div>
        
        <div className="profile-row">
          <span className="label">Email:</span>
          <span>{user.email}</span>
        </div>
        
        <div className="profile-row">
          <span className="label">Telefon:</span>
          <span>{user.phoneNumber}</span>
        </div>
        
        <div className="profile-row">
          <span className="label">Adresse:</span>
          <span>
            {user.address}, {user.city} {user.zipCode}
          </span>
        </div>
      </div>

      <div className="profile-actions">
        <button className="edit-button" onClick={() => openEditModal(user)}>
          Rediger
        </button>
      </div>
      
      <UserEditModal
        show={editModal.show}
        onClose={closeEditModal}
        user={editModal.user}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default UserProfileDetails;