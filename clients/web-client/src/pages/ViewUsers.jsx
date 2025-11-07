// src/pages/ViewUsers.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { getUsers, deleteUser, updateUser } from "../api/apiClient.js"; // 🔹 nuevos métodos

export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "", role: "" });

  // --- Cargar usuarios ---
  const fetchData = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Eliminar usuario ---
  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        console.error("Error al eliminar usuario:", err);
        alert("No se pudo eliminar el usuario.");
      }
    }
  };

  // --- Preparar edición ---
  const startEdit = (user) => {
    setEditingUser(user.id);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  // --- Guardar edición ---
  const handleEditSave = async () => {
    try {
      await updateUser(editingUser, formData);
      setEditingUser(null);
      await fetchData();
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      alert("No se pudo actualizar el usuario.");
    }
  };

  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">
          Usuarios Registrados
        </h1>

        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-100 text-teal-800">
                <th className="p-3">Usuario</th>
                <th className="p-3">Correo</th>
                <th className="p-3">Rol</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b hover:bg-teal-50">
                  
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role || "Sin rol"}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => startEdit(u)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center text-gray-600 mt-6">
              No hay usuarios registrados.
            </p>
          )}
        </div>

        {/* --- Modal o formulario de edición simple --- */}
        {editingUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4 text-center text-teal-700">
                Editar Usuario
              </h2>
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="email"
                placeholder="Correo"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border p-2 mb-3 rounded"
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full border p-2 mb-3 rounded"
              >
                <option value="user">Usuario</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Administrador</option>
              </select>
              <div className="flex justify-between">
                <button
                  onClick={() => setEditingUser(null)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditSave}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-lg"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
