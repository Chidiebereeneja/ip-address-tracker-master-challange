import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GeoLocationProvider } from "./hooks/useGeolocationContext.jsx";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GeoLocationProvider>
      <App />
    </GeoLocationProvider>
  </StrictMode>
);
