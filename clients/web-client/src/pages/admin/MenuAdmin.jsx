import React from "react";
import NavBar from "../../components/Navbar.jsx";
import MainMenu from "../../components/MainMenu.jsx";

export default function MenuAdmin() {
  const items = [
    { to: "/admin/dashboard", label: "Dashboard General" },
    { to: "/admin/usuarios", label: "Usuarios" },
    { to: "/admin/doctores", label: "Doctores" },
    { to: "/admin/clientes", label: "Clientes" },
    { to: "/admin/reportes", label: "Reportes" },
  ];

  return (
    <div className="min-h-screen bg-teal-50">
      <NavBar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        <MainMenu title="Administrador" items={items} />
        <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-teal-700 mb-4">
            Panel de administración
          </h2>
          <p className="text-gray-600">
            Selecciona una de las opciones del menú para administrar el sistema.
          </p>
        </div>
      </div>
    </div>
  );
}
