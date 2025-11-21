// src/services/authService.js
import axios from "axios";

// URL base del API Gateway
const API_URL = import.meta.env.VITE_API_GATEWAY + "/auth" || "https://api-gateway-apppettrack.azure-api.net";

// Instancia de Axios para centralizar configuración
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // útil si usas cookies JWT
});

// Login de usuario
export const login = async (data) => {
  try {
    const res = await api.post("/login", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al iniciar sesión" };
  }
};

// Registro de usuario
export const register = async (data) => {
  try {
    const res = await api.post("/register", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al registrar usuario" };
  }
};

// Obtener usuarios (ruta que debe existir en el Auth-Service)
export const getUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al obtener usuarios" };
  }
};
