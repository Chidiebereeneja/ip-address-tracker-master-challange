import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import styled from "styled-components";
import Recenter from "../components/reCenter";
import { UseIpAddress } from "../hooks/ipAddressContext";

const LeafLetContainer = styled.section`
  width: 100%;
  height: 85vh;
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
        style={{ height: "85vh", width: "100%", zIndex: "-1" }}
      >
        <Recenter center={center} />

        <TileLayer
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, 
          
        &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> 
        &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />

        <Marker position={center}>
          <Tooltip permanent direction="top">
            {payload?.city}
          </Tooltip>

          <Popup>
            <div>
              <h3>{payload?.city}</h3>
              <p>{payload?.region}</p>
              <p>{payload?.country_name}</p>
              <p>{payload?.ip}</p>
              <p>{payload?.org}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </LeafLetContainer>
  );
}
