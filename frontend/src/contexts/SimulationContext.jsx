import React, { createContext, useState } from "react";

export const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const [lastResult, setLastResult] = useState(null);
  return (
    <SimulationContext.Provider value={{ lastResult, setLastResult }}>
      {children}
    </SimulationContext.Provider>
  );
};
