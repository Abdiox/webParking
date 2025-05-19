import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../Navigation/NavBar";
import { getUser } from "../../services/apiFacade";
import type { UserDetails } from "../../services/apiFacade";
import "./Layout.css";

const Layout: React.FC = () => {
  const location = useLocation();
  const isAuthPath = location.pathname === "/login" || location.pathname === "/register";
  const isLoggedIn = !!localStorage.getItem("token");
  const [user, setUser] = useState<UserDetails | null>(null);
  
  useEffect(() => {
    if (isLoggedIn) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        getUser(parseInt(userId))
          .then(userData => {
            setUser(userData);
          })
          .catch(error => {
            console.error("Error fetching user data:", error);
          });
      }
    }
  }, [isLoggedIn]);
  
  const showNavBar = isLoggedIn && !isAuthPath;

  return (
    <div className="app-container">
      {showNavBar && user && <NavBar user={user} />}
      <main className={showNavBar ? "main-content" : "main-content-full"}>
        <Outlet />
      </main>
      <footer className="web-footer">
        <p>AM PARKING 2025</p>
      </footer>
    </div>
  );
};

export default Layout;
