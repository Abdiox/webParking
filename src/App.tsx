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
import { ContactUs } from "./pages/ContactUs";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/my-parkings" element={<MyParkings />} />
        <Route path="/parking-areas" element={<ParkingAreas />} />
        <Route path="/create-parking" element={<CreateParking />} />
        <Route path="/contact-us" element={<ContactUs />} />
        
        
        <Route path="/profile" element={<Profile />} />
        

                
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}

export default App;