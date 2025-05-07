import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authProvider, type LoginRequest } from "../services/authFacade";
import { getUsers, getUser } from "../services/apiFacade";
import LoginForm from "../forms/LoginForm";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginRequest>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      
      const res = await authProvider.signIn(credentials);
      localStorage.setItem("token", res.token);
      localStorage.setItem("email", res.email);
      
      try {
        const allUsers = await getUsers();
        console.log("Alle brugere:", allUsers);
        
        const currentUser = allUsers.find(user => user.email === res.email);
        
        if (currentUser) {
          localStorage.setItem("userId", currentUser.id.toString());
          console.log("User ID gemt:", currentUser.id);
        } else {
          console.error("Kunne ikke finde bruger med email:", res.email);
        }
      } catch (userErr) {
        console.error("Fejl ved hentning af bruger-id:", userErr);
      }
      
      authProvider.isAuthenticated = true;
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <LoginForm
        credentials={credentials}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onRegisterClick={() => navigate("/register")}
        error={error}
      />
    </div>
  );
};

export default Login;