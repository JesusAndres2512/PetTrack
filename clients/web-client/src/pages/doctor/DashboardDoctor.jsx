import Navbar from "../../components/Navbar.jsx";
import Card from "../../components/Card.jsx";
import { useNavigate } from "react-router-dom";

export default function DashboardDoctor() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">
          Panel del Doctor Veterinario
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card
            title="Citas del Día"
            description="Consulta tus citas programadas para hoy."
            buttonText="Ver Citas"
            onClick={() => navigate("/doctor/citas")}
          />
          <Card
            title="Pacientes"
            description="Visualiza y actualiza los historiales médicos de las mascotas."
            buttonText="Ver Mascotas"
            onClick={() => navigate("/doctor/seguimiento")}
          />
        </div>
      </div>
    </div>
  );
}
