import { MapContainer, Marker, TileLayer } from "react-leaflet";
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

        <TileLayer
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, 
          
        &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> 
        &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />

        <Marker position={center}></Marker>
      </MapContainer>
    </LeafLetContainer>
  );
}
