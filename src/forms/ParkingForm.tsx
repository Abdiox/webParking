import React, { useState } from "react";
import type { Parking, Parea } from "../services/apiFacade";
import { useCarLookUp } from "../hooks/useCarLookUp";
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
  
  const handlePlateNumberBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const plateNumber = e.target.value.trim();
    if (plateNumber.length >= 2) {
      await lookupCar(plateNumber);
    }
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAreaId = Number(e.target.value);
    const selectedArea = areas.find(area => area.id === selectedAreaId);
    if (selectedArea) {
      parking.parea = selectedArea;
    }
  };
  
  return (
    <div className="parking-form-container">
      <form onSubmit={onSubmit} className="parking-form">
        <h2>Registrer Parkering</h2>
        
       

        <div className="form-group">
          <label htmlFor="area">Område:</label>
          <select id="area" name="area" onChange={handleAreaChange} required>
            <option value="">Vælg område</option>
            {areas.map(area => (
              <option key={area.id} value={area.id}>{area.areaName}</option>
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
                <span>{carDetails.total_weight} kg</span>
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
            onChange={onChange} 
            required 
            min={now} 
          />
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
            min={now} 
          />
        </div>
        
        <div className="form-group button-group">
          <button type="submit" disabled={!carDetails && parking.plateNumber.length > 0}>
            {!carDetails && parking.plateNumber.length > 0 ? "Find bil først" : "Opret Parkering"}
          </button>
        </div>
      </form>
    </div>
  );
}
