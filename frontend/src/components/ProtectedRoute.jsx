import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

export const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};
