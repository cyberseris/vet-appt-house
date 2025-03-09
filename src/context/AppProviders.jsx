import { AppStateProvider } from "./AppStateContext";
import { MobileProvider } from "./MobileContext";
// import { AuthProvider } from "./AuthContext";

const AppProviders = ({ children }) => {
  return (
    // <AuthProvider>
    <AppStateProvider>
      <MobileProvider>{children}</MobileProvider>
    </AppStateProvider>
    // </AuthProvider>
  );
};

export default AppProviders;
