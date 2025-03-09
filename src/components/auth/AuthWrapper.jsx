import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default AuthWrapper;
