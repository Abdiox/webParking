import { useState } from 'react';
import { addCar } from '../services/apiFacade';
import type { Car } from '../services/apiFacade';

export function useAddCar() {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveCar = async (car: Car): Promise<Car | null> => {
    setIsAdding(true);
    setError(null);
    setSuccess(false);
    
    try {
      const carToSave: Car = {
        id: car.id,
        registrationNumber: car.registrationNumber,
        make: car.make,
        model: car.model,
        modelYear: car.modelYear,
        color: car.color,
        type: car.type,
        total_weight: car.total_weight,
        description: car.description,
        userId: car.userId
      };
      
      const savedCar = await addCar(carToSave);
      setSuccess(true);
      return savedCar;
    } catch (err: any) {
      console.error("Fejl ved tilføjelse af bil:", err);
      setError(err.message || "Der opstod en fejl ved tilføjelse af bilen");
      return null;
    } finally {
      setIsAdding(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    saveCar,
    isAdding,
    error,
    success,
    resetState
  };
}
