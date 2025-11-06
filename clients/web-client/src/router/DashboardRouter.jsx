// src/router/DashboardRouter.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function DashboardRouter({ allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    return <div className="text-center text-red-600 mt-10">
      No tienes permisos para acceder a este dashboard.
    </div>;
  }

  return <Outlet />;
}
