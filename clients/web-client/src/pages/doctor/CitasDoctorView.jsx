import React, { useState } from "react";
import Navbar from "../../components/Navbar.jsx";

export default function CitasDoctorView() {
  const [citas, setCitas] = useState([
    { id: 1, pet: "Firulais", date: "2025-11-10", time: "10:00", status: "Pendiente" },
  ]);

  const updateStatus = (id, status) =>
    setCitas(citas.map((c) => (c.id === id ? { ...c, status } : c)));

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-teal-700">Citas Asignadas</h2>
        <div className="space-y-3">
          {citas.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-lg">{c.pet}</div>
                <div className="text-sm text-gray-500">
                  {c.date} • {c.time}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Estado: <span className="font-medium">{c.status}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(c.id, "En curso")}
                  className="px-3 py-1 rounded bg-yellow-100 text-yellow-800"
                >
                  En curso
                </button>
                <button
                  onClick={() => updateStatus(c.id, "Finalizada")}
                  className="px-3 py-1 rounded bg-green-100 text-green-800"
                >
                  Finalizar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
