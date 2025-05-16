import React from "react";
import { ParkingAreaList } from "../components/ParkingAreaList";
import "../components/ParkingAreas.css";

export const ParkingAreas: React.FC = () => {
  return (
    <div className="parking-areas-page">
      <ParkingAreaList />
    </div>
  );
};