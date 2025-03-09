import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AppProviders from "./context/AppProviders";
import "@/assets/styles/main.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
