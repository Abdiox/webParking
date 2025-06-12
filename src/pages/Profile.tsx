import React from "react";
import { useUser } from "../hooks/useUser";
import UserProfileDetails from "../components/UserProfileDetails";

const Profile: React.FC = () => {
  const { user, loading, error } = useUser();

  if (loading) return <p>Indlæser profil …</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return null;

 
  


  return (
    <div>
      <h1>Min Profil</h1>
      <UserProfileDetails user={user} />
    </div>
  );
};

export default Profile;
