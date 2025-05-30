import React from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers"
import type { UserDetails } from "../../services/apiFacade";
import AdminDeleteUserModal from "./AdminDeleteUserModal";
import FilterComponent from "../../components/partials/FilterComponent";
import SortComponent from "../../components/partials/SortComponent";
import "./UsersOverview.css"; 

const UserOverview: React.FC = () => {
  const navigate = useNavigate();
  const { users, loading, error } = useUsers();
  const [selectedUser, setSelectedUser] = React.useState<UserDetails | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [filteredUsers, setFilteredUsers] = React.useState<UserDetails[]>([]);
  const [filters, setFilters] = React.useState({ role: "", searchTerm: "" });
  const [sortConfig, setSortConfig] = React.useState({ key: "firstName", direction: "ascending" });
  
  React.useEffect(() => {
    if (users) {
      let result = [...users];
      
      if (filters.role) {
        result = result.filter(user => user.role === filters.role);
      }
      
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        result = result.filter(user => 
          user.firstName.toLowerCase().includes(searchLower) || 
          user.lastName.toLowerCase().includes(searchLower) || 
          user.email.toLowerCase().includes(searchLower)  ||
          user.rentalUnit.toString().toLowerCase().includes(searchLower)


        );
      }
      
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      
      setFilteredUsers(result);
    }
  }, [users, filters, sortConfig]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };
  
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
      
      <div className="controls-container">
        <FilterComponent onFilterChange={handleFilterChange} />
        <SortComponent onSortChange={handleSortChange} />
      </div>
      
      <table className="user-table">
        <thead>
          <tr>
            <th>Lejemål</th>
            <th>Fornavn</th>
            <th>Efternavn</th>
            <th>Email</th>
            <th>Rolle</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.rentalUnit}</td>
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