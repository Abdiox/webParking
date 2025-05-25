import React, { useState, useEffect } from "react";
import type { Parking, Parea, Car } from "../services/apiFacade";
import { useCarLookUp } from "../hooks/useCarLookUp";
import { getCarsByUserId } from "../services/apiFacade";
import "./RegistrationForm.css"; 

interface RegistrationFormProps {
  parking: Parking;
  areas: Parea[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  userId: number; // Added to get user's cars
}

type CarSelectionMode = "existing" | "new";

export default function RegistrationForm({ parking, areas, onChange, onSubmit, userId }: RegistrationFormProps) {
  const now = new Date().toISOString().slice(0, 16);
  const { carDetails, isLoading, error, lookupCar, resetCarDetails } = useCarLookUp();
  const [selectedArea, setSelectedArea] = useState<Parea | null>(null);
  const [maxEndDate, setMaxEndDate] = useState<string>("");
  const [carSelectionMode, setCarSelectionMode] = useState<CarSelectionMode>("existing");
  const [userCars, setUserCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [loadingUserCars, setLoadingUserCars] = useState(false);

  // Load user's existing cars
  useEffect(() => {
    const loadUserCars = async () => {
      if (!userId) return;
      
      setLoadingUserCars(true);
      try {
        const cars = await getCarsByUserId(userId);
        setUserCars(cars);
        
        // If user has no cars, default to new car mode
        if (cars.length === 0) {
          setCarSelectionMode("new");
        }
      } catch (error) {
        console.error("Error loading user cars:", error);
        setCarSelectionMode("new");
      } finally {
        setLoadingUserCars(false);
      }
    };

    loadUserCars();
  }, [userId]);

  const handlePlateNumberBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    if (carSelectionMode !== "new") return;
    
    const plateNumber = e.target.value.trim();
    if (plateNumber.length >= 2) {
      await lookupCar(plateNumber);
    }
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAreaId = Number(e.target.value);
    const area = areas.find(a => a.id === selectedAreaId);
    
    if (area) {
      setSelectedArea(area);
      if (parking.startTime) {
        updateMaxEndDate(parking.startTime, area.daysAllowedParking);
      }
    }
    
    onChange(e);
  };
  
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    
    if (selectedArea) {
      updateMaxEndDate(newStartDate, selectedArea.daysAllowedParking);
    }
    
    onChange(e);
  };
  
  const updateMaxEndDate = (startDateStr: string, maxDays: number) => {
    if (!startDateStr) return;
    
    const startDate = new Date(startDateStr);
    const maxDate = new Date(startDate);
    maxDate.setDate(startDate.getDate() + maxDays);
    
    setMaxEndDate(maxDate.toISOString().slice(0, 16));
  };

