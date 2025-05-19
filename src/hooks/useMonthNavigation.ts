import { useState, useEffect } from 'react';
import type { Parking } from "../services/apiFacade";

interface UseMonthNavigationReturn {
  currentDate: Date;
  filteredParkings: Parking[];
  prevMonth: () => void;
  nextMonth: () => void;
  formatMonthYear: (date: Date) => string;
}

export const useMonthNavigation = (parkings: Parking[] | null): UseMonthNavigationReturn => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredParkings, setFilteredParkings] = useState<Parking[]>([]);
  
  useEffect(() => {
    if (parkings && parkings.length > 0) {
      const filtered = parkings.filter(parking => {
        const parkingDate = new Date(parking.startTime);
        return parkingDate.getMonth() === currentDate.getMonth() && 
               parkingDate.getFullYear() === currentDate.getFullYear();
      });
      setFilteredParkings(filtered);
    } else {
      setFilteredParkings([]);
    }
  }, [parkings, currentDate]);
  
  const prevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };
  
  const nextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };
  
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('da-DK', { month: 'long', year: 'numeric' });
  };

  return {
    currentDate,
    filteredParkings,
    prevMonth,
    nextMonth,
    formatMonthYear
  };
};
