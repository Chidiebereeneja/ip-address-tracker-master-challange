import styled from "styled-components";
import { UseIpAddress } from "../hooks/ipAddressContext";

const SectionContainer = styled.section`
  align-self: center;
  background-color: #fff;
  color: #000;
  max-width: 850px;
  width: 85%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding-inline: 2rem;
  padding-block: 1rem;
  position: absolute;
  z-index: 50;
  top: 150px;
  border-radius: 10px;
  box-shadow: 0px 0px 100px #00000044;

  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    height: fit-content;
    top: 120px;
  }
`;

const SubContainer = styled.section`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SubHeader = styled.h3`
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  color: hsl(0, 0%, 58%);
  line-height: 17px;

  @media (max-width: 768px) {
    color: hsl(0, 0%, 27.450980392156865%);
    width: 100%;
    text-align: center;
  }
`;

const SubPara = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: hsl(0, 0%, 17%);
  line-height: 26px;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const LineIndicator = styled.div`
  height: 100%;
  width: 1.1px;
  background-color: hsla(0, 0%, 72.15686274509804%, 0.671);

  @media (max-width: 768px) {
    display: none;
  }
`;

const UtcFormatter = (str) => `UTC${str?.slice(0, 3)}:${str?.slice(3, 5)}`;

export default function DetailedIpAddress() {
  const { payload } = UseIpAddress();

  return (
    <SectionContainer>
      <SubContainer>
        <SubHeader>Ip address</SubHeader>
        <SubPara>{payload?.ip}</SubPara>
      </SubContainer>

      <LineIndicator />

      <SubContainer>
        <SubHeader>Location</SubHeader>
        <SubPara>{`${payload?.city || ""}${payload?.city ? "," : ""} ${
          payload?.country || ""
        }`}</SubPara>
      </SubContainer>

      <LineIndicator />

      <SubContainer>
        <SubHeader>TimeZone</SubHeader>
        <SubPara>{payload?.utc ? UtcFormatter(payload?.utc) : ""} </SubPara>
      </SubContainer>

      <LineIndicator />

      <SubContainer>
        <SubHeader>ISP</SubHeader>
        <SubPara>{payload?.org}</SubPara>
      </SubContainer>
    </SectionContainer>
  );
}
