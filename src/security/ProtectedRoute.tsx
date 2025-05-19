import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ requiredRoles = [] }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth || !auth.isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRoles.length > 0) {
    console.log("Checking admin status:", {
      userObject: auth.user,
      userRole: localStorage.getItem("role"),
      requiredRoles: requiredRoles
    });
    
    if (!auth.isLoggedInAs(requiredRoles)) {
      return <Navigate to="/home" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
