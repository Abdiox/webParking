import { useEffect, useState } from "react";
import { addParking, getParea } from "../services/apiFacade";
import type { Parking, Parea } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";

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

  // Hent p-områder og bruger-id
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(Number(storedUserId));
    getParea().then(setAreas);
  }, []);

  // Håndter form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "pArea") {
      const selectedArea = areas.find((area) => area.areaName === value);
      if (selectedArea) {
        setParking((prev) => ({
          ...prev,
          parea: selectedArea,
        }));
      }
    } else {
      setParking((prev) => ({
        ...prev,
        [name]: name === "userId" ? Number(value) : value,
        userId: userId!,
      }));
    }
  };

  // Håndter form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parkingToSubmit = { ...parking, userId: userId! };
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
  };
}
