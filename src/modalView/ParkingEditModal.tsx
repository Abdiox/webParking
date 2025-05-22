import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { editParking, getParea } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";
import { usePAreaValidation } from "../hooks/usePAreaValidation"; 

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
  
  const { daysError, isValid, validateParking } = usePAreaValidation(
    editedParking.parea?.id ? areas.find(area => area.id === editedParking.parea.id) : null
  );
  
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
  
  useEffect(() => {
    if (editedParking.parea?.id && editedParking.startTime && editedParking.endTime && areas.length > 0) {
      const selectedArea = areas.find(area => area.id === editedParking.parea.id);
      if (selectedArea) {
        const parkingForValidation = {
          ...editedParking,
          parea: selectedArea
        };
        validateParking(parkingForValidation);
      }
    }
  }, [editedParking.startTime, editedParking.endTime, editedParking.parea?.id, areas, validateParking]);
  
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

  const getDateLimits = () => {
    const selectedArea = editedParking.parea?.id ? 
      areas.find(area => area.id === editedParking.parea.id) : null;
    
    if (!selectedArea) {
      return { minDate: null, maxDate: null };
    }

    const now = new Date();
    const minDate = now.toISOString().slice(0, 16);
    
    if (editedParking.startTime) {
      const startDate = new Date(editedParking.startTime);
      const maxDate = new Date(startDate.getTime() + (selectedArea.daysAllowedParking * 24 * 60 * 60 * 1000));
      return { 
        minDate, 
        maxDate: maxDate.toISOString().slice(0, 16),
        startMinDate: minDate,
        endMinDate: editedParking.startTime
      };
    }

    return { minDate, maxDate: null, startMinDate: minDate, endMinDate: null };
  };
  
  const handleSave = async () => {
    if (!editedParking.id) return;
    
    if (editedParking.parea?.id && editedParking.startTime && editedParking.endTime) {
      const selectedArea = areas.find(area => area.id === editedParking.parea.id);
      if (selectedArea) {
        const parkingForValidation = {
          ...editedParking,
          parea: selectedArea
        };
        const valid = validateParking(parkingForValidation);
        
        if (!valid) {
          alert("Parkeringsperioden er ikke gyldig. " + (daysError || ""));
          return;
        }
      }
    }
    
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
    const { minDate, maxDate, startMinDate, endMinDate } = getDateLimits();
    
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
                {area.areaName} ({area.city}, {area.postalCode}) - Maks {area.daysAllowedParking} dage
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
            min={startMinDate}
          />
        </div>
        
        <div className="form-group">
          <label>Sluttidspunkt:</label>
          <input 
            type="datetime-local"
            name="endTime"
            value={editedParking.endTime}
            onChange={handleInputChange}
            disabled={isLoading || !editedParking.startTime}
            min={endMinDate}
            max={maxDate}
          />
          {editedParking.parea?.id && areas.find(area => area.id === editedParking.parea.id) && (
            <small style={{color: '#666', fontSize: '0.8em', display: 'block', marginTop: '4px'}}>
              Maksimum {areas.find(area => area.id === editedParking.parea.id)?.daysAllowedParking} dage fra starttidspunkt
            </small>
          )}
        </div>
        
        {daysError && (
          <div className="validation-error" style={{color: 'red', marginTop: '10px'}}>
            {daysError}
          </div>
        )}
      </div>
    );
  };
  
  const renderFooter = () => {
    return (
      <>
        <button 
          onClick={handleSave}
          disabled={isLoading || !isValid}
          className={`modal-button ${!isValid ? 'disabled' : ''}`}
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