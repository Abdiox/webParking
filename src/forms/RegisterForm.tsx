import React, { useState } from "react";
import type { UserDetails } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBuilding, FaHome, FaCity, FaMapMarkerAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import CreateAnimation from "../components/animationer/CreateAnimation.json";

interface RegisterFormProps {
  user: UserDetails;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<boolean>; 
  onRegisterSuccess?: () => void; 
}

export default function RegisterForm({ user, onChange, onSubmit, onRegisterSuccess }: RegisterFormProps) {
  const navigate = useNavigate();
  const [formAnimation, setFormAnimation] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormAnimation(true);
    
    try {
      const success = await onSubmit(e);
      
      if (success) {
        setShowSuccessAnimation(true);
        
        setTimeout(() => setFormAnimation(false), 1000);
        
        setTimeout(() => {
          setShowSuccessAnimation(false);
          if (onRegisterSuccess) {
            onRegisterSuccess();
          }
        }, 3000);
      } else {
        setTimeout(() => setFormAnimation(false), 1000);
      }
    } catch (err) {
      setTimeout(() => setFormAnimation(false), 1000);
    }
  };

  return (
    <div className="register-page">
      {showSuccessAnimation && (
        <div className="success-animation-container">
          <Lottie 
            animationData={CreateAnimation} 
            loop={false} 
            autoplay={true}
          />
        </div>
      )}
      
      <form 
        onSubmit={handleSubmit}
        className={`register-form ${formAnimation ? "form-submit-animation" : ""} ${showSuccessAnimation ? "blur-background" : ""}`}
      >
        <h2>Registrér ny bruger</h2>
        
        <div className="form-grid">
          <div className="input-group">
            <input 
              name="firstName" 
              placeholder="Fornavn" 
              value={user.firstName} 
              onChange={onChange} 
              required 
            />
            <FaUser className="input-icon" />
          </div>

          <div className="input-group">
            <input 
              name="lastName" 
              placeholder="Efternavn" 
              value={user.lastName} 
              onChange={onChange} 
              required 
            />
            <FaUser className="input-icon" />
          </div>
          
          <div className="input-group">
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={user.email} 
              onChange={onChange} 
              required 
            />
            <FaEnvelope className="input-icon" />
          </div>
          
          <div className="input-group">
            <input 
              name="password" 
              type="password" 
              placeholder="Kodeord" 
              value={user.password} 
              onChange={onChange} 
              required 
            />
            <FaLock className="input-icon" />
          </div>
          
          <div className="input-group">
            <input 
              name="phoneNumber" 
              type="number" 
              placeholder="Telefonnummer" 
              value={user.phoneNumber} 
              onChange={onChange} 
              required 
            />
            <FaPhone className="input-icon" />
          </div>
          
          <div className="input-group">
            <input 
              name="rentalUnit" 
              type="number" 
              placeholder="Lejemåls ID" 
              value={user.rentalUnit} 
              onChange={onChange} 
              required 
            />
            <FaBuilding className="input-icon" />
          </div>
          
          <div className="input-group">
            <input 
              name="adress" 
              placeholder="Adresse" 
              value={user.adress} 
              onChange={onChange} 
              required 
            />
            <FaHome className="input-icon" />
          </div>
          
          <div className="input-group">
            <input 
              name="city" 
              placeholder="By" 
              value={user.city} 
              onChange={onChange} 
              required 
            />
            <FaCity className="input-icon" />
          </div>
          
          <div className="input-group">
            <input 
              name="zipCode" 
              type="number" 
              placeholder="Postnummer" 
              value={user.zipCode} 
              onChange={onChange} 
              required 
            />
            <FaMapMarkerAlt className="input-icon" />
          </div>
        </div>
        
        <div className="button-group">
          <button type="submit" className="btn-primary">Opret Bruger</button>
          <div className="divider">
            <span className="divider-text">eller</span>
          </div>
          <button type="button" className="btn-secondary-register" onClick={() => navigate("/login")}>
            Tilbage til login
          </button>
        </div>
      </form>
    </div>
  );
}
