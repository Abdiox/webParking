import React, { useState } from "react";
import type { Car } from '../services/apiFacade';
import { useCarLookUp } from "../hooks/useCarLookUp";
import { useAddCar } from "../hooks/useAddCar";
import "./CarForm.css"; 

interface CarFormProps {
  onCarAdded?: (car: Car) => void;
}

const CarForm: React.FC<CarFormProps> = ({ onCarAdded }) => {
  const [plateNumber, setPlateNumber] = useState("");
  const [description, setDescription] = useState("");
  
  const { carDetails, isLoading, error: lookupError, lookupCar, resetCarDetails } = useCarLookUp();
  const { saveCar, isAdding, error: saveError, success, resetState } = useAddCar();

  const handlePlateNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlateNumber(e.target.value.toUpperCase());
    if (carDetails) {
      resetCarDetails();
    }
    resetState();
  };

  const handleLookupCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (plateNumber.length < 2) return;
    
    await lookupCar(plateNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!carDetails) return;
    
    try {
      const newCar: Car = {
        id: null,
        registrationNumber: plateNumber,
        make: carDetails.make || "",
        model: carDetails.model || "",
        modelYear: carDetails.modelYear || 0,
        color: carDetails.color || "",
        type: carDetails.type || "",
        total_weight: carDetails.total_weight,
        description: description,
        userId: Number(localStorage.getItem("userId")) || null
      };
      
      const savedCar = await saveCar(newCar);
      
      if (savedCar && onCarAdded) {
        onCarAdded(savedCar);
      }
      
      if (success) {
        setPlateNumber("");
        setDescription("");
        resetCarDetails();
        
        setTimeout(() => {
          resetState();
        }, 3000);
      }
      
    } catch (error) {
      console.error("Fejl i formular:", error);
    }
  };

  return (
    <div className="car-form-container">
      <h2>Tilføj Bil</h2>
      
      <form onSubmit={handleLookupCar} className="car-lookup-form">
        <div className="form-group">
          <label htmlFor="plateNumber">Nummerplade:</label>
          <div className="plate-input-container">
            <input
              id="plateNumber"
              type="text"
              value={plateNumber}
              onChange={handlePlateNumberChange}
              placeholder="Indtast nummerplade"
              minLength={2}
              required
            />
            <button 
              type="submit" 
              className="lookup-button"
              disabled={isLoading || plateNumber.length < 2}
            >
              {isLoading ? "Søger..." : "Find bil"}
            </button>
          </div>
          {lookupError && <p className="error-message">{lookupError}</p>}
        </div>
      </form>
      
      {carDetails && (
        <form onSubmit={handleSubmit} className="car-save-form">
          <div className="car-details">
            <h3>Biloplysninger</h3>
            <div className="car-info-grid">
              <div className="car-info-item">
                <span>Mærke:</span>
                <span>{carDetails.make}</span>
              </div>
              <div className="car-info-item">
                <span>Model:</span>
                <span>{carDetails.model}</span>
              </div>
              <div className="car-info-item">
                <span>Årgang:</span>
                <span>{carDetails.modelYear}</span>
              </div>
              <div className="car-info-item">
                <span>Farve:</span>
                <span>{carDetails.color || "Ukendt"}</span>
              </div>
              <div className="car-info-item">
                <span>Type:</span>
                <span>{carDetails.type}</span>
              </div>
              <div className="car-info-item">
                <span>Vægt:</span>
                <span>{carDetails.totalWeight} kg</span>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Beskrivelse (valgfri):</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tilføj yderligere oplysninger om bilen"
              rows={3}
            />
          </div>
          
          <div className="form-group button-group">
            <button 
              type="submit" 
              className="save-button"
              disabled={isAdding}
            >
              {isAdding ? "Gemmer..." : "Gem Bil"}
            </button>
          </div>
          
          {saveError && <p className="error-message">{saveError}</p>}
          {success && <p className="success-message">Bilen blev tilføjet!</p>}
        </form>
      )}
    </div>
  );
};

export default CarForm;