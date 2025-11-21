import axios from "axios";

const API_BASE = import.meta.env.VITE_API_GATEWAY
  ? `${import.meta.env.VITE_API_GATEWAY}/auth`
  : "https://api-gateway-apppettrack.azure-api.net/auth";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // API Management NO usa cookies
});

// ===== JWT =====
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ===== Manejo de 401 =====
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// ===== AUTH =====
export const login = async (username, password) => {
  const { data } = await apiClient.post("/login", { username, password });
  if (data.access_token) localStorage.setItem("token", data.access_token);
  return data;
};

export const register = async (payload) => {
  const { data } = await apiClient.post("/register", payload);
  return data;
};

export const getProfile = async () => {
  const { data } = await apiClient.get("/profile");
  return data;
};

// ===== USERS =====
export const getUsers = async () => {
  const { data } = await apiClient.get("/users");
  return data;
};

export const deleteUser = async (userId) => {
  const { data } = await apiClient.delete(`/users/${userId}`);
  return data;
};

export const updateUser = async (userId, updatedData) => {
  const { data } = await apiClient.put(`/users/${userId}`, updatedData);
  return data;
};

// ===== PETS =====
export const getPets = async () => {
  const { data } = await apiClient.get("/pets");
  return data;
};

export const addPet = async (petData) => {
  const { data } = await apiClient.post("/pets", petData);
  return data;
};

// ===== APPOINTMENTS =====
export const getAppointments = async () => {
  const { data } = await apiClient.get("/appointments");
  return data;
};

export const addAppointment = async (appointmentData) => {
  const { data } = await apiClient.post("/appointments", appointmentData);
  return data;
};

// ===== DASHBOARD =====
export const getDashboard = async () => {
  const { data } = await apiClient.get("/dashboard");
  return data;
};

export default apiClient;
