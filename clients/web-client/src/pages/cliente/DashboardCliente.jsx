import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import { getPets } from "../../api/apiClient.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function DashboardCliente() {
  const { token } = useAuth();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(data);
      } catch (err) {
        console.error("Error al obtener mascotas:", err);
      }
    };
    fetchPets();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#0f766e]">Bienvenido a tu panel</h1>
        <p className="text-gray-700 mb-4">Aquí puedes ver tus mascotas registradas.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <div key={pet.id} className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="font-bold text-lg text-[#134e4a]">{pet.name}</h2>
              <p>Edad: {pet.age}</p>
              <p>Especie: {pet.species}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
