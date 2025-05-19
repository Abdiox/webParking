// App.jsx - Med alle beskyttede routes og login som standardrute
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/partials/Layout";
import Home from "./pages/Home";
import Login from "./security/Login";
import Register from "./security/Register";
import CreateParking from "./pages/CreateParking";
import MyParkings from "./pages/MyParkings";
import Profile from "./pages/Profile";
import { ParkingAreas } from "./pages/ParkingAreas";
import { MyCars } from "./pages/MyCars";
import { History } from "./pages/History";
import { ContactUs } from "./pages/ContactUs";

import UserOverview from "./security/admin/UserOverview";
import ProtectedRoute from "./security/ProtectedRoute";
import AuthProvider from "./security/AuthProvider";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/parking-areas" element={<ParkingAreas />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/my-parkings" element={<MyParkings />} />
            <Route path="/create-parking" element={<CreateParking />} />
            <Route path="/my-cars" element={<MyCars />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            



            {/* Admin routes */}
            <Route path="/admin" element={<h1>Admin Page</h1>} />
            <Route path="/admin/user-overview" element={<UserOverview />} />
            
            <Route element={<ProtectedRoute requiredRoles={["ADMIN"]} />}>
            </Route>
            
            <Route index element={<Navigate to="/home" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
