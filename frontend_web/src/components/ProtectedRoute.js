import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
// PUBLIC_INTERFACE
function ProtectedRoute({ children }) {
  // If not logged in, redirect to login page
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
export default ProtectedRoute;
