import React from "react";
import type { UserDetails } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  user: UserDetails;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  
}



export default function RegisterForm({ user, onChange, onSubmit }: RegisterFormProps) {
  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit}>
    <h2>Registrér ny bruger</h2>
      <input name="name" placeholder="Navn" value={user.name} onChange={onChange} required />
      <input name="email" type="email" placeholder="Email" value={user.email} onChange={onChange} required />
      <input name="password" type="password" placeholder="Kodeord" value={user.password} onChange={onChange} required />
      <input name="phoneNumber" type="number" placeholder="Telefonnummer" value={user.phoneNumber} onChange={onChange} required />
      <input name="rentalUnit" type="number" placeholder="Lejemaåls ID" value={user.rentalUnit} onChange={onChange} required />
      <input name="adress" placeholder="Adresse" value={user.adress} onChange={onChange} required />
      <input name="city" placeholder="By" value={user.city} onChange={onChange} required />
      <input name="zipCode" type="number" placeholder="Postnummer" value={user.zipCode} onChange={onChange} required />
      <button type="submit">Opret Bruger</button>

      <button type="button" onClick={() => navigate("/login")}>Tilbage til login</button>
      
    </form>
  );
}
