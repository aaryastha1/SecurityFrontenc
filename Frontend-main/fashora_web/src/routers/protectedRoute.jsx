// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/authProvider";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If allowedRoles is passed and user's role is not allowed → redirect to home
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  // Allowed → render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
