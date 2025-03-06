import { createContext, useContext, useState } from "react";

const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
  const [isPageLoading, setPageLoading] = useState(false);

  return (
    <AppStateContext.Provider value={{ isPageLoading, setPageLoading }}>
      {children}
    </AppStateContext.Provider>
  );
};