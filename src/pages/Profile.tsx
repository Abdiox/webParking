import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import UserProfileDetails from "../components/UserProfileDetails";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useUser();

  if (loading) return <p>Indlæser profil …</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return null;

  console.log(user.firstName);
  console.log(user.lastName);
  console.log(user.email);
  console.log(user.phoneNumber);
  console.log(user.adress);


  return (
    <div>
      <h1>Min Profil</h1>
      <UserProfileDetails user={user} />
    </div>
  );
};

export default Profile;
