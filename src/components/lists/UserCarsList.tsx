import React, { useState } from "react";
import { useCars } from "../../hooks/useCars";
import CarForm from "../../forms/CarForm";
import "./UserCars.css";

function UserCarList() {
  const { cars, loading, error, getCarTypeIcon, refreshCars } = useCars();
  const [showCarForm, setShowCarForm] = useState(false);

  const toggleCarForm = () => {
    setShowCarForm(!showCarForm);
  };

  return (
    <div className="user-cars-container">
      <div className="cars-header">
        <h1>Mine Biler</h1>
      
      {loading && <p className="loading-message">Indlæser biler …</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && cars.length === 0 && (
        <p className="no-cars-message">Ingen biler fundet.</p>
      )}
      {cars.length > 0 && (
        <table className="user-cars-table">
          <thead>
            <tr>
              <th>Nummerplade</th>
              <th>Producent</th>
              <th>Model</th>
              <th>Farve</th>
              <th>Biltype</th>
              <th>Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.registrationNumber}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.color}</td>
                <td>{car.modelYear}</td>
                <td>{getCarTypeIcon(car.type || "")}</td>
                
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

          <button 
          className="add-car-button" 
          onClick={toggleCarForm}
        >
          {showCarForm ? "Annuller" : "Tilføj Bil"}
        </button>
      </div>

      {showCarForm && (
        <CarForm 
          onCarAdded={(car) => {
            refreshCars();
            setShowCarForm(false);
          }}
        />
      )}
    </div>
  );
}

export default UserCarList;
