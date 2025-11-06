import React from "react";
import Navbar from "../../components/Navbar.jsx";
import MainMenu from "../../components/MainMenu.jsx";

export default function MenuDoctor() {
  const items = [
    { to: "/doctor/dashboard", label: "Agenda de Citas" },
    { to: "/doctor/citas", label: "Pacientes" },
    { to: "/doctor/seguimiento", label: "Seguimiento" },
    { to: "/doctor/perfil", label: "Perfil" },
  ];

  return (
    <>
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <MainMenu title="Doctor Veterinario" items={items} />
        <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-teal-700 mb-2">Panel del doctor</h3>
          <p className="text-gray-600 text-sm">
            Administra tus citas, pacientes y reportes médicos desde este panel.
          </p>
        </div>
      </div>
    </>
  );
}
