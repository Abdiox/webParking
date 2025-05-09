import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
// Ubrugt import fjernet: import AuthProvider from "./AuthProvider";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  
  // Tilføjet debugging
  useEffect(() => {
    console.log("ProtectedRoute rendering");
    console.log("Authentication status:", isAuthenticated);
    console.log("Token in localStorage:", localStorage.getItem("token"));
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  console.log("Authenticated, rendering protected content");
  return <Outlet />;
};

export default ProtectedRoute;