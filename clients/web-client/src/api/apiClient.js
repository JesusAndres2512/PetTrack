import axios from "axios";

const API_BASE = import.meta.env.VITE_API_GATEWAY;

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
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
// ⚠️ Interceptor de Respuesta
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
// 🧩 AUTENTICACIÓN
// =============================
export const login = async (username, password) => {
  try {
    const { data } = await apiClient.post("/auth/login", { username, password });
    if (data.access_token) localStorage.setItem("token", data.access_token);
    return data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al iniciar sesión" };
  }
};

export const register = async ({ username, email, password, role }) => {
  try {
    const { data } = await apiClient.post("/auth/register", {
      username,
      email,
      password,
      role,
    });
    return data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al registrar usuario" };
  }
};

export const getProfile = async () => {
  try {
    const { data } = await apiClient.get("/auth/profile");
    return data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al obtener perfil" };
  }
};

export const getUsers = async () => {
  try {
    const { data } = await apiClient.get("/auth/users");
    return data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al obtener usuarios" };
  }
};

// 🧑‍💼 Eliminar usuario (solo admin)
export const deleteUser = async (userId) => {
  try {
    const { data } = await apiClient.delete(`/auth/users/${userId}`);
    return data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al eliminar usuario" };
  }
};

// ✏️ Actualizar usuario (solo admin)
export const updateUser = async (userId, updatedData) => {
  try {
    const { data } = await apiClient.put(`/auth/users/${userId}`, updatedData);
    return data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al actualizar usuario" };
  }
};

// =============================
// 🐶 MASCOTAS
// =============================
export const getPets = async () => {
  try {
    const { data } = await apiClient.get("/pets");
    return data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al obtener mascotas" };
  }
};

export const addPet = async (petData) => {
  try {
    const { data } = await apiClient.post("/pets", petData);
    return data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al agregar mascota" };
  }
};

// =============================
// 📅 CITAS
// =============================
export const getAppointments = async () => {
  try {
    const { data } = await apiClient.get("/appointments");
    return data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al obtener citas" };
  }
};

export const addAppointment = async (appointmentData) => {
  try {
    const { data } = await apiClient.post("/appointments", appointmentData);
    return data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al crear cita" };
  }
};

// =============================
// 📊 DASHBOARD
// =============================
export const getDashboard = async () => {
  try {
    const { data } = await apiClient.get("/dashboard");
    return data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al obtener datos del dashboard" };
  }
};

export default apiClient;
