import React, { useState, useEffect } from "react";
import { getOrders, createOrder, deleteOrder } from "../api/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [valueRs, setValueRs] = useState("");
  const [assignedRoute, setAssignedRoute] = useState("");
  const [deliveryTimestamp, setDeliveryTimestamp] = useState("");

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAddOrder = async () => {
    if (!orderId || !valueRs || !assignedRoute || !deliveryTimestamp) {
      alert("Please fill all fields");
      return;
    }
    await createOrder({
      order_id: orderId,
      value_rs: Number(valueRs),
      assigned_route: assignedRoute,
      delivery_timestamp: deliveryTimestamp,
    });
    setOrderId("");
    setValueRs("");
    setAssignedRoute("");
    setDeliveryTimestamp("");
    fetchOrders();
  };

  const handleDeleteOrder = async (id) => {
    await deleteOrder(id);
    fetchOrders();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <div className="mb-4 flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Value (₹)"
          value={valueRs}
          onChange={(e) => setValueRs(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Assigned Route ID"
          value={assignedRoute}
          onChange={(e) => setAssignedRoute(e.target.value)}
          className="border p-2"
        />
        <input
          type="datetime-local"
          value={deliveryTimestamp}
          onChange={(e) => setDeliveryTimestamp(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={handleAddOrder}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Order
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Value (₹)</th>
            <th className="p-2 border">Assigned Route</th>
            <th className="p-2 border">Delivery Time</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td className="p-2 border">{o.order_id}</td>
              <td className="p-2 border">{o.value_rs}</td>
              <td className="p-2 border">{o.assigned_route}</td>
              <td className="p-2 border">
                {new Date(o.delivery_timestamp).toLocaleString()}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDeleteOrder(o._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="5" className="p-3 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
