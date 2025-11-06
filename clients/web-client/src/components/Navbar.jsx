import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-teal-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">🐾 PetTrack</h1>
        <div className="flex gap-4">
          <Link to="/dashboard/admin" className="hover:text-teal-200">
            Admin
          </Link>
          <Link to="/dashboard/doctor" className="hover:text-teal-200">
            Doctor
          </Link>
          <Link to="/dashboard/owner" className="hover:text-teal-200">
            Dueño
          </Link>
          <Link to="/login" className="hover:text-red-200">
            Salir
          </Link>
        </div>
      </div>
    </nav>
  );
}
