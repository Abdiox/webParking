import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, type UserDetails } from "../services/apiFacade";

const EMPTY_USER: UserDetails = {
  id: null,
  name: "",
  email: "",
  password: "",
  phoneNumber: 0,
  rentalUnit: 0,
  adress: "",
  city: "",
  zipCode: 0,
};

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetails>({ ...EMPTY_USER });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: name === "phoneNumber" || name === "zipCode" || name === "rentalUnit" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser(user);
      alert("Bruger oprettet!");
      navigate("/login"); 
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Kunne ikke oprette bruger.");
    }
  };

  return (
    <div>
      <h2>Registrér ny bruger</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Navn" value={user.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={user.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Kodeord" value={user.password} onChange={handleChange} required />
        <input name="phoneNumber" type="number" placeholder="Telefonnummer" value={user.phoneNumber} onChange={handleChange} required />
        <input name="rentalUnit" type="number" placeholder="Lejemaåls ID" value={user.rentalUnit} onChange={handleChange} required />
        <input name="adress" placeholder="Adresse" value={user.adress} onChange={handleChange} required />
        <input name="city" placeholder="By" value={user.city} onChange={handleChange} required />
        <input name="zipCode" type="number" placeholder="Postnummer" value={user.zipCode} onChange={handleChange} required />
        <button type="submit">Opret Bruger</button>
      </form>
    </div>
  );
}
