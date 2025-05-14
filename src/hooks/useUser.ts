import { useState, useEffect } from "react";
import { getUser } from "../services/apiFacade";
import type { UserDetails } from "../services/apiFacade";

export function useUser() {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const idStr = localStorage.getItem("userId");
    if (!idStr) {
      setError("User ID ikke fundet. Log venligst ind igen.");
      setLoading(false);
      return;
    }
    const id = Number(idStr);
    getUser(id)
      .then((data) => setUser(data))
      .catch(() => setError("Kunne ikke hente brugerdata."))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
}
