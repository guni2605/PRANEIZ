// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("atoken");
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
