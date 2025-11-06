// src/pages/ViewAppointments.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { getAppointments } from "../api/appointmentsService";

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (err) {
        console.error("Error al cargar citas:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">Citas Registradas</h1>
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-100 text-teal-800">
                <th className="p-3">ID</th>
                <th className="p-3">Mascota</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-b hover:bg-teal-50">
                  <td className="p-3">{a.id}</td>
                  <td className="p-3">{a.pet_name || "N/A"}</td>
                  <td className="p-3">{a.date}</td>
                  <td className="p-3">{a.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments.length === 0 && (
            <p className="text-center text-gray-600 mt-6">No hay citas registradas.</p>
          )}
        </div>
      </div>
    </div>
  );
}
