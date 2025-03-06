import { createContext, useState, useEffect, useContext } from "react";

const MobileContext = createContext(false);

export const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>;
};

export const useMobile = () => useContext(MobileContext);
