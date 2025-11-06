import axios from "axios";

const API_BASE = import.meta.env.VITE_API_GATEWAY;

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Interceptor JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ===== Autenticación =====
export const login = async (username, password) => {
  const { data } = await apiClient.post("/auth/login", { username, password });
  return data;
};

export const register = async ({ username, email, password, role }) => {
  const { data } = await apiClient.post("/auth/register", { username, email, password, role });
  return data;
};

export const getProfile = async () => {
  const { data } = await apiClient.get("/auth/profile");
  return data;
};

export const getUsers = async () => {
  const { data } = await apiClient.get("/auth/users");
  return data;
};

// ===== Mascotas =====
export const getPets = async () => {
  const { data } = await apiClient.get("/pets");
  return data;
};

export const addPet = async (petData) => {
  const { data } = await apiClient.post("/pets", petData);
  return data;
};

// ===== Citas =====
export const getAppointments = async () => {
  const { data } = await apiClient.get("/appointments");
  return data;
};

export const addAppointment = async (appointmentData) => {
  const { data } = await apiClient.post("/appointments", appointmentData);
  return data;
};

// ===== Dashboard =====
export const getDashboard = async () => {
  const { data } = await apiClient.get("/dashboard");
  return data;
};
