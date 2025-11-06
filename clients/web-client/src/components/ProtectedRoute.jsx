// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * ProtectedRoute
 * Props:
 * - allowedRoles: array de roles permitidos
 * Comportamiento:
 * - Si no hay usuario → redirige a /login
 * - Si el usuario no tiene un rol permitido → redirige a su dashboard
 * - Si el usuario tiene rol permitido → renderiza <Outlet />
 */
export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, loading } = useAuth();

  // 🔹 Mientras carga el usuario (token en localStorage), mostramos null o spinner
  if (loading) return null;

  // 🔹 Si no hay usuario autenticado, redirige a login
  if (!user) return <Navigate to="/login" replace />;

  // 🔹 Si el rol del usuario no está permitido, redirige a su dashboard
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  // 🔹 Usuario autorizado, renderiza la ruta protegida
  return <Outlet />;
}
