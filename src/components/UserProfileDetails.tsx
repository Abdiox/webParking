import React from "react";
import type { UserDetails } from "../services/apiFacade";
import './UserProfileDetails.css'

interface Props {
  user: UserDetails;
}



const UserProfileDetails: React.FC<Props> = ({ user }) => {
  return (
    <div className="profile-card">

      <h2 className="profile-title">Brugeroplysninger</h2>

      <div className="profile-row">
        <span className="label">Fornavn:</span>
        <span>{user.firstName}</span>
      </div>

      <div className="profile-row">
        <span className="label">Efternavn:</span>
        <span>{user.lastName}</span>
      </div>
      
      <div className="profile-row">
        <span className="label">Email:</span>
        <span>{user.email}</span>
      </div>
      <div className="profile-row">
        <span className="label">Telefon:</span>
        <span>{user.phoneNumber}</span>
      </div>
      <div className="profile-row">
        <span className="label">Adresse:</span>
        <span>
          {user.adress}, {user.city} {user.zipCode}
        </span>
      </div>
      <div className="profile-row">
        <span className="label">Lejemåls ID:</span>
        <span>{user.rentalUnit}</span>
      </div>
    </div>
  );
};

export default UserProfileDetails;
