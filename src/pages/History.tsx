// pages/History.tsx
import React from "react";
import { useUserParkings } from "../hooks/useUserParkings";
import { useMonthNavigation } from "../hooks/useMonthNavigation";
import { MonthNavigation, ParkingHistory } from "../components/ParkingHistory";

export const History: React.FC = () => {
    const { parkings, loading, error } = useUserParkings();
    const { 
        currentDate, 
        filteredParkings, 
        prevMonth, 
        nextMonth, 
        formatMonthYear 
    } = useMonthNavigation(parkings);
    
    return (
        <div className="parkings-container">
            <h2 className="parkings-title">Historik</h2>
            
            <MonthNavigation 
                currentDate={currentDate}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
                formatMonthYear={formatMonthYear}
            />
            
            {loading ? (
                <p>Indlæser...</p>
            ) : error ? (
                <p>Fejl: {error}</p>
            ) : filteredParkings.length > 0 ? (
                <ParkingHistory parkings={filteredParkings} />
            ) : (
                <p>Ingen parkeringer fundet for {formatMonthYear(currentDate)}</p>
            )}
        </div>
    );
}

export default History;
