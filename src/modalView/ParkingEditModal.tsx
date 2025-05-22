import React, { useState, useEffect } from "react";
import Modal from "./modal";
import { editParking, getParea } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";

const ParkingEditModal = ({ show, onClose, parking, actionType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [areas, setAreas] = useState([]);
  const [editedParking, setEditedParking] = useState({
    id: null,
    parea: { id: null, areaName: "" },
    plateNumber: "",
    startTime: "",
    endTime: "",
    userId: null
  });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadAreas = async () => {
      try {
        const areaData = await getParea();
        setAreas(areaData);
      } catch (error) {
        console.error("Error loading parking areas:", error);
      }
    };
    
    loadAreas();
  }, []);
  
  useEffect(() => {
    if (parking) {
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
      };
      
      setEditedParking({
        id: parking.id,
        parea: parking.parea || { id: null, areaName: "" },
        plateNumber: parking.plateNumber || "",
        startTime: formatDate(parking.startTime),
        endTime: formatDate(parking.endTime),
        userId: parking.userId
      });
    }
  }, [parking]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "parea") {
      const selectedArea = areas.find(area => area.id === parseInt(value));
      setEditedParking(prev => ({
        ...prev,
        parea: selectedArea || { id: parseInt(value), areaName: "" }
      }));
    } else {
      setEditedParking(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSave = async () => {
    if (!editedParking.id) return;
    
    setIsLoading(true);
    
    try {
      await editParking(editedParking);
      alert("Parkering opdateret!");
      window.location.reload();
      onClose();
    } catch (error) {
      alert("Der skete en fejl: " + error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderContent = () => {
    return (
      <div className="edit-parking-form">
        <div className="form-group">
          <label>Parkeringsområde:</label>
          <select 
            name="parea"
            value={editedParking.parea?.id || ""}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">-- Vælg område --</option>
            {areas.map(area => (
              <option key={area.id} value={area.id}>
                {area.areaName} ({area.city}, {area.postalCode})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Nummerplade:</label>
          <input 
            type="text"
            name="plateNumber"
            value={editedParking.plateNumber}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label>Starttidspunkt:</label>
          <input 
            type="datetime-local"
            name="startTime"
            value={editedParking.startTime}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label>Sluttidspunkt:</label>
          <input 
            type="datetime-local"
            name="endTime"
            value={editedParking.endTime}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
      </div>
    );
  };
  
  const renderFooter = () => {
    return (
      <>
        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="modal-button"
        >
          {isLoading ? "Arbejder..." : "Gem ændringer"}
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
      title="Ændre parkering"
      footer={renderFooter()}
    >
      {renderContent()}
    </Modal>
  );
};

export default ParkingEditModal;
