import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./security/Login"; 
import AuthProvider from "./security/AuthProvider"; 

function App() {
  return (
    <AuthProvider> 
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
