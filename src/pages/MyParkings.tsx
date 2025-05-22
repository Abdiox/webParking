import React from "react";
import { useUserParkings } from "../hooks/useUserParkings";
import UserParkingList from "../components/lists/UserParkingList"

export const MyParkings: React.FC = () => {
  const { parkings, loading, error } = useUserParkings();

  return (
    <UserParkingList
      parkings={parkings}
      loading={loading}
      error={error}
    />
  );
};

export default MyParkings;
