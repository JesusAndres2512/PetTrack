import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx";
import { getPets } from "../../api/apiClient.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function DashboardCliente() {
  const { token } = useAuth();
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

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

        {/* 🔹 Botón para ir a la vista de recompensas */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/user/rewards")}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            🎁 Ver Recompensas
          </button>
        </div>

        {/* 🔹 Listado de mascotas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
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
