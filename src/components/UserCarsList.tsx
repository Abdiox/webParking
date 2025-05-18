import React from "react";
import { useCars } from "../hooks/useCars";
import "./UserCars.css";

export function UserCars() {
  const { cars, loading, error, getCarTypeIcon, refreshCars } = useCars();

  return (
    <div className="cars-container">
      <h2 className="cars-title">Mine Køretøjer</h2>
      
      {loading && (
        <div className="cars-loading">
          <div className="loading-spinner"></div>
          <p>Henter dine køretøjer...</p>
        </div>
      )}
      
      {error && (
        <div className="cars-error">
          <p>{error}</p>
          <button 
            onClick={refreshCars}
            className="retry-button"
          >
            Prøv igen
          </button>
        </div>
      )}
      
      {!loading && !error && cars.length === 0 && (
        <div className="no-cars">
          <div className="no-cars-icon">🚫</div>
          <p>Du har ingen registrerede køretøjer</p>
          <button className="add-car-button">
            Tilføj køretøj
          </button>
        </div>
      )}
      
      {!loading && !error && cars.length > 0 && (
        <div className="cars-grid">
          {cars.map((car) => (
            <div className="car-card" key={car.id}>
              <div className="car-header">
                <div className="car-icon">
                  {getCarTypeIcon(car.type)}
                </div>
                <div className="car-plate">{car.numberPlate}</div>
              </div>
              
              <div className="car-details">
                <div className="car-info-row">
                  <span>Mærke:</span>
                  <strong>{car.brand}</strong>
                </div>
                <div className="car-info-row">
                  <span>Model:</span>
                  <strong>{car.model}</strong>
                </div>
                <div className="car-info-row">
                  <span>Årgang:</span>
                  <strong>{car.year}</strong>
                </div>
                <div className="car-info-row">
                  <span>Farve:</span>
                  <div 
                    className="color-box" 
                    style={{ backgroundColor: car.color.toLowerCase() }}
                  ></div>
                  <strong>{car.color}</strong>
                </div>
                {car.description && (
                  <div className="car-description">
                    <p>{car.description}</p>
                  </div>
                )}
              </div>
              
              <div className="car-actions">
                <button className="edit-car">Rediger</button>
                <button className="delete-car">Slet</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && !error && (
        <div className="add-car-container">
          <button className="add-car-button">
            <span>+</span> Tilføj køretøj
          </button>
        </div>
      )}
    </div>
  );
}

export default UserCars;
