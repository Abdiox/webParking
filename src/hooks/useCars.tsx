import { useState, useEffect } from "react";
import { getCarByUserId } from "../services/apiFacade";
import type { Car } from "../services/apiFacade";

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
  }  useEffect(() => {
    const fetchUserCars = async () => {
      if (!user || !user.id) {
        setError("Bruger ikke fundet");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getCarByUserId(user.id);

        if (Array.isArray(data)) {
          setCars(data);
        } else {
          setCars([data]); 
        }
        setLoading(false);
      } catch (err) {
        console.error("Fejl ved hentning af biler:", err);
        setError("Kunne ikke hente dine biler. Prøv igen senere.");
        setLoading(false);
      }
    };

    fetchUserCars();
  }, [user]);

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
      if (!user || !user.id) {
        setError("Bruger ikke fundet");
        setLoading(false);
        return;
      }
      
      const data = await getCarByUserId(user.id);
      if (Array.isArray(data)) {
        setCars(data);
      } else {
        setCars([data]);
      }
    } catch (err) {
      console.error("Fejl ved opdatering af biler:", err);
      setError("Kunne ikke opdatere bilerne. Prøv igen senere.");
    } finally {
      setLoading(false);
    }
  };

  return {
    cars,
    loading,
    error,
    getCarTypeIcon,
    refreshCars
  };
}
