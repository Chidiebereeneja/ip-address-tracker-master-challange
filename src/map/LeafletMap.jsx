import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styled from "styled-components";
import Recenter from "../components/reCenter";
import { UseIpAddress } from "../hooks/ipAddressContext";
import { useEffect, useMemo, useState } from "react";

const LeafLetContainer = styled.section`
  width: 100%;
  height: 500px;
  z-index: -1;
`;

async function getRealAddress(lat, lon) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  return res.json();
}

export default function LeafletMap() {
  const { payload } = UseIpAddress();

  const center = useMemo(() => {
    return payload?.latitude && payload?.longitude
      ? [payload.latitude, payload.longitude]
      : [6.5244, 3.3792];
  }, [payload]);

  const [realAddress, setRealAddress] = useState(null);

  useEffect(() => {
    async function loadAddress() {
      const addr = await getRealAddress(center[0], center[1]);
      setRealAddress(addr);
    }
    loadAddress();
  }, [center]);

  return (
    <LeafLetContainer>
      <MapContainer
        center={center}
        zoom={17}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        attributionControl={false}
        style={{ height: "500px", width: "100%", zIndex: "-1" }}
      >
        <Recenter center={center} />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* User marker */}
        <Marker position={center}>
          <Popup>
            <div>
              <h3 style={{ fontWeight: "bold" }}>
                {realAddress?.address?.road || "Loading street..."}
              </h3>

              {realAddress?.address?.neighbourhood && (
                <p>{realAddress.address.neighbourhood}</p>
              )}

              {realAddress?.address?.suburb && (
                <p>{realAddress.address.suburb}</p>
              )}

              <p>
                {realAddress?.address?.city ||
                  realAddress?.address?.town ||
                  realAddress?.address?.village}
              </p>

              <p>{realAddress?.address?.state}</p>
              <p>{realAddress?.address?.country}</p>
              <p>{realAddress?.address?.postcode}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </LeafLetContainer>
  );
}
