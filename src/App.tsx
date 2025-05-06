import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./security/Login"; // Importer Login komponenten
import AuthProvider from "./security/AuthProvider"; // Importer AuthProvider

function App() {
  return (
    <AuthProvider> {/* AuthProvider omkranser din app */}
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Du kan tilføje flere ruter her */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
