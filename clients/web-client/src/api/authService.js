// src/services/authService.js
import axios from "axios";

// URL base del servicio de autenticación (Auth Service)
const API_URL = import.meta.env.VITE_API_GATEWAY;

// Todas las rutas del Auth-Service deben comenzar con el prefijo /auth
export const login = async (data) => (
  await axios.post(`${API_URL}/auth/login`, data)
).data;

export const register = async (data) => (
  await axios.post(`${API_URL}/auth/register`, data)
).data;

export const getUsers = async () => (
  await axios.get(`${API_URL}/auth/users`)
).data; 
