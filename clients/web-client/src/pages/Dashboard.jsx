import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../api/apiClient.js";
import { useAuth } from "../context/AuthContext.jsx";
import DashboardAdmin from "./admin/DashboardAdmin.jsx";
import DashboardDoctor from "./doctor/DashboardDoctor.jsx";
import DashboardClient from "./cliente/DashboardClient.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user?.token) return navigate("/login");

    getDashboard().then(data => setMessage(data.message)).catch(() => navigate("/login"));
  }, [user]);

  if (!user?.role) return null;

  switch(user.role) {
    case "admin": return <DashboardAdmin message={message} />;
    case "doctor": return <DashboardDoctor message={message} />;
    default: return <DashboardClient message={message} />;
  }
}
