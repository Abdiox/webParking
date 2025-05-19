import { useState, useEffect } from "react";
import { getUsers } from "../services/apiFacade";
import type { UserDetails } from "../services/apiFacade";


export function useUsers() {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch(() => setError("Kunne ikke hente brugere."))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
}
