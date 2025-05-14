import React from "react";
import type { Parking, Parea } from "../services/apiFacade";

interface RegistrationFormProps {
  parking: Parking;
  areas: Parea[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}


export default function RegistrationForm({ parking, areas, onChange, onSubmit }: RegistrationFormProps) {
  const now = new Date().toISOString().slice(0, 16); 

  return (
    <form onSubmit={onSubmit}>
      <h2>Registrer Parkering</h2>

      <label>Parkeringsområde:</label>
      <select name="pArea" value={parking.pArea} onChange={onChange} required>
        <option value="">-- Vælg område --</option>
        {areas.map((a) => (
          <option key={a.id} value={a.areaName}>
            {a.areaName} ({a.city}, {a.postalCode})
          </option>
        ))}
      </select>

      <input name="plateNumber" placeholder="Nummerplade" value={parking.plateNumber} onChange={onChange} required />
      <input name="startTime" type="datetime-local" value={parking.startTime} onChange={onChange} required min={now} />
      <input name="endTime" type="datetime-local" value={parking.endTime} onChange={onChange} required min={now} />
      <button type="submit">Opret Parkering</button>
    </form>
  );
}
