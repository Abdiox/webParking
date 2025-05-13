import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/partials/Layout";
import Home from "./pages/Home";
import Login from "./security/Login";
import Register from "./security/Register";
import Parking from "./pages/Parking";
import MyParkings from "./pages/MyParkings";
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

        
        {/* Assuming you have a MyParkings component */}
        <Route path="/parking" element={<Parking />} />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}

export default App;