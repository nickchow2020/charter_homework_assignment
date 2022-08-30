import React from 'react';

const GeneralContext = React.createContext();

export function GeneralProvider({ children, transactionData }) {
  return (
    <GeneralContext.Provider value={{ transactionData }}>
      {children}
    </GeneralContext.Provider>
  );
}

export default GeneralContext;
