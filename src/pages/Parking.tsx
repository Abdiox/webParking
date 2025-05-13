import React from "react";
import { useParkingForm } from "../hooks/useParkingForm";
import ParkingForm from "../forms/ParkingForm";

export default function Parking() {
  const {
    parking,
    areas,
    handleChange,
    handleSubmit,
  } = useParkingForm();

  return (
    <div>
      <ParkingForm
        parking={parking}
        areas={areas}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
