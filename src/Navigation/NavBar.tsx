import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css"; 

interface NavBarProps {
}

const NavBar: React.FC<NavBarProps> = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Hent brugeroplysninger fra localStorage
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("userId");
    
    setUserEmail(email);
    setUserId(id);
  }, []);

  const handleLogout = () => {
    // Ryd brugerdata fra localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    
    // Naviger til login siden
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      {/* Top bar med brugerinfo */}
      <div className="topbar">
        {userEmail ? (
          <div className="user-info">
            <span className="user-email">{userEmail}</span>
            <span className="user-id">ID: {userId}</span>
          </div>
        ) : (
          <div>Ikke logget ind</div>
        )}
      </div>

      {/* Side navigation */}
      <div className="sidebar">
        <div className="app-title">
          <h2>ParkeringsApp</h2>
        </div>
        
        <nav className="nav-links">
          <NavLink 
            to="/home" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <i className="icon">🏠</i>
            <span>Hjem</span>
          </NavLink>
          
          <NavLink 
            to="/parkings" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <i className="icon">🅿️</i>
            <span>Mine Parkeringer</span>
          </NavLink>
          
          <NavLink 
            to="/new-parking" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <i className="icon">➕</i>
            <span>Ny Parkering</span>
          </NavLink>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <i className="icon">👤</i>
            <span>Min Profil</span>
          </NavLink>
        </nav>
        
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="icon">🚪</i>
            <span>Log ud</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;