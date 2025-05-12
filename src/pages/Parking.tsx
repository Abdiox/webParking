import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addParking, getParea } from "../services/apiFacade";
import type { Parking, Parea } from "../services/apiFacade";
import ParkingForm from "../forms/ParkingForm";

const EMPTY_PARKING: Parking = {
    id: null,
    pArea: "",
    plateNumber: "",
    startTime: "",
    endTime: "",
    userId: 0,
    userName: "",
  };
  

export default function Parking() {
  const navigate = useNavigate();
  const [parking, setParking] = useState<Parking>({ ...EMPTY_PARKING });
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [areas, setAreas] = useState<Parea[]>([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("email");

    if (storedUserId) setUserId(Number(storedUserId));
    if (storedUserName) setUserName(storedUserName);

    getParea().then(setAreas);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParking({
      ...parking,
      [name]: name === "userId" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addParking({ ...parking, userId: userId!, userName });
      alert("Parkering oprettet!");
      navigate("/home");
    } catch (error) {
      console.error("Fejl ved oprettelse:", error);
      alert("Kunne ikke oprette parkering.");
    }
  };

  return (
    <div>
      <ParkingForm parking={parking} areas={areas} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}
