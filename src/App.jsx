import styled from "styled-components";
import DetailedIpAddress from "./components/detailedIpAddress";
import MapHeader from "./components/mapHeader";
import Popup from "./components/popup";
import "./fixLeafletIcons";
import { Modal } from "./hooks/modal";
import LeafletMap from "./map/LeafletMap";
import { ToastContainer } from "react-toastify";

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export default function App() {
  return (
    <Modal>
      <Container>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
        <MapHeader />
        <DetailedIpAddress />
        <LeafletMap />
      </Container>

      <Modal.ModalWindow modalName="ip_address">
        <Modal.ModalContent className="flex flex-col gap-2 items-end">
          <Popup />
        </Modal.ModalContent>
      </Modal.ModalWindow>
    </Modal>
  );
}
