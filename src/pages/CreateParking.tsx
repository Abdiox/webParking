import React from "react";
import { useParkingForm } from "../hooks/useParkingForm";
import ParkingForm from "../forms/ParkingForm";

export default function CreateParking() {
  const {
    parking,
    areas,
    userId, // Added userId from the hook
    handleChange,
    handleSubmit,
  } = useParkingForm();

  // Don't render the form until we have a userId
  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ParkingForm
        parking={parking}
        areas={areas}
        userId={userId} // Pass userId as prop
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}