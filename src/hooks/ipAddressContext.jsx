import { createContext, useContext, useState } from "react";

const IpAddressContext = createContext();

export default function IpAddressProvider({ children }) {
  const [payload, setPayload] = useState({});

  return (
    <IpAddressContext.Provider value={{ payload, setPayload }}>
      {children}
    </IpAddressContext.Provider>
  );
}

export function UseIpAddress() {
  const context = useContext(IpAddressContext);

  if (!context)
    throw new Error(
      "You can not use the IP address context outside it's root!"
    );

  return context;
}
