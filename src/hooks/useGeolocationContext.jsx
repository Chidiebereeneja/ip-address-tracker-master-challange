import { createContext, useContext, useState } from "react"


const GeoLocation = createContext()

const GeoLocationProvider = function({children}) {
    const [isLoading, setIsLoading] = useState(false);
      const [position, setPosition] = useState({});
      const [error, setError] = useState(null);
    
      function getPosition() {
        if (!navigator.geolocation)
          return setError("Your browser does not support geolocation");
    
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            });
            setIsLoading(false);
          },
          (error) => {
            setError(error.message);
            setIsLoading(false);
          }
        );
      }
    
    //   return { isLoading, position, error, getPosition };

    return (
        <GeoLocation.Provider value={{isLoading, position, error, getPosition}}>
            {children}
        </GeoLocation.Provider>
    )
}

function UseGeolocation() {
    const context = useContext(GeoLocation)
    return context
}



export {GeoLocationProvider, UseGeolocation}