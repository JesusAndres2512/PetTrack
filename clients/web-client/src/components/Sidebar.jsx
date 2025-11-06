import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const links = {
    cliente: [
      { to: "/cliente/dashboard", label: "Inicio" },
      { to: "/cliente/mascotas", label: "Mis Mascotas" },
      { to: "/cliente/citas", label: "Mis Citas" },
    ],
    doctor: [
      { to: "/doctor/dashboard", label: "Inicio" },
      { to: "/doctor/citas", label: "Citas Asignadas" },
      { to: "/doctor/seguimiento", label: "Seguimiento" },
    ],
    admin: [
      { to: "/admin/dashboard", label: "Panel Admin" },
      { to: "/admin/usuarios", label: "Usuarios" },
    ],
  };

  return (
    <div className="bg-[#1e3a3a] text-white w-64 h-screen flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-teal-300">
        PetTrack
      </h2>

      <nav className="flex flex-col gap-2">
        {user &&
          links[user.role]?.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:bg-[#134e4a] px-3 py-2 rounded-md transition"
            >
              {link.label}
            </Link>
          ))}
      </nav>

      <div className="mt-auto text-center">
        <button
          onClick={logout}
          className="bg-teal-600 px-4 py-2 mt-4 rounded-md hover:bg-teal-700 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
