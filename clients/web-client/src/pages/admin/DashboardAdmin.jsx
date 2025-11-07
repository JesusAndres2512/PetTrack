// src/pages/DashboardAdmin.jsx
import Navbar from "../../components/Navbar.jsx"; // ✅ apunta a src/components/Navbar.jsx
import Card from "../../components/Card.jsx";     // ✅ lo mismo para Card
import { useNavigate } from "react-router-dom";


export default function DashboardAdmin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">
          Panel de Administración
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card
            title="Gestión de Usuarios"
            description="Crea, edita o elimina cuentas de usuarios."
            buttonText="Ver Usuarios"
            onClick={() => navigate("/admin/users")}
          />
          <Card
            title="Gestión de Citas"
            description="Revisa y administra las citas registradas."
            buttonText="Ver Citas"
            onClick={() => navigate("/admin/appointments")}
          />
          <Card
            title="Gestión de Mascotas"
            description="Consulta los perfiles de mascotas registradas."
            buttonText="Ver Mascotas"
            onClick={() => navigate("/admin/pets")}
          />
        </div>
      </div>
    </div>
  );
}
