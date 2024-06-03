import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import Footer from "./components/Footer";
import { AuthProvider } from "./services/Api.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Footer />
    </AuthProvider>
  </React.StrictMode>
);
