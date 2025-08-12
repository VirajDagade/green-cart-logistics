import api from "./api.js";

export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};
