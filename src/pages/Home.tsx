import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getParkings } from "../services/apiFacade";
import type { Parking } from "../services/apiFacade";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [parkings, setParkings] = useState<Parking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchParkings = async () => {
    setLoading(true);
    try {
      const data = await getParkings();
      
      const userId = localStorage.getItem("userId");
      const email = localStorage.getItem("email");
      
      console.log("Aktuel bruger:", { userId, email });
      
      if (userId) {
        const userIdNum = Number(userId);
        
        const filtered = data.filter((parking) => {
          console.log(`Sammenligner parking.userId: ${parking.userId} (${typeof parking.userId}) med userIdNum: ${userIdNum} (${typeof userIdNum})`);
          return parking.userId === userIdNum;
        });
        
        setParkings(filtered);
        console.log("Alle parkeringer:", data);
        console.log("Filtrerede parkeringer:", filtered);
      } else {
        console.error("Ingen userId fundet i localStorage");
        setError("Bruger ID ikke fundet. Log venligst ind igen.");
      }
    } catch (error) {
      console.error("Error fetching parkings:", error);
      setError("Fejl ved hentning af parkeringer");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchParkings();
  }, []);
  
  // Log ud funktion
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Velkommen til Parkeringsappen</h1>
        <button onClick={handleLogout} style={{ padding: "8px 16px" }}>Log ud</button>
      </div>
      
      <p>Logget ind som: {localStorage.getItem("email")} (ID: {localStorage.getItem("userId")})</p>
      
      <h2>Dine aktive parkeringer</h2>
      
      {loading && <p>Indlæser parkeringer...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {!loading && parkings.length === 0 && !error && (
        <p>Du har ingen aktive parkeringer.</p>
      )}
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {parkings.map((parking) => (
          <li key={parking.id} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginBottom: "10px" }}>
            <p><strong>Område:</strong> {parking.parea}</p>
            <p><strong>Nummerplade:</strong> {parking.plateNumber}</p>
            <p><strong>Start:</strong> {new Date(parking.startTime).toLocaleString()}</p>
            <p><strong>Slut:</strong> {new Date(parking.endTime).toLocaleString()}</p>
            <p><strong>Bruger ID:</strong> {parking.userId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;