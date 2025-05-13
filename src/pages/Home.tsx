import React from "react";
import { useNavigate } from "react-router-dom";
import HomeText from "../components/HomeText";
import { useUserParkings } from "../hooks/useUserParkings";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { parkings, loading, error } = useUserParkings();

  return (
    <div>
      {!loading && parkings.length > 0 && (
        <HomeText
          loading={loading}
          error={error}
          parking={parkings}
          onChange={() => {}}
          onSubmit={() => {}}
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Home;
