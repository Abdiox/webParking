import React from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers"
import type { UserDetails } from "../../services/apiFacade";
import AdminDeleteUserModal from "./AdminDeleteUserModal";
import "./UsersOverview.css"; 

const UserOverview: React.FC = () => {
  const navigate = useNavigate();
  const { users, loading, error } = useUsers();
  const [selectedUser, setSelectedUser] = React.useState<UserDetails | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  
  
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  }
  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  }

  if (loading) return <p className="loading-message">Indlæser brugere …</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!users) return null;

  return (
    <div className="user-overview-container">
      <h1>Brugeroversigt</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Brugernavn</th>
            <th>Fornavn</th>
            <th>Efternavn</th>
            <th>Email</th>
            <th>Rolle</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="user-delete-button" onClick={() => handleDeleteUser(user)}>Slet bruger</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <AdminDeleteUserModal 
          show={showDeleteModal} 
          onClose={handleCloseModal} 
          user={selectedUser} 
        />
      )}
    </div>
  );
}

export default UserOverview;