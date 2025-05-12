import React from "react";
import type { Parking } from "../services/apiFacade";

interface HomeTextProps {
  parking: Parking[];
  loading: boolean;
  error: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
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
          {parking.map((p) => {
            // Add null checks to prevent errors
            const parea = p.parea || {};
            return (
              <li
                key={p.id || 'unknown'}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>Område:</strong>{" "}
                  {parea.areaName || 'Ukendt område'}, 
                  {parea.city || 'Ukendt by'} 
                  ({parea.postalCode || 'Ukendt postnummer'}) 
                  – {parea.daysAllowedParking || 0} dage
                </p>
                <p><strong>Nummerplade:</strong> {p.plateNumber || 'Ingen nummerplade'}</p>
                <p><strong>Start:</strong> {p.startTime ? new Date(p.startTime).toLocaleString() : 'Ingen startdato'}</p>
                <p><strong>Slut:</strong> {p.endTime ? new Date(p.endTime).toLocaleString() : 'Ingen slutdato'}</p>
                <p><strong>Bruger ID:</strong> {p.userId}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}