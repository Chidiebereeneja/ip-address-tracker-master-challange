import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GeoLocationProvider } from "./hooks/useGeolocationContext.jsx";
import "leaflet/dist/leaflet.css";
import ModalProvider from "./hooks/modal.jsx";
import IpAddressProvider from "./hooks/ipAddressContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModalProvider>
      <IpAddressProvider>
        <GeoLocationProvider>
          <App />
        </GeoLocationProvider>
      </IpAddressProvider>
    </ModalProvider>
  </StrictMode>
);
