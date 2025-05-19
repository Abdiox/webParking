import { useState, useEffect } from "react";
import { getCarsByUserId } from "../services/apiFacade";
import type { Car } from "../services/apiFacade";

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const userIdFromStorage = localStorage.getItem("userId");
        if (!userIdFromStorage) {
          throw new Error("Bruger ID ikke fundet. Log venligst ind igen.");
        }
        const userIdNum = Number(userIdFromStorage);
        setUserId(userIdNum);

        console.log("Fetching cars for user ID:", userIdNum);
        const allCars = await getCarsByUserId(userIdNum);
        console.log("Cars fetched from API:", allCars);
        
        setCars(allCars);
      } catch (err: any) {
        console.error("Error fetching cars:", err);
        setError(err.message || "Noget gik galt");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Log cars whenever they change
  useEffect(() => {
    console.log("Cars in state:", cars);
  }, [cars]);

  const getCarTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sedan':
        return '🚗';
      case 'suv':
        return '🚙';
      case 'sports':
        return '🏎️';
      case 'truck':
        return '🚚';
      case 'van':
        return '🚐';
      case 'motorcycle':
        return '🏍️';
      default:
        return '🚗';
    }
  };

  const refreshCars = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!userId) {
        throw new Error("Bruger ID ikke fundet");
      }
      
      console.log("Refreshing cars for user ID:", userId);
      const fetchedCars = await getCarsByUserId(userId);
      console.log("Refreshed cars:", fetchedCars);
      
      setCars(fetchedCars);
    } catch (err: any) {
      console.error("Error refreshing cars:", err);
      setError(err.message || "Kunne ikke opdatere bilerne");
    } finally {
      setLoading(false);
    }
  };

  return {
    cars,
    loading,
    error,
    userId,
    getCarTypeIcon,
    refreshCars
  };
}