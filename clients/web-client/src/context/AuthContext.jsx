// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, getProfile } from "../api/apiClient.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true); // Evita el flash de contenido mientras carga el estado

  // 🔹 Cargar perfil si ya hay token guardado
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        console.warn(
          "Token inválido o expirado. No se cerrará sesión automáticamente en login fallido.",
          err
        );
        // 🔹 Solo cerrar sesión si ya había usuario autenticado antes
        if (user) logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // 🔹 Login
  const login = async ({ username, password }) => {
    try {
      const data = await apiLogin(username, password);

      // 🔹 Guardar token en estado y localStorage
      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);

      // 🔹 Crear objeto de usuario con los datos devueltos
      const loggedUser = {
        id: data.user_id,
        username: data.username,
        email: data.email,
        role: data.role,
      };
      setUser(loggedUser);

      // 🔹 Retornar usuario para redirección
      return loggedUser;
    } catch (err) {
      console.error("Error en login:", err);
      throw err; // Deja que el LoginView maneje el error
    }
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
