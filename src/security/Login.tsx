import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
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
      
    
      if (res.user) {
        localStorage.setItem("userId", res.user.id.toString());
        localStorage.setItem("role", res.user.role);
        
        console.log("User data in localStorage:", {
          userId: localStorage.getItem("userId"),
          email: localStorage.getItem("email"),
          token: localStorage.getItem("token") ? "exists" : "missing",
          role: localStorage.getItem("role")
        });
      }
      
      return true;
      
    } catch (err: any) {
      setError(err.message || "Login failed");
      return false;
    }
  };

  const handleLoginSuccess = () => {
    const userRole = localStorage.getItem("role");
    
    if (userRole === "ADMIN") {
      navigate("/admin/users");
    } else {
      navigate("/home");
    }
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