import React from "react";
import { ParkingAreaList } from "../components/lists/ParkingAreaList";
import "../components/lists/ParkingAreas.css"

export const ParkingAreas: React.FC = () => {
  return (
    <div className="parking-areas-page">
      <ParkingAreaList />
    </div>
  );
};