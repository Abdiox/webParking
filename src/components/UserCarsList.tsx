import React from "react";
import { useCars } from "../hooks/useCars";
import "./UserCars.css";

function UserCarList() {
  const { cars, loading, error, getCarTypeIcon } = useCars();

  return (
    <div className="cars-container">
      <h2 className="cars-title">Mine Biler</h2>
      
      {loading ? (
        <p>Indlæser...</p>
      ) : error ? (
        <p>Fejl: {error}</p>
      ) : cars && cars.length > 0 ? (
        <div className="cars-grid">
          {cars.map((car) => (
            <div className="car-card" key={car.id}>
              <h3>{car.brand} {car.model}</h3>
              <p>Nummerplade: {car.numberPlate}</p>
              <p>Type: {car.type} {car.type && getCarTypeIcon(car.type)}</p>
              <p>Farve: {car.color}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Du har ingen registrerede køretøjer</p>
      )}
    </div>
  );
}

export default UserCarList;
