import React from 'react';
import './ExpirationWarning.css';

interface ExpirationWarningProps {
  endTime: string;
}

const ExpirationWarning: React.FC<ExpirationWarningProps> = ({ endTime }) => {
  const getTimeRemaining = () => {
    const now = new Date();
    const expirationDate = new Date(endTime);
    const diffMs = expirationDate.getTime() - now.getTime();

    if (diffMs <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { totalHours: totalSeconds / 3600, days, hours, minutes, seconds };
  };

  const { totalHours, days, hours, minutes, seconds } = getTimeRemaining();

  let level: 'critical' | 'warning' | null = null;
  if (totalHours <= 5) level = 'critical';
  else if (totalHours <= 24) level = 'warning';

  if (!level) return null;

  return (
    <div className={`expiration-warning ${level}`}>
      <div className="expiration-icon">{level === 'critical' ? '⏰' : '⚠️'}</div>
      <div className="expiration-message">
        <span className="highlight">
          {level === 'critical' ? 'HASTER!' : 'Udløber snart!'}
        </span>
        <span className="time-remaining">
          {days > 0 ? `${days}d ` : ''}
          {hours}t {minutes}m {seconds}s
        </span>
      </div>
    </div>
  );
};

export default ExpirationWarning;
