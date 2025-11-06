// src/pages/ViewUsers.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { getUsers } from "../api/apiClient.js";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">Usuarios Registrados</h1>
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-100 text-teal-800">
                <th className="p-3">ID</th>
                <th className="p-3">Usuario</th>
                <th className="p-3">Correo</th>
                <th className="p-3">Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b hover:bg-teal-50">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role || "Sin rol"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="text-center text-gray-600 mt-6">No hay usuarios registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
