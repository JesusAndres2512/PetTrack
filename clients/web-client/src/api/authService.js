// src/services/authService.js
import axios from "axios";
const API_URL = import.meta.env.VITE_API_GATEWAY;

export const login = async (data) => (await axios.post(`${API_URL}/login`, data)).data;
export const register = async (data) => (await axios.post(`${API_URL}/register`, data)).data;
export const getUsers = async () => (await axios.get(`${API_URL}/users`)).data; // agregar endpoint /users en el auth-service

