import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserParkings } from "../hooks/useUserParkings"; // 👈 custom hook
import type { Parking } from "../services/apiFacade";

export const MyParkings: React.FC = () => {
  const navigate = useNavigate();
  const { parkings, loading, error } = useUserParkings();

  return (
    <div>
      <h1>Mine Parkeringer</h1>

      {loading && <p>Indlæser dine parkeringer...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && parkings.length === 0 && <p>Du har ingen aktive parkeringer.</p>}

      {!loading && parkings.length > 0 && (
        <ul>
          {parkings.map((parking) => (
            <li key={parking.id}>
              Nummerplade: {parking.plateNumber}, Start: {parking.startTime}, Slut: {parking.endTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyParkings;
