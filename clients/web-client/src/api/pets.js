import { petsClient } from "./apiClient";

export const getPets = async () => {
  const { data } = await petsClient.get("/pets");
  return data;
};

export const createPet = async (pet) => {
  const { data } = await petsClient.post("/pets", pet);
  return data;
};
