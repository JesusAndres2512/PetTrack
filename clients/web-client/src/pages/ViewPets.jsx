// src/pages/ViewPets.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { getPets } from "../api/petsService";

export default function ViewPets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPets();
        setPets(data);
      } catch (err) {
        console.error("Error al cargar mascotas:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">Mascotas Registradas</h1>
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-100 text-teal-800">
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Especie</th>
                <th className="p-3">Edad</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((p) => (
                <tr key={p.id} className="border-b hover:bg-teal-50">
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.species}</td>
                  <td className="p-3">{p.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {pets.length === 0 && (
            <p className="text-center text-gray-600 mt-6">No hay mascotas registradas.</p>
          )}
        </div>
      </div>
    </div>
  );
}
