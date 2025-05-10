import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getParkings } from "../services/apiFacade";
import type { Parking } from "../services/apiFacade";
import HomeText from "../components/HomeText";

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

  return (
    <div>
      {!loading && parkings.length > 0 && (
        <div>
          <HomeText
            loading={loading}
            error={error}
            parking={parkings}
            onChange={() => {}}
            onSubmit={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
