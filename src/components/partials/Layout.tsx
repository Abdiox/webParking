import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../Navigation/NavBar";
import "./Layout.css";

const Layout: React.FC = () => {
  const location = useLocation();
  const isAuthPath = location.pathname === "/login" || location.pathname === "/register";
  const isLoggedIn = !!localStorage.getItem("token");
  
  const showNavBar = isLoggedIn && !isAuthPath;

  return (
    <div className="app-container">
      {showNavBar && <NavBar />}
      <main className={showNavBar ? "main-content" : "main-content-full"}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;