  const handleCarSelectionModeChange = (mode: CarSelectionMode) => {
    setCarSelectionMode(mode);
    setSelectedCarId(null);
    resetCarDetails();
    
    const plateEvent = {
      target: { name: "plateNumber", value: "" }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(plateEvent);
  };

  const handleExistingCarSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carId = Number(e.target.value);
    setSelectedCarId(carId);
    
    const selectedCar = userCars.find(car => car.id === carId);
    if (selectedCar && selectedCar.registrationNumber) {
      // Update the parking object with the selected car's plate number
      const plateEvent = {
        target: { 
          name: "plateNumber", 
          value: selectedCar.registrationNumber 
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(plateEvent);
    }
  };

  const getSelectedCarDetails = () => {
    if (carSelectionMode === "existing" && selectedCarId) {
      return userCars.find(car => car.id === selectedCarId);
    }
    return carDetails;
  };

  const selectedCarForDisplay = getSelectedCarDetails();
  
  useEffect(() => {
    if (parking.parea?.id) {
      const area = areas.find(a => a.id === parking.parea.id);
      if (area) {
        setSelectedArea(area);
        if (parking.startTime) {
          updateMaxEndDate(parking.startTime, area.daysAllowedParking);
        }
      }
    }
  }, [parking.parea?.id, areas, parking.startTime]);

  const isFormValid = () => {
    if (carSelectionMode === "existing") {
      return selectedCarId !== null;
    } else {
      return selectedCarForDisplay !== null;
    }
  };
  
  return (
    <div className="parking-form-container">
      <form onSubmit={onSubmit} className="parking-form">
        <h2>Registrer Parkering</h2>
        
        <div className="form-group">
          <label htmlFor="parea">Parkeringsområde:</label>
          <select 
            id="parea"
            name="parea" 
            value={parking.parea?.id || ""} 
            onChange={handleAreaChange} 
            required
          >
            <option value="">-- Vælg område --</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id || 0}>
                {a.areaName} ({a.city}, {a.postalCode}) - Max {a.daysAllowedParking} dage
              </option>
            ))}
          </select>
        </div>

        {/* Car Selection Mode Toggle */}
        <div className="form-group">
          <label>Vælg køretøj:</label>
          <div className="car-selection-toggle">
            <button
              type="button"
              className={`toggle-btn ${carSelectionMode === "existing" ? "active" : ""}`}
              onClick={() => handleCarSelectionModeChange("existing")}
              disabled={loadingUserCars || userCars.length === 0}
            >
              Mine biler ({userCars.length})
            </button>
            <button
              type="button"
              className={`toggle-btn ${carSelectionMode === "new" ? "active" : ""}`}
              onClick={() => handleCarSelectionModeChange("new")}
            >
              Ny bil (nummerplade)
            </button>
          </div>
          {userCars.length === 0 && !loadingUserCars && (
            <p className="info-message">Du har ingen registrerede biler. Brug nummerplade-søgning.</p>
          )}
        </div>

        {/* Existing Cars Selection */}
        {carSelectionMode === "existing" && userCars.length > 0 && (
          <div className="form-group">
            <label htmlFor="existingCar">Vælg fra dine biler:</label>
            <select
              id="existingCar"
              value={selectedCarId || ""}
              onChange={handleExistingCarSelection}
              required
            >
              <option value="">-- Vælg bil --</option>
              {userCars.map((car) => (
                <option key={car.id} value={car.id || 0}>
                  {car.registrationNumber} - {car.make} {car.model} ({car.modelYear})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* New Car Plate Number Input */}
        {carSelectionMode === "new" && (
          <div className="form-group">
            <label htmlFor="plateNumber">Nummerplade:</label>
            <div className="plate-input-container">
              <input 
                id="plateNumber"
                name="plateNumber" 
                placeholder="Indtast nummerplade" 
                value={parking.plateNumber} 
                onChange={onChange}
                onBlur={handlePlateNumberBlur}
                required 
              />
              {isLoading && <span className="loading-indicator">Søger...</span>}
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
        
        {/* Car Details Display */}
        {selectedCarForDisplay && (
          <div className="car-details">
            <h3>Biloplysninger</h3>
            <div className="car-info-grid">
              <div className="car-info-item">
                <span>Nummerplade:</span>
                <span>{selectedCarForDisplay.registrationNumber}</span>
              </div>
              <div className="car-info-item">
                <span>Mærke:</span>
                <span>{selectedCarForDisplay.make}</span>
              </div>
              <div className="car-info-item">
                <span>Model:</span>
                <span>{selectedCarForDisplay.model}</span>
              </div>
              <div className="car-info-item">
                <span>Årgang:</span>
                <span>{selectedCarForDisplay.modelYear}</span>
              </div>
              <div className="car-info-item">
                <span>Farve:</span>
                <span>{selectedCarForDisplay.color}</span>
              </div>
              <div className="car-info-item">
                <span>Vægt:</span>
                <span>{selectedCarForDisplay.total_weight} kg</span>
              </div>
              <div className="car-info-item">
                <span>Type:</span>
                <span>{selectedCarForDisplay.type}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="startTime">Starttidspunkt:</label>
          <input 
            id="startTime"
            name="startTime" 
            type="datetime-local" 
            value={parking.startTime} 
            onChange={handleStartDateChange} 
            required 
            min={now} 
          />
          {selectedArea && (
            <div className="input-info">
              Vælg starttidspunkt for din parkering
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="endTime">Sluttidspunkt:</label>
          <input 
            id="endTime"
            name="endTime" 
            type="datetime-local" 
            value={parking.endTime} 
            onChange={onChange} 
            required 
            min={parking.startTime || now}
            max={maxEndDate || undefined}
          />
          {selectedArea && parking.startTime && (
            <div className="input-info">
              Maks. {selectedArea.daysAllowedParking} dage fra starttidspunktet
            </div>
          )}
        </div>
        
        <div className="form-group button-group">
          <button 
            type="submit" 
            disabled={!isFormValid()}
          >
            {!isFormValid() ? "Vælg køretøj først" : "Opret Parkering"}
          </button>
        </div>
      </form>
    </div>
  );
}