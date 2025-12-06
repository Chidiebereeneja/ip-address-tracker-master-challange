import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UseIpAddress } from "../hooks/ipAddressContext";
import { Modal } from "../hooks/modal";
import Spinner from "./spinner";

const Header = styled.header`
  width: 100%;
  height: 200px;
  position: relative;
`;

const Figure = styled.figure`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -10;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 100;
  width: 100%;
  height: 100%;
  margin-top: 10px;
`;

const H1 = styled.h1`
  font-size: 20px;
  letter-spacing: 0.1px;
  color: #fff;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  height: 40px;
  min-width: 300px;
  max-width: 50%;
  padding-inline: 8px;
  font-size: 14px;
  outline: none;
  border: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  color: hsl(0, 0%, 58%);
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsl(0, 0%, 17%);
  color: #fff;
  height: 40px;
  width: 40px;
  border: none;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  cursor: pointer;
`;

export default function MapHeader() {
  const { setPayload } = UseIpAddress();
  const [isLoading, setIsLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");

  async function onSearchIpAddress(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const url = `https://ipapi.co/${ipAddress}/json/`;
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
    }
  }

  return (
    <Header>
      <Figure>
        <Image src="/pattern-bg-desktop.png" className="w-full h-full" />
      </Figure>

      <HeaderTextContainer>
        <H1>IP ADDRESS TRACKER</H1>

        <Form onSubmit={onSearchIpAddress}>
          <Input
            type="text"
            placeholder="Search for any IP address or domain"
            onChange={(e) => setIpAddress(e.target.value)}
          />
          {!ipAddress ? (
            <Modal.OpenModal name="ip_address">
              <Button type="button">
                <FaChevronRight size={11} />
              </Button>
            </Modal.OpenModal>
          ) : (
            <Button type="submit">
              {isLoading ? <Spinner /> : <FaChevronRight size={11} />}
            </Button>
          )}
        </Form>
      </HeaderTextContainer>
    </Header>
  );
}
