import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css"; 

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="navbar-container">
      <div className="topbar">
      
        <div className="app-title-small">ParkeringsApp</div>
      </div>

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
            to="/home" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <i className="icon">🅿️</i>
            <span>Mine Parkeringer</span>
          </NavLink>
          
          <NavLink 
            to="/parking" 
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