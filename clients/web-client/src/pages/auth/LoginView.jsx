// src/pages/auth/LoginView.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function LoginView() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Complete todos los campos");
      return;
    }

    try {
      // 🔹 Llama a login desde AuthContext
      const data = await login({ username: username.trim(), password });

      // 🔹 Redirección según rol
      switch (data.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "doctor":
          navigate("/doctor/dashboard");
          break;
        case "user":
          navigate("/user/dashboard");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      console.error("Error en login:", err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Credenciales inválidas o error en el servidor.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">Iniciar sesión</h2>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
            className="border p-2 rounded"
            autoComplete="username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Contraseña"
            className="border p-2 rounded"
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-3 text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-teal-600 hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}
