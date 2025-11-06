import { appointmentsClient } from "./apiClient";

export const getAppointments = async () => {
  const { data } = await appointmentsClient.get("/appointments");
  return data;
};

export const createAppointment = async (appointment) => {
  const { data } = await appointmentsClient.post("/appointments", appointment);
  return data;
};
