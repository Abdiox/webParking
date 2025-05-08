import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root") || document.body.appendChild(document.createElement("div"));
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
