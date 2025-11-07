import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-teal-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/admin/dashboard" className="hover:text-red-200">
        <h1 className="text-xl font-bold tracking-wide">🐾 PetTrack</h1>
        </Link>

        <div className="flex gap-4">
          <Link to="/login" className="hover:text-red-200">
            Salir
          </Link>
        </div>
      </div>
    </nav>
  );
}
