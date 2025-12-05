import styled from "styled-components";

const OverlayContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background-color: #00000070;
  cursor: pointer;
`;
export default function Overlay({ onClick }) {
  return <OverlayContainer onClick={onClick} />;
}
