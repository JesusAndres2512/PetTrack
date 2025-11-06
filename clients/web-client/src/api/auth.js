import { authClient } from "./apiClient";

export const login = async (email, password) => {
  const { data } = await authClient.post("/auth/login", { email, password });
  return data;
};

export const register = async (user) => {
  const { data } = await authClient.post("/auth/register", user);
  return data;
};

export const getProfile = async (token) => {
  const { data } = await authClient.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
