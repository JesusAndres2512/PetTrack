import React from "react";

export default function PetCard({ pet, onView, onEdit, onDelete, onFollow }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex gap-4">
      <img
        src={pet.image || "/pet-placeholder.png"}
        alt={pet.name}
        className="w-20 h-20 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="font-semibold">{pet.name}</div>
        <div className="text-sm text-gray-500">
          {pet.species} • {pet.age} años • {pet.weight} kg
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={onView}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition"
          >
            Ver historial
          </button>
          <button
            onClick={onEdit}
            className="px-3 py-1 rounded bg-yellow-100 hover:bg-yellow-200 transition"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 transition"
          >
            Eliminar
          </button>
          {onFollow && (
            <button
              onClick={onFollow}
              className="px-3 py-1 rounded bg-green-100 hover:bg-green-200 transition"
            >
              Hacer seguimiento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
