import { useEffect, useState } from "react";
import { getParea } from "../services/apiFacade";
import type { Parea } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";


export function useParkingAreas() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState<Parea[]>([]);

  useEffect(() => {
    getParea().then(setAreas);
  }, []);

  return { areas };
}