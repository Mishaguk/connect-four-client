import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { StrictMode } from "react";
import "./i18n/i18n.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
