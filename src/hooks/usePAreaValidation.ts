import { useState } from "react";
import type { Parking, Parea} from "../services/apiFacade";

export function usePAreaValidation(selectedArea: Parea | null) {
  const [daysError, setDaysError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);

  const validateParkingDuration = (startTime: string, endTime: string): boolean => {
    if (!selectedArea || !startTime || !endTime) {
      setDaysError(null);
      setIsValid(true);
      return true;
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    
    console.log("Validerer parkering:");
    console.log("Start dato:", startDate);
    console.log("Slut dato:", endDate);
    console.log("Maks dage tilladt:", selectedArea.daysAllowedParking);
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    console.log("Beregnede dage:", diffDays);
    
    if (diffDays > selectedArea.daysAllowedParking) {
      const errorMsg = `Parkering kan ikke overstige ${selectedArea.daysAllowedParking} dage i dette område.`;
      console.log("Validering fejlet:", errorMsg);
      setDaysError(errorMsg);
      setIsValid(false);
      return false;
    } else {
      console.log("Validering godkendt");
      setDaysError(null);
      setIsValid(true);
      return true;
    }
  };

  const validateParking = (parking: Parking): boolean => {
    if (!parking.parea || !parking.startTime || !parking.endTime) {
      console.log("Kan ikke validere - mangler parea, startTime eller endTime");
      return true; 
    }
    
    return validateParkingDuration(parking.startTime, parking.endTime);
  };

  return {
    daysError,
    isValid,
    validateParkingDuration,
    validateParking
  };
}

