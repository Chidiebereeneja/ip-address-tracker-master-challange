import styled from "styled-components";
import DetailedIpAddress from "./components/detailedIpAddress";
import MapHeader from "./components/mapHeader";
import Popup from "./components/popup";
import "./fixLeafletIcons";
import { UseIpAddress } from "./hooks/ipAddressContext";
import { Modal } from "./hooks/modal";
import LeafletMap from "./map/LeafletMap";

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export default function App() {
  const { setPayload } = UseIpAddress();
  return (
    <Modal>
      <Container>
        <MapHeader setPayload={setPayload} />
        <DetailedIpAddress />
        <LeafletMap />
      </Container>

      <Modal.ModalWindow modalName="ip_address">
        <Modal.ModalContent className="flex flex-col gap-2 items-end">
          <Popup setPayload={setPayload} />
        </Modal.ModalContent>
      </Modal.ModalWindow>
    </Modal>
  );
}
