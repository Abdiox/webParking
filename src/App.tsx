import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./security/Login"; 
import Register from "./security/Register";
import { Home } from './components/partials/Home';
import AuthProvider from "./security/AuthProvider"; 

function App() {
  return (
    <AuthProvider> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
