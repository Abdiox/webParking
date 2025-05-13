import { useState, useEffect } from "react";
import { getParkings } from "../services/apiFacade";
import type { Parking } from "../services/apiFacade";

export function useUserParkings() {
  const [parkings, setParkings] = useState<Parking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const allParkings = await getParkings();
        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error("Bruger ID ikke fundet. Log venligst ind igen.");
        }

        const userIdNum = Number(userId);
        const filtered = allParkings.filter((p) => p.userId === userIdNum);
        setParkings(filtered);
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
