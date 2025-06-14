import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import type { UserDetails } from "../services/apiFacade";
import Lottie from "lottie-react";
import LoggedOut from "../components/animationer/LoggedOut.json"
import "./NavBar.css";

interface Props {
  user: UserDetails;
}

const NavBar: React.FC<Props> = ({user}) => {
  const [isLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const navigate = useNavigate();
  
const isAdmin = () => {
  console.log("Checking admin status:", {
    userObject: user,
    userRole: user?.role,
    roleInLocalStorage: localStorage.getItem("role")
  });
  
  return user && user.role === "ADMIN";
};


const isUser = () => {
  return user && user.role === "USER";
};

  const handleLogout = () => {
    localStorage.clear();
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="navbar-container">
      <div className="topbar">
        <img 
          src="https://i.ibb.co/5X0tBbJV/Chat-GPT-Image-Apr-28-2025-01-54-15-PM.png" 
          alt="AM Parking Logo" 
          className="app-logo" 
        />
        <span className="app-title-small">AM PARKING</span>
      </div>

      <div className="sidebar">
        <div className="app-title">
          <h2>Parkering</h2>
        </div>

        <div className="user-info">
          <img 
            src="https://openclipart.org/download/247319/abstract-user-flat-3.svg" 
            alt="User Avatar" 
            className="user-avatar"
          />
          {user ? `Velkommen, ${user.firstName}` : 'Velkommen'}
        </div>

        {isUser() && (
        
        <div className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <span className="icon">🏠</span>
            <span>Hjem</span>
          </NavLink>

          <NavLink 
            to="/my-parkings" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <span className="icon">🅿️</span>
            <span>Mine Parkeringer</span>
          </NavLink>

          <NavLink 
            to="/parking-areas" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <span className="icon">🗺️</span>
            <span>Parkerings Områder</span>
          </NavLink>

          <NavLink 
            to="/create-parking" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <span className="icon">➕</span>
            <span>Ny Parkering</span>
          </NavLink>

          <NavLink to="/my-cars"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <span className="icon">🚗</span>
            <span>Mine Køretøjer</span>
          </NavLink>

          <NavLink 
            to="/history" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <span className="icon">📜</span>
            <span>Historik</span>
          </NavLink>

          <NavLink 
            to="/profile" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <span className="icon">👤</span>
            <span>Min Profil</span>
          </NavLink>

          <NavLink 
            to="/contact-us" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <span className="icon">✉️</span>
            <span>Kontakt Os</span>
          </NavLink>
        </div>
        )}
          
          {isAdmin() && (
            <>
              <div className="nav-section-divider">
                <span>Admin</span>
              </div>
              <NavLink 
                to="/admin/users" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                <span className="icon">👥</span>
                <span>Brugeroversigt</span>
              </NavLink>
              <NavLink 
                to="/admin/parkings" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                <span className="icon">🚘</span>
                <span>Alle Parkeringer</span>
              </NavLink>
            </>
          )}
        </div>

      <div className="logout-section">
      {showSuccessAnimation && (
  <div className="logout-animation">
    <Lottie 
      animationData={LoggedOut} 
      loop={false} 
      autoplay={true} 
    />
    <p>Du er logget ud!</p>
  </div>
)}

          <button 
            className="logout-button" 
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "Logger ud..." : "Log Ud"}
          </button>
        </div>
      </div>
  );
};

export default NavBar;
