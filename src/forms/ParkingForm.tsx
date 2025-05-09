import React from "react";
import type { Parking } from "../services/apiFacade";



interface RegistrationFormProps {
  parking: Parking;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}


export default function RegistrationForm({ parking, onChange, onSubmit }: RegistrationFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <h2>Registrer Parkering</h2>
      <input name="pArea" placeholder="Parkeringsområde" value={parking.pArea} onChange={onChange} required />
      <input name="plateNumber" placeholder="Nummerplade" value={parking.plateNumber} onChange={onChange} required />
      <input name="startTime" type="datetime-local" value={parking.startTime} onChange={onChange} required />
      <input name="endTime" type="datetime-local" value={parking.endTime} onChange={onChange} required />
      <button type="submit">Opret Parkering</button>
    </form>
  );
}