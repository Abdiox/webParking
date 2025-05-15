import React from "react";
import type { Parking, Parea } from "../services/apiFacade";
import "./RegistrationForm.css"; 

interface RegistrationFormProps {
  parking: Parking;
  areas: Parea[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function RegistrationForm({ parking, areas, onChange, onSubmit }: RegistrationFormProps) {
  const now = new Date().toISOString().slice(0, 16);
  
  return (
    <div className="parking-form-container">
      <form onSubmit={onSubmit} className="parking-form">
        <h2>Registrer Parkering</h2>
        
        <div className="form-group">
          <label htmlFor="pArea">Parkeringsområde:</label>
          <select 
            id="pArea"
            name="pArea" 
            value={parking.pArea} 
            onChange={onChange} 
            required
          >
            <option value="">-- Vælg område --</option>
            {areas.map((a) => (
              <option key={a.id} value={a.areaName}>
                {a.areaName} ({a.city}, {a.postalCode})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="plateNumber">Nummerplade:</label>
          <input 
            id="plateNumber"
            name="plateNumber" 
            placeholder="Nummerplade" 
            value={parking.plateNumber} 
            onChange={onChange} 
            required 
          />
        </div>
        
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
          <button type="submit">Opret Parkering</button>
        </div>
      </form>
    </div>
  );
}