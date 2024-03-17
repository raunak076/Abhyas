import React, { createContext, useState, useContext } from 'react';

// Create a context with an initial value
const myContext = createContext();

// Create a provider component to provide the value to its children
export const ValueContext = ({ children }) => {
  const [value, setValue] = useState(null);

  return (
    <ValueContext.Provider value={{ value, setValue }}>
      {children}
    </ValueContext.Provider>
  );
};

// Custom hook to access the context value
export const useValue = () => useContext(myContext);
