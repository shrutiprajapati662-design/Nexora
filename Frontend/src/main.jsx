import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { JobsProvider } from "./context/JobsContext";

const savedTheme = localStorage.getItem("theme") || "dark";

document.body.classList.remove("light-theme", "dark-theme");

document.body.classList.add(
  savedTheme === "light" ? "light-theme" : "dark-theme"
);

document.documentElement.classList.toggle("dark", savedTheme !== "light");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <JobsProvider>
          <Toaster position="top-right" />
          <App />
        </JobsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);