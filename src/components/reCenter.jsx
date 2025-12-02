import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function Recenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && Array.isArray(center) && center.length === 2) {
      map.setView(center, 13, { animate: true });
    }
  }, [center, map]);
  return null;
}
