import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../Navigation/NavBar";
import "./Layout.css";

const Layout: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="app-container">
      {isLoggedIn && <NavBar />}
      <main className={isLoggedIn ? "main-content" : "main-content-full"}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;