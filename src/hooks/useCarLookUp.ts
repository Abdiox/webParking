import { useState } from "react";
import { getCarFromNumberplate } from "../services/apiFacade";
import type { Car } from "../services/apiFacade";

export function useCarLookUp() {
  const [carDetails, setCarDetails] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupCar = async (plateNumber: string) => {
    if (plateNumber.length < 2) {
      setError("Nummerplade er for kort");
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const carData = await getCarFromNumberplate(plateNumber);
      console.log("API response:", carData);

      setCarDetails(carData);
      return carData;
    } catch (err: any) {
      console.error("Fejl ved opslag af nummerplade:", err);
      setError("Kunne ikke finde køretøj med denne nummerplade");
      setCarDetails(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const resetCarDetails = () => {
    setCarDetails(null);
    setError(null);
  };

  return { 
    carDetails, 
    isLoading, 
    error, 
    lookupCar,
    resetCarDetails
  };
}
