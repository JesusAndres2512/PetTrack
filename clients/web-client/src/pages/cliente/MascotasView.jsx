import React, { useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import PetCard from "../../components/PetCard.jsx";

export default function MascotasView() {
  const [pets, setPets] = useState([
    { id: 1, name: "Firulais", species: "Perro", age: 3, weight: 12 },
    { id: 2, name: "Misu", species: "Gato", age: 2, weight: 4 },
  ]);

  const handleDelete = (id) => setPets(pets.filter((p) => p.id !== id));

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-teal-700">
          Mis Mascotas
        </h2>
        <div className="grid gap-4">
          {pets.map((p) => (
            <PetCard
              key={p.id}
              pet={p}
              onView={() => {}}
              onEdit={() => {}}
              onDelete={() => handleDelete(p.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
