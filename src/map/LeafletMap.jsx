import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import styled from "styled-components";
import Recenter from "../components/reCenter";
import { UseIpAddress } from "../hooks/ipAddressContext";

const LeafLetContainer = styled.section`
  width: 100%;
  height: 400px;
  z-index: -1;
`;

const smallMarker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [24, 24], // <-- Smaller marker
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

export default function LeafletMap() {
  const { payload } = UseIpAddress();
  const center =
    payload?.latitude && payload?.longitude
      ? [payload.latitude, payload.longitude]
      : [6.5244, 3.3792];

  return (
    <LeafLetContainer>
      <MapContainer
        center={center}
        zoom={15}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        attributionControl={false}
        style={{ height: "400px", width: "100%", zIndex: "-10px" }}
      >
        <Recenter center={center} />
        {/* Using Carto tiles to avoid OSM timeout */}
        {/* <TileLayer
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          attribution="&copy; CartoDB"
        /> */}

        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, 
        &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> 
        &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />

        <Marker position={center} icon={smallMarker}>
          <Popup>Working map using Vite + React + Leaflet!</Popup>
        </Marker>
      </MapContainer>
    </LeafLetContainer>
  );
}
