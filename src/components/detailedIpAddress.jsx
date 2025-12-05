import styled from "styled-components";
import { UseIpAddress } from "../hooks/ipAddressContext";

const SectionContainer = styled.section`
  align-self: center;
  background-color: #fff;
  color: #000;
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
`;

const SubContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const SubHeader = styled.h3`
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  color: hsl(0, 0%, 58%);
  line-height: 17px;
`;

const SubPara = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: hsl(0, 0%, 17%);
  line-height: 26px;
`;

export default function DetailedIpAddress() {
  const { payload } = UseIpAddress();

  return (
    <SectionContainer>
      <SubContainer>
        <SubHeader>Ip address</SubHeader>
        <SubPara>{payload?.ip}</SubPara>
      </SubContainer>

      <SubContainer>
        <SubHeader>Location</SubHeader>
        <SubPara>{`${payload?.city || ""}${payload?.city ? "," : ""} ${
          payload?.country || ""
        }`}</SubPara>
      </SubContainer>

      <SubContainer>
        <SubHeader>TimeZone</SubHeader>
        <SubPara>{payload?.utc}</SubPara>
      </SubContainer>

      <SubContainer>
        <SubHeader>ISP</SubHeader>
        <SubPara>{payload?.org}</SubPara>
      </SubContainer>
    </SectionContainer>
  );
}
