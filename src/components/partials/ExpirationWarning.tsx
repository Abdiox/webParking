import React, { useEffect, useState } from "react";
import "./ExpirationWarning.css";

interface ExpirationWarningProps {
  endTime: string;
}

const ExpirationWarning: React.FC<ExpirationWarningProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState<number>(new Date(endTime).getTime() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(new Date(endTime).getTime() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  if (timeLeft <= 0) return null;

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const isCritical = timeLeft < 1000 * 60 * 60 * 6;   
  const isWarning = timeLeft < 1000 * 60 * 60 * 24;   

  const className = isCritical
    ? "expiration-warning critical"
    : isWarning
    ? "expiration-warning warning"
    : "expiration-warning";

  return (
    <div className={className}>
      <div className="expiration-icon">{isCritical ? "⏰" : "⚠️"}</div>
      <div className="expiration-message">
        <span className="highlight">
          {isCritical ? "HASTER!" : "Udløber snart!"}
        </span>
        <span className="time-remaining">
          {days > 0 ? `${days}d ` : ""}
          {hours}t {minutes}m {seconds}s
        </span>
      </div>
    </div>
  );
};

export default ExpirationWarning;
