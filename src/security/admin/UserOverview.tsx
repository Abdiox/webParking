import React from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers"
import "./UsersOverview.css"; 

const UserOverview: React.FC = () => {
  const navigate = useNavigate();
  const { users, loading, error } = useUsers();

  if (loading) return <p className="loading-message">Indlæser brugere …</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!users) return null;

  return (
    <div className="user-overview-container">
      <h1 className="user-overview-header">Brugeroversigt</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Lejemål</th>
            <th>Fornavn</th>
            <th>Efternavn</th>
            <th>Email</th>
            <th>Telefonnummer</th>
            <th>Adresse</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.rentalUnit}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.adress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserOverview;