import { useParkingForm } from "../hooks/useParkingForm";
import ParkingForm from "../forms/ParkingForm"

export default function CreateParking() {
  const {
    parking,
    areas,
    userId, 
    handleChange,
    handleSubmit,
    navigateToMyParkings
  } = useParkingForm();

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ParkingForm
        parking={parking}
        areas={areas}
        userId={userId} 
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCreateSuccess={navigateToMyParkings}
      />
    </div>
  );
}
