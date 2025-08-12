import api from "./api.js";

export const getRoutes = async () => {
  const res = await api.get("/routes");
  return res.data;
};

export const createRoute = async (routeData) => {
  const res = await api.post("/routes", routeData);
  return res.data;
};

export const deleteRoute = async (id) => {
  const res = await api.delete(`/routes/${id}`);
  return res.data;
};
