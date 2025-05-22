import React, { useState } from "react";
import { addCar } from "../services/apiFacade";
import { useCarLookUp } from "../hooks/useCarLookUp";
import type { Car } from "../services/apiFacade";
import "./CarForm.css"; 

interface CarFormProps {
  onCarAdded?: (car: Car) => void;
}

const CarForm: React.FC<CarFormProps> = ({ onCarAdded }) => {
  const [plateNumber, setPlateNumber] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const { carDetails, isLoading, error, lookupCar, resetCarDetails } = useCarLookUp();

  const handlePlateNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlateNumber(e.target.value.toUpperCase());
    if (carDetails) {
      resetCarDetails();
    }
  };

  const handleLookupCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (plateNumber.length < 2) return;
    
    await lookupCar(plateNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!carDetails) return;
    
    setSaving(true);
    setSaveError(null);
    
    try {
      const newCar: Car = {
        id: null,
        numberPlate: plateNumber,
        brand: carDetails.brand || "",
        model: carDetails.model || "",
        year: carDetails.year || 0,
        color: carDetails.color || "",
        type: carDetails.type || "",
        description: description,
        userId: Number(localStorage.getItem("userId")) || null
      };
      
      const savedCar = await addCar(newCar);
      setSaveSuccess(true);
      
      setPlateNumber("");
      setDescription("");
      resetCarDetails();
      
      if (onCarAdded) {
        onCarAdded(savedCar);
      }
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
    } catch (error: any) {
      console.error("Fejl ved oprettelse af bil:", error);
      setSaveError(error.message || "Der opstod en fejl ved oprettelse af bilen");
    } finally {
      setSaving(false);
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
          {error && <p className="error-message">{error}</p>}
        </div>
      </form>
      
      {carDetails && (
        <form onSubmit={handleSubmit} className="car-save-form">
          <div className="car-details">
            <h3>Biloplysninger</h3>
            <div className="car-info-grid">
              <div className="car-info-item">
                <span>Mærke:</span>
                <span>{carDetails.brand}</span>
              </div>
              <div className="car-info-item">
                <span>Model:</span>
                <span>{carDetails.model}</span>
              </div>
              <div className="car-info-item">
                <span>Årgang:</span>
                <span>{carDetails.year}</span>
              </div>
              <div className="car-info-item">
                <span>Farve:</span>
                <span>{carDetails.color}</span>
              </div>
              <div className="car-info-item">
                <span>Type:</span>
                <span>{carDetails.type}</span>
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
              disabled={saving}
            >
              {saving ? "Gemmer..." : "Gem Bil"}
            </button>
          </div>
          
          {saveError && <p className="error-message">{saveError}</p>}
          {saveSuccess && <p className="success-message">Bilen blev tilføjet!</p>}
        </form>
      )}
    </div>
  );
};

export default CarForm;
