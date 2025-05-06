import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./security/Login"; 
import Register from "./security/Register";
import AuthProvider from "./security/AuthProvider"; 

function App() {
  return (
    <AuthProvider> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
