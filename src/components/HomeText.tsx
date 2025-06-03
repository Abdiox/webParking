import React from "react";
import type { Parking } from "../services/apiFacade";
import type { UserDetails } from "../services/apiFacade";
import UserParkingList from "./lists/UserParkingList";
import { useUserParkings } from "../hooks/useUserParkings";
import "./HomeText.css";

interface Props {
  user: UserDetails;
}

export default function HomeText() {
  const { parkings, loading, error } = useUserParkings();
  const now = new Date();

  const activeParkings = parkings.filter(p => new Date(p.endTime) > now);

  return (
    <div className="home-wrapper">
      <header className="home-header">
        <div className="home-greeting">
          <div className="greeting-icon">🚗</div>
          <h1>Velkommen tilbage!</h1>
          <p className="home-sub">Parkér på sekunder</p>
          
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-value">{activeParkings.length}</div>
              <div className="stat-label">Aktive parkeringer</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{parkings.length - activeParkings.length}</div>
              <div className="stat-label">Tidligere parkeringer</div>
            </div>
          </div>
        </div>
      </header>

      <section className="home-status-section">
        <div className="section-header">
          <h2 className="section-title">Aktive parkeringer</h2>
          <div className="section-icon">📍</div>
        </div>

        {loading && (
          <div className="status-message loading">
            <div className="message-icon">⏳</div>
            <div className="message-content">
              <h3>Indlæser parkeringer</h3>
              <p>Vent venligst mens vi henter dine parkeringsoplysninger...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="status-message error">
            <div className="message-icon">❌</div>
            <div className="message-content">
              <h3>Der opstod en fejl</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {!loading && activeParkings.length === 0 && (
          <div className="status-message empty">
            <div className="message-icon">🚙</div>
            <div className="message-content">
              <h3>Ingen aktive parkeringer</h3>
              <p>Du har ingen aktive parkeringer i øjeblikket. Opret en ny parkering når du har brug for det.</p>
              <button className="create-parking-btn" onClick={() => window.location.href = '/create-parking'}>
                Opret ny parkering
              </button>
            </div>
          </div>
        )}

        {!loading && activeParkings.length > 0 && (
          <div className="parking-list-container">
            <UserParkingList parkings={activeParkings} loading={false} error={null} />
          </div>
        )}
      </section>
    </div>
  );
}
