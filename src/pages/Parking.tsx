import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addParking, getParea } from "../services/apiFacade";
import type { Parking, Parea } from "../services/apiFacade";
import ParkingForm from "../forms/ParkingForm";

const EMPTY_PARKING: Parking = {
  id: null,
  parea: {
    id: 0,
    areaName: '',
    city: '',
    postalCode: 0,
    daysAllowedParking: 0
  },
  plateNumber: "",
  startTime: "",
  endTime: "",
  userId: 0,
};

export default function Parking() {
  const navigate = useNavigate();
  const [parking, setParking] = useState<Parking>({ ...EMPTY_PARKING });
  const [userId, setUserId] = useState<number | null>(null);
  const [areas, setAreas] = useState<Parea[]>([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) setUserId(Number(storedUserId));

    getParea().then(setAreas);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'pArea') {
      // Find the selected area and set it as the parea
      const selectedArea = areas.find(area => area.areaName === value);
      if (selectedArea) {
        setParking(prev => ({
          ...prev,
          parea: selectedArea
        }));
      }
    } else {
      setParking(prev => ({
        ...prev,
        [name]: name === "userId" ? Number(value) : value,
        userId: userId!
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parkingToSubmit = {
        ...parking,
        userId: userId!,
      };
      
      await addParking(parkingToSubmit);
      alert("Parkering oprettet!");
      navigate("/home");
    } catch (error) {
      console.error("Fejl ved oprettelse:", error);
      alert("Kunne ikke oprette parkering.");
    }
  };

  return (
    <div>
      <ParkingForm 
        parking={parking} 
        areas={areas} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}