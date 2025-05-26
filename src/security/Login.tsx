import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import { getUsers } from "../services/apiFacade";
import LoginForm from "../forms/LoginForm";
import type { LoginRequest } from "../services/authFacade";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
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
      localStorage.removeItem("role");
      
      const res = await auth.signIn(credentials);
      
      try {
        const allUsers = await getUsers();
        console.log("All users:", allUsers);
        
        const currentUser = allUsers.find(user => user.email === res.email);
        
        if (currentUser) {
          localStorage.setItem("userId", currentUser.id.toString());
          console.log("User ID saved:", currentUser.id);
          console.log("User role from backend:", currentUser.role);
          
          localStorage.setItem("role", currentUser.role);
          
          console.log("User data in localStorage:", {
            userId: localStorage.getItem("userId"),
            email: localStorage.getItem("email"),
            token: localStorage.getItem("token") ? "exists" : "missing",
            role: localStorage.getItem("role")
          });
        } else {
          console.error("Could not find user with email:", res.email);
        }
      } catch (userErr) {
        console.error("Error fetching user ID:", userErr);
      }
      
      return true;
      
    } catch (err: any) {
      setError(err.message || "Login failed");
      return false;
    }
  };

  const handleLoginSuccess = () => {
    window.location.href = "/home";
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <LoginForm
        credentials={credentials}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onRegisterClick={() => navigate("/register")}
        onLoginSuccess={handleLoginSuccess}
        error={error}
      />
    </div>
  );
};

export default Login;
