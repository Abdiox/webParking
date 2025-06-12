import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, type UserDetails } from "../services/apiFacade";
import RegisterForm from "../forms/RegisterForm";

const EMPTY_USER: UserDetails = {
  id: null,
  email: "",
  password: "",
  phoneNumber: 0,
  rentalUnit: 0,
  address: "",
  city: "",
  zipCode: 0,
  firstName: "", 
  lastName: "",  
};

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetails>({ ...EMPTY_USER });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: ["phoneNumber", "zipCode", "rentalUnit"].includes(name) 
        ? (value === "" ? 0 : Number(value)) 
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser(user);
      return true; 
    } catch (error) {
      console.error("Fejl ved oprettelse:", error);
      alert("Kunne ikke oprette bruger.");
      return false;
    }
  };

  const handleRegisterSuccess = () => {
    navigate("/login");
  };

  return (
    <div>
      <RegisterForm 
        user={user} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        onRegisterSuccess={handleRegisterSuccess}
      />
    </div>
  );
}
