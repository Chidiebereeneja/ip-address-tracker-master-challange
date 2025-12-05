import styled from "styled-components";

const SpinnerContainer = styled.div`
  height: 20px;
  width: 20px;
  border: 1.5px solid white;
  border-bottom-color: transparent;
  border-radius: 100%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function Spinner() {
  return <SpinnerContainer></SpinnerContainer>;
}
