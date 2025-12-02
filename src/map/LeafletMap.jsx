import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styled from "styled-components";
import Recenter from "../components/reCenter";
import { UseIpAddress } from "../hooks/ipAddressContext";

const LeafLetContainer = styled.section`
  width: 100%;
  height: 400px;
  z-index: -1;
`;

export default function LeafletMap() {
  const { payload } = UseIpAddress();
  const center =
    payload?.latitude && payload?.longitude
      ? [payload.latitude, payload.longitude]
      : [6.5244, 3.3792];
  console.log(payload?.longitude);

  return (
    <LeafLetContainer>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%", zIndex: "-10px" }}
      >
        <Recenter center={center} />
        {/* Using Carto tiles to avoid OSM timeout */}
        <TileLayer
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          attribution="&copy; CartoDB"
        />

        <Marker position={center}>
          <Popup>Working map using Vite + React + Leaflet!</Popup>
        </Marker>
      </MapContainer>
    </LeafLetContainer>
  );
}
