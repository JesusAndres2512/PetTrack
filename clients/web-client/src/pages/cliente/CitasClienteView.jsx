import React, { useState } from "react";
import Navbar from "../../components/Navbar.jsx";

export default function CitasClienteView() {
  const [citas, setCitas] = useState([
    { id: 1, pet: "Firulais", date: "2025-11-10", time: "10:00", status: "Pendiente" },
  ]);
  const [form, setForm] = useState({ pet: "Firulais", date: "", time: "", reason: "" });
  const [mensaje, setMensaje] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!form.date || !form.time || !form.reason) {
      setMensaje("Completa todos los campos");
      return;
    }

    setCitas([
      ...citas,
      { id: Date.now(), pet: form.pet, date: form.date, time: form.time, status: "Pendiente" },
    ]);

    setForm({ ...form, date: "", time: "", reason: "" });
    setMensaje("✅ Cita reservada correctamente");
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="font-semibold mb-2 text-teal-700">Reservar cita</h3>
          {mensaje && <p className="text-sm text-green-600 mb-2">{mensaje}</p>}
          <form onSubmit={submit} className="flex flex-col gap-2">
            <input
              value={form.pet}
              onChange={(e) => setForm({ ...form, pet: e.target.value })}
              className="border p-2 rounded"
              placeholder="Mascota"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="Motivo"
              className="border p-2 rounded"
            />
            <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition">
              Reservar
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="font-semibold mb-2 text-teal-700">Mis citas</h3>
          <ul className="space-y-2">
            {citas.map((c) => (
              <li
                key={c.id}
                className="flex justify-between items-center p-2 border rounded"
              >
                <div>
                  <div className="font-medium">{c.pet}</div>
                  <div className="text-sm text-gray-500">
                    {c.date} • {c.time}
                  </div>
                </div>
                <div className="text-sm px-3 py-1 rounded bg-yellow-100 text-yellow-800">
                  {c.status}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
