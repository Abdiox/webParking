import React from "react";
import type { Parking } from "../services/apiFacade";
import UserParkingList from "./lists/UserParkingList";
import { useUserParkings } from "../hooks/useUserParkings";
import "./HomeText.css";

interface HomeTextProps {
  parking: Parking[];
  loading: boolean;
  error: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function HomeText({ parking, loading, error }: HomeTextProps) {
  const { parkings, loading: hookLoading, error: hookError } = useUserParkings();

  const now = new Date();

  const activeParkings = parkings.filter((p) => {
    return new Date(p.endTime) > now;
  });

  return (
    <div className="home-container">
      
      
      <h1 className="home-title">Velkommen AM's Parkerings Web Page!</h1>
      

      <h2 className="home-subtitle">Dine aktive parkeringer</h2>

      {hookLoading && <p className="loading">Indlæser parkeringer …</p>}
      {hookError && <p className="error">{hookError}</p>}

      {activeParkings.length > 0 ? (
        <UserParkingList parkings={activeParkings} loading={false} error={null} />
      ) : (
        !hookLoading && <p className="no-parking">Du har ingen aktive parkeringer.</p>
      )}
    </div>
  );
}
