import api from "./api.js";

export const getDrivers = async () => {
  const res = await api.get("/drivers");
  return res.data;
};

export const createDriver = async (driverData) => {
  const res = await api.post("/drivers", driverData);
  return res.data;
};

export const deleteDriver = async (id) => {
  const res = await api.delete(`/drivers/${id}`);
  return res.data;
};
