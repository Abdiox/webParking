import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./App.css";

const container = document.getElementById("root") || document.body.appendChild(document.createElement("div"));
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
