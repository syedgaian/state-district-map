import React, { createContext, useState, useContext } from "react";

const GeoJsonContext = createContext();

export const GeoJsonProvider = ({ children }) => {
  const [geoJson, setGeoJson] = useState(null);

  return (
    <GeoJsonContext.Provider value={{ geoJson, setGeoJson }}>
      {children}
    </GeoJsonContext.Provider>
  );
};

export const useGeoJson = () => useContext(GeoJsonContext);
