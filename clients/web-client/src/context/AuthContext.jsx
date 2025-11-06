// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, getProfile } from "../api/apiClient.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true); // Para evitar flash de contenido

  // 🔹 Cargar perfil si ya hay token guardado
  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const data = await getProfile();
          setUser(data);
        } catch (err) {
          console.warn("Token inválido o expirado, cerrando sesión", err);
          logout();
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [token]);

  // 🔹 Login
  const login = async ({ username, password }) => {
    try {
      const data = await apiLogin(username, password);

      // 🔹 Guardar token en estado y localStorage
      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);

      // 🔹 Guardar usuario en estado
      const loggedUser = {
        id: data.user_id,
        username: data.username,
        email: data.email,
        role: data.role,
      };
      setUser(loggedUser);

      // 🔹 Retornar usuario para que LoginView pueda usarlo
      return loggedUser;
    } catch (err) {
      console.error("Error en login:", err);
      throw err; // deja que LoginView maneje el error
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
      {children}
    </AuthContext.Provider>
  );
};
