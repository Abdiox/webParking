import React, { useState, useEffect } from "react";
import type { Parking, Parea } from "../services/apiFacade";
import { useCarLookUp } from "../hooks/useCarLookUp";
import { usePAreaValidation } from "../hooks/usePAreaValidation";
import "./RegistrationForm.css"; 

interface RegistrationFormProps {
  parking: Parking;
  areas: Parea[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function RegistrationForm({ parking, areas, onChange, onSubmit }: RegistrationFormProps) {
  const now = new Date().toISOString().slice(0, 16);
  const { carDetails, isLoading, error, lookupCar } = useCarLookUp();
  const [selectedArea, setSelectedArea] = useState<Parea | null>(null);
  const [maxEndDate, setMaxEndDate] = useState<string>("");
  
  const handlePlateNumberBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const plateNumber = e.target.value.trim();
    if (plateNumber.length >= 2) {
      await lookupCar(plateNumber);
    }
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAreaId = Number(e.target.value);
    const area = areas.find(a => a.id === selectedAreaId);
    
    if (area) {
      setSelectedArea(area);
      // Nulstil slutdato når området ændres
      if (parking.startTime) {
        updateMaxEndDate(parking.startTime, area.daysAllowedParking);
      }
    }
    
    onChange(e);
  };
  
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    
    // Opdater max end date baseret på ny startdato
    if (selectedArea) {
      updateMaxEndDate(newStartDate, selectedArea.daysAllowedParking);
    }
    
    onChange(e);
  };
  
  const updateMaxEndDate = (startDateStr: string, maxDays: number) => {
    if (!startDateStr) return;
    
    const startDate = new Date(startDateStr);
    const maxDate = new Date(startDate);
    maxDate.setDate(startDate.getDate() + maxDays);
    
    // Konverter til format som datetime-local kan bruge
    setMaxEndDate(maxDate.toISOString().slice(0, 16));
  };
  
  useEffect(() => {
    if (parking.parea?.id) {
      const area = areas.find(a => a.id === parking.parea.id);
      if (area) {
        setSelectedArea(area);
        if (parking.startTime) {
          updateMaxEndDate(parking.startTime, area.daysAllowedParking);
        }
      }
    }
  }, [parking.parea?.id, areas, parking.startTime]);
  
  return (
    <div className="parking-form-container">
      <form onSubmit={onSubmit} className="parking-form">
        <h2>Registrer Parkering</h2>
        
        <div className="form-group">
          <label htmlFor="parea">Parkeringsområde:</label>
          <select 
            id="parea"
            name="parea" 
            value={parking.parea?.id || ""} 
            onChange={handleAreaChange} 
            required
          >
            <option value="">-- Vælg område --</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id || 0}>
                {a.areaName} ({a.city}, {a.postalCode}) - Max {a.daysAllowedParking} dage
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="plateNumber">Nummerplade:</label>
          <div className="plate-input-container">
            <input 
              id="plateNumber"
              name="plateNumber" 
              placeholder="Nummerplade" 
              value={parking.plateNumber} 
              onChange={onChange}
              onBlur={handlePlateNumberBlur}
              required 
            />
            {isLoading && <span className="loading-indicator">Søger...</span>}
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        
        {carDetails && (
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
                <span>{carDetails.color}</span>
              </div>
              <div className="car-info-item">
                <span>Vægt:</span>
                <span>{carDetails.totalWeight} kg</span>
              </div>
              <div className="car-info-item">
                <span>Type:</span>
                <span>{carDetails.type}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="startTime">Starttidspunkt:</label>
          <input 
            id="startTime"
            name="startTime" 
            type="datetime-local" 
            value={parking.startTime} 
            onChange={handleStartDateChange} 
            required 
            min={now} 
          />
          {selectedArea && (
            <div className="input-info">
              Vælg starttidspunkt for din parkering
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="endTime">Sluttidspunkt:</label>
          <input 
            id="endTime"
            name="endTime" 
            type="datetime-local" 
            value={parking.endTime} 
            onChange={onChange} 
            required 
            min={parking.startTime || now}
            max={maxEndDate || undefined}
          />
          {selectedArea && parking.startTime && (
            <div className="input-info">
              Maks. {selectedArea.daysAllowedParking} dage fra starttidspunktet
            </div>
          )}
        </div>
        
        <div className="form-group button-group">
          <button 
            type="submit" 
            disabled={!carDetails && parking.plateNumber.length > 0}
          >
            {!carDetails && parking.plateNumber.length > 0 ? "Find bil først" : "Opret Parkering"}
          </button>
        </div>
      </form>
    </div>
  );
}