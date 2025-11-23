import React, { createContext, useContext, useState, useMemo } from 'react';

export const LayoutContext = createContext(null);

export const LayoutProvider = ({ children, initialOpen = true }) => {
  const [openMenu, setOpenMenu] = useState(initialOpen);
  const openWidth = 240;
  const closeWidth = 75;

  const drawerWidth = useMemo(
    () => (openMenu ? openWidth : closeWidth),
    [openMenu]
  );

  const value = useMemo(
    () => ({ openMenu, setOpenMenu, openWidth, closeWidth, drawerWidth }),
    [openMenu, openWidth, closeWidth, drawerWidth]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export const useLayout = () => {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within AppTheme");
  return ctx;
}

export default LayoutContext;
