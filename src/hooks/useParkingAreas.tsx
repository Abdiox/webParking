import { useEffect, useState } from "react";
import { getParea } from "../services/apiFacade";
import type { Parea } from "../services/apiFacade";


export function useParkingAreas() {
  const [areas, setAreas] = useState<Parea[]>([]);

  useEffect(() => {
    getParea().then(setAreas);
  }, []);

  return { areas };
}