import React, { useState } from "react";
import Navbar from "../../components/Navbar.jsx";

export default function SeguimientoView() {
  const [pets] = useState([
    { id: 1, name: "Firulais", species: "Perro", age: 3, weight: 12 },
    { id: 2, name: "Misu", species: "Gato", age: 2, weight: 4 },
  ]);
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState("");

  const save = () => {
    alert(`Seguimiento guardado para ${selected.name}: ${notes}`);
    setNotes("");
  };

  return (
    <>
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <h3 className="font-semibold mb-3 text-teal-700">Pacientes Asignados</h3>
          <div className="space-y-2">
            {pets.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelected(p)}
                className={`p-3 bg-white rounded cursor-pointer hover:shadow transition ${
                  selected?.id === p.id ? "border-2 border-teal-400" : ""
                }`}
              >
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-gray-500">{p.species}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-5">
          {selected ? (
            <>
              <h3 className="font-semibold text-lg text-teal-700">
                {selected.name} — {selected.species}
              </h3>
              <div className="text-sm text-gray-500 mb-3">
                Edad: {selected.age} • Peso: {selected.weight}kg
              </div>

              <div className="mb-3">
                <h4 className="font-medium">Historial Médico</h4>
                <ul className="text-sm text-gray-600 list-disc ml-5">
                  <li>2024-05-10: Vacuna contra la rabia</li>
                  <li>2024-11-01: Desparasitación general</li>
                </ul>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border p-2 rounded mb-2"
                placeholder="Observaciones del seguimiento"
              />
              <div className="flex gap-2">
                <button
                  onClick={save}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
                >
                  Guardar Seguimiento
                </button>
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-center mt-10">
              Selecciona una mascota para ver su historial.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
