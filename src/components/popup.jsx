import styled from "styled-components";
import { Modal, UseModal } from "../hooks/modal";
import { toast } from "react-toastify";
import { useState } from "react";
import Spinner from "./spinner";
import { UseIpAddress } from "../hooks/ipAddressContext";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding-block: 1rem;
`;

const GroupedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const PElement = styled.p`
  display: flex;
  justify-content: center;
  font-weight: 500;
`;

const ButtonYes = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: dodgerblue;
  color: aliceblue;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s linear;

  &:hover {
    box-shadow: 0px 1px 5px #00000061;
  }
`;

const ButtonNo = styled.button`
  color: dodgerblue;
  width: 100px;
  height: 40px;
  border: 1px solid dodgerblue;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s linear;

  &:hover {
    box-shadow: 0px 1px 5px #00000061;
  }
`;

export default function Popup() {
  const { setPayload } = UseIpAddress();
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = UseModal();
  async function onRequestIp() {
    try {
      setIsLoading(true);
      const url = `https://ipapi.co/json/`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch IP data");
      const data = await res.json();

      if (data.error) throw new Error(data.reason || "IP lookup error");

      const payload = {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        postal: data.postal,
        timezone: data.timezone,
        org: data.org || data.company || "",
        utc: data.utc_offset,
      };

      setPayload(payload);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      dispatch({ type: "close-modal" });
    }
  }
  return (
    <Container>
      <PElement>Do you want to use your IP address?</PElement>

      <GroupedDiv>
        <Modal.CloseModal>
          <ButtonNo>No</ButtonNo>
        </Modal.CloseModal>
        <ButtonYes onClick={onRequestIp}>
          {isLoading ? <Spinner></Spinner> : "Yes"}
        </ButtonYes>
      </GroupedDiv>
    </Container>
  );
}
