// import { useState } from "react";
// import { UseGeolocation } from "./hooks/useGeolocationContext";
import styled from "styled-components";
import DetailedIpAddress from "./components/detailedIpAddress";
import MapHeader from "./components/mapHeader";
import "./fixLeafletIcons";
import LeafletMap from "./map/LeafletMap";
import IpAddressProvider from "./hooks/ipAddressContext";

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export default function App() {
  return (
    <Container>
      <IpAddressProvider>
        <MapHeader />
        <DetailedIpAddress />
        <LeafletMap />
      </IpAddressProvider>
    </Container>
  );
}
