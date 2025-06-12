import React from "react";
import { useAllParkings } from "../../hooks/useAllParkings";
import type { Parking } from "../../services/apiFacade";
import AdminDeleteUserParkingModal from "./AdminDeleteUserParkingModal";

import "./AdminParkingOverview.css";


const AdminParkingOverview: React.FC = () => {
    const { parkings, loading, error } = useAllParkings();
    const [selectedParking, setSelectedParking] =React.useState<Parking | null>(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    
    const handleDeleteParking = (parking) => {
        setSelectedParking(parking);
        setShowDeleteModal(true);
    }
    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setSelectedParking(null);
    
    }

    
    
    if (loading) return <p className="loading-message">Indlæser parkeringer …</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!parkings) return null;
    
    return (
        <div className="parking-overview-container">
            <h1>Parkeringer</h1>
            <table className="parking-table">
                <thead>
                    <tr>
                        <th>Parkering ID</th>
                        <th>Navn</th>
                        <th>Starttid</th>
                        <th>Sluttid</th>
                        <th>Handlinger</th>
                    </tr>
                </thead>
                <tbody>
                    {parkings.map((parking) => (
                        
                        <tr key={parking.id}>
                            <td>{parking.id}</td>
                            <td> {parking.userName}</td>
                            <td>{new Date(parking.startTime).toLocaleString()}</td>
                            <td>{new Date(parking.endTime).toLocaleString()}</td>
                            <td>
                                <button className="parking-delete-button" onClick={() => handleDeleteParking(parking)}>Slet parkering</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showDeleteModal && (
                <AdminDeleteUserParkingModal 
                    show={showDeleteModal} 
                    onClose={handleCloseModal} 
                    parking={selectedParking} 
                />
            )}

            
        </div>
    );
};
export default AdminParkingOverview;
        

