import React, { useState, useRef } from "react";
import type { LoginRequest } from "../services/authFacade";
import "./LoginForm.css";
import { FaUser, FaLock, FaExclamationCircle } from "react-icons/fa";
import Lottie from "lottie-react";
import LoginAnimation from "../components/animationer/LoginAnimation.json";

interface Props {
  credentials: LoginRequest;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<boolean>; 
  onRegisterClick: () => void;
  onLoginSuccess?: () => void; 
  error?: string | null;
}

export default function LoginForm({
  credentials,
  onChange,
  onSubmit,
  onRegisterClick,
  onLoginSuccess,
  error,
}: Props) {
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
          if (onLoginSuccess) {
            onLoginSuccess();
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
    <div className="login-page">
      {showSuccessAnimation && (
        <div className="success-animation-container">
          <Lottie 
            animationData={LoginAnimation} 
            loop={false} 
            autoplay={true}
          />
        </div>
      )}
      
      <form 
        onSubmit={handleSubmit}
        className={`login-form ${formAnimation ? "form-submit-animation" : ""} ${showSuccessAnimation ? "blur-background" : ""}`}
      >
        <h1>Login</h1>
        
        <img
          src="https://i.ibb.co/6RmBkqd5/Chat-GPT-Image-Apr-28-2025-01-54-15-PM.png"
          alt="AM Parking Logo"
          className="login-logo"
        />
        
        <div className="input-group">
          <input
            type="text"
            name="email"
            placeholder="Email eller brugernavn"
            value={credentials.email}
            onChange={onChange}
            required
          />
          <FaUser className="input-icon" />
        </div>
        
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Adgangskode"
            value={credentials.password}
            onChange={onChange}
            required
          />
          <FaLock className="input-icon" />
        </div>
        
        <a href="#" className="forgot-password">Glemt adgangskode?</a>
        
        <div className="button-group">
          <button type="submit">Log ind</button>
          <div className="divider">
            <span className="divider-text">eller</span>
          </div>
          <button type="button" onClick={onRegisterClick}>
            Opret bruger
          </button>
        </div>
        
        {error && (
          <div className="error-message">
            <FaExclamationCircle style={{ marginRight: '8px' }} />
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
