// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authProvider, type LoginRequest } from "../services/authFacade";
import { getUsers, getUser } from "../services/apiFacade";
import LoginForm from "../forms/LoginForm";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginRequest>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authProvider.signIn(credentials);
      localStorage.setItem("token", res.token);
      localStorage.setItem("email", res.email);
      authProvider.isAuthenticated = true;
      navigate("/");
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
