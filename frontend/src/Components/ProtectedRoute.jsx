import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // if no token → redirect back to login
  if (!token) {
    return <Navigate to="/secret/superAdmin" replace />;
  }

  return children;
}

export default ProtectedRoute;
