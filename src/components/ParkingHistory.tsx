import React from "react";
import type { Parking } from "../services/apiFacade";
import "./ParkingHistory.css"

interface MonthNavigationProps {
  currentDate: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  formatMonthYear: (date: Date) => string;
}

export const MonthNavigation: React.FC<MonthNavigationProps> = ({ 
  currentDate, 
  prevMonth, 
  nextMonth, 
  formatMonthYear 
}) => (
  <div className="month-navigation">
    <button onClick={prevMonth} className="nav-button">&lt; Forrige</button>
    <h3 className="current-month">{formatMonthYear(currentDate)}</h3>
    <button onClick={nextMonth} className="nav-button">Næste &gt;</button>
  </div>
);

interface ParkingCardProps {
  parking: Parking;
}

export const ParkingCard: React.FC<ParkingCardProps> = ({ parking }) => (
  <div className="parking-card" key={parking.id}>
    <p>Nummerplade: {parking.plateNumber}</p>
    <p>Parkerings ID: {parking.id}</p>
    <p>Starttidspunkt: {new Date(parking.startTime).toLocaleString()}</p>
    <p>Sluttidspunkt: {new Date(parking.endTime).toLocaleString()}</p>
  </div>
);

interface ParkingListProps {
  parkings: Parking[];
}

export const ParkingHistory: React.FC<ParkingListProps> = ({ parkings }) => (
  <div className="parkings-grid">
    {parkings.map((parking) => (
      <ParkingCard key={parking.id} parking={parking} />
    ))}
  </div>
);
