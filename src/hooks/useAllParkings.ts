import { useState, useEffect } from "react";
import { getParkings } from "../services/apiFacade";
import type { Parking } from "../services/apiFacade";

export function useAllParkings() {
  const [parkings, setParkings] = useState<Parking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const allParkings = await getParkings();
        setParkings(allParkings);
      } catch (err: any) {
        setError(err.message || "Noget gik galt");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { parkings, loading, error };
}
