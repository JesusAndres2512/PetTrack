// src/services/petsService.js
import axios from "axios";
const API_URL = import.meta.env.VITE_API_GATEWAY;

export const getPets = async () => (await axios.get(`${API_URL}/pets`)).data;
export const createPet = async (data) => (await axios.post(`${API_URL}/pets`, data)).data;
