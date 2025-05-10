import React from "react";
import type { Parking } from "../services/apiFacade";

interface HomeTextProps {
  parking: Parking[];
  loading: boolean;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function HomeText({ parking, loading, error }: HomeTextProps) {
  return (
    <div>
      <h1>Velkommen til Parkeringsappen</h1>
      <p>Logget ind som: {localStorage.getItem("email")} (ID: {localStorage.getItem("userId")})</p>

      {loading && <p>Indlæser parkeringer...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && parking.length === 0 && !error && (
        <p>Du har ingen aktive parkeringer.</p>
      )}
      {!loading && parking.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {parking.map((p) => (
            <li
              key={p.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p><strong>Område:</strong> {p.parea}</p>
              <p><strong>Nummerplade:</strong> {p.plateNumber}</p>
              <p><strong>Start:</strong> {new Date(p.startTime).toLocaleString()}</p>
              <p><strong>Slut:</strong> {new Date(p.endTime).toLocaleString()}</p>
              <p><strong>Bruger ID:</strong> {p.userId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
