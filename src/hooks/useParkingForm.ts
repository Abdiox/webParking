import { useEffect, useState } from "react";
import { addParking, getParea } from "../services/apiFacade";
import type { Parking, Parea } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";
import { usePAreaValidation } from "./usePAreaValidation";

const EMPTY_PARKING: Parking = {
  id: null,
  parea: {
    id: 0,
    areaName: "",
    city: "",
    postalCode: 0,
    daysAllowedParking: 0,
  },
  plateNumber: "",
  startTime: "",
  endTime: "",
  userId: 0,
};

export function useParkingForm() {
  const navigate = useNavigate();
  const [parking, setParking] = useState<Parking>({ ...EMPTY_PARKING });
  const [userId, setUserId] = useState<number | null>(null);
  const [areas, setAreas] = useState<Parea[]>([]);
  const [selectedArea, setSelectedArea] = useState<Parea | null>(null);
  const { daysError, isValid, validateParking } = usePAreaValidation(selectedArea);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(Number(storedUserId));
    getParea().then(setAreas);
  }, []);

  // Valider når parking ændres
  useEffect(() => {
    if (parking.parea?.id && parking.startTime && parking.endTime) {
      validateParking(parking);
    }
  }, [parking, validateParking]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "parea") {
      const areaId = Number(value);
      const area = areas.find((a) => a.id === areaId);
      
      if (area) {
        setSelectedArea(area);
        setParking((prev) => ({
          ...prev,
          parea: area,
        }));
      }
    } else {
      setParking((prev) => ({
        ...prev,
        [name]: name === "userId" ? Number(value) : value,
        userId: userId || 0,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valider eksplicit én sidste gang før submission
    const valid = validateParking(parking);
    
    if (!valid) {
      alert("Parkeringsperioden er ikke gyldig. " + (daysError || ""));
      return;
    }
    
    try {
      const parkingToSubmit = { ...parking, userId: userId || 0 };
      await addParking(parkingToSubmit);
      alert("Parkering oprettet!");
      navigate("/home");
    } catch (error) {
      console.error("Fejl ved oprettelse:", error);
      alert("Kunne ikke oprette parkering.");
    }
  };

  return {
    parking,
    areas,
    handleChange,
    handleSubmit,
    daysError,
    isValid
  };
}
