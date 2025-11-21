// clients/web-client/src/api/apiClient.js
import axios from "axios";

// =============================
// 🌐 BASE URL (API Gateway)
// =============================
const API_BASE =
  (import.meta.env.VITE_API_GATEWAY + "/auth") ||
  "https://api-gateway-apppettrack.azure-api.net/auth";

// =============================
// 🔧 Instancia única Axios
// =============================
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, 
});

// =============================
// 🔒 Interceptor JWT
// =============================
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// =============================
// ⚠️ Interceptor 401
// =============================
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// =============================
// 🧩 AUTH
// =============================
export const login = async (username, password) => {
  const { data } = await apiClient.post("/login", { username, password });
  if (data.access_token) localStorage.setItem("token", data.access_token);
  return data;
};

export const register = async ({ username, email, password, role }) => {
  const { data } = await apiClient.post("/register", {
    username,
    email,
    password,
    role,
  });
  return data;
};

export const getProfile = async () => {
  const { data } = await apiClient.get("/profile");
  return data;
};

// =============================
// 👥 USERS
// =============================
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

// =============================
// 🐶 PETS
// =============================
export const getPets = async () => {
  const { data } = await apiClient.get("/pets");
  return data;
};

export const addPet = async (petData) => {
  const { data } = await apiClient.post("/pets", petData);
  return data;
};

// =============================
// 📅 APPOINTMENTS
// =============================
export const getAppointments = async () => {
  const { data } = await apiClient.get("/appointments");
  return data;
};

export const addAppointment = async (appointmentData) => {
  const { data } = await apiClient.post("/appointments", appointmentData);
  return data;
};

// =============================
// 📊 DASHBOARD
// =============================
export const getDashboard = async () => {
  const { data } = await apiClient.get("/dashboard");
  return data;
};

// =============================
export default apiClient;
