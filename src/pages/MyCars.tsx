import React from "react";
import { useCars } from "../hooks/useCars"
import UserCarList from "../components/UserCarsList";


export const MyCars: React.FC = () => {
  const { cars, loading, error, refreshCars } = useCars();

  return (
    <UserCarList
      cars={cars}
      loading={loading}
      error={error}
      onRefresh={refreshCars}
    />
  );
};
export default MyCars;
