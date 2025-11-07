import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/apiClient.js";

export default function RegisterView() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔹 Validaciones básicas
    if (!username.trim() || !email.trim() || !password) {
      setError("Complete todos los campos");
      return;
    }
    if (!validateEmail(email.trim())) {
      setError("Correo electrónico inválido");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await register({
        username: username.trim(),
        email: email.trim(),
        password,
        role,
      });
      alert("✅ Registro exitoso, ahora puede iniciar sesión.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 422 && err.response.data.detail) {
        const detail = Array.isArray(err.response.data.detail)
          ? err.response.data.detail.map(d => d.msg).join(", ")
          : err.response.data.detail;
        setError(`Error de validación: ${detail}`);
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Error al registrar usuario. Intente nuevamente.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-teal-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">
          Crear cuenta
        </h2>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="border p-2 rounded"
            autoComplete="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Contraseña"
            className="border p-2 rounded"
            autoComplete="new-password"
          />
          <input
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            placeholder="Repetir contraseña"
            className="border p-2 rounded"
            autoComplete="new-password"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="user">Cliente</option>
            <option value="doctor">Doctor Veterinario</option>
            <option value="admin">Administrador</option>
          </select>

          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition"
          >
            Crear cuenta
          </button>
        </form>

        <div className="mt-3 text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-teal-600 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
