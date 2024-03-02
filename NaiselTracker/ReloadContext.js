// ReloadContext.js
import React, { createContext, useState, useContext } from 'react';

const ReloadContext = createContext();

export const useReload = () => useContext(ReloadContext);

export const ReloadProvider = ({ children }) => {
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const triggerReload = () => setReloadTrigger(prev => !prev);

  return (
    <ReloadContext.Provider value={{ triggerReload }}>
      {children}
    </ReloadContext.Provider>
  );
};
