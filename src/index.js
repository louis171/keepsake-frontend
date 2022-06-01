import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./auth/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import AlertContextProvider from "./Alerts/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AlertContextProvider>
          <App />
        </AlertContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
