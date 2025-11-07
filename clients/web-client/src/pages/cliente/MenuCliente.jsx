import React from "react";
import Navbar from "../../components/Navbar.jsx";
import MainMenu from "../../components/MainMenu.jsx";

export default function MenuCliente() {
  const items = [
    { to: "/cliente/MascotasView", label: "Mis Mascotas" },
    { to: "/cliente/CitasClienteView", label: "Reservar Cita" },
    { to: "/cliente/historial", label: "Historial de Citas" },
    { to: "/cliente/DashboardCliente", label: "Mi Perfil" },
  ];

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MainMenu title="Cliente" items={items} />
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold text-lg text-teal-700">
              Bienvenido a PetTrack 🐾
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Gestiona tus mascotas, reserva citas y revisa tu historial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
