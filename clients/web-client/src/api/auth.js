import { authClient } from "./apiClient";

export const login = async ({ username, password }) => {
  const { data } = await authClient.post("/login", {
    username,
    password,
  });
  return data;
};

export const register = async (user) => {
  const { data } = await authClient.post("/register", user);
  return data;
};

export const getProfile = async (token) => {
  const { data } = await authClient.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
