import React, { useState, useEffect } from "react";
import { getRoutes, createRoute, deleteRoute } from "../api/routes";

export default function RoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [routeId, setRouteId] = useState("");
  const [distanceKm, setDistanceKm] = useState("");
  const [trafficLevel, setTrafficLevel] = useState("Low");
  const [baseTime, setBaseTime] = useState("");

  const fetchRoutes = async () => {
    const data = await getRoutes();
    setRoutes(data);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleAddRoute = async () => {
    if (!routeId || !distanceKm || !trafficLevel || !baseTime) {
      alert("Please fill all fields");
      return;
    }
    await createRoute({
      route_id: routeId,
      distance_km: Number(distanceKm),
      traffic_level: trafficLevel,
      base_time: Number(baseTime),
    });
    setRouteId("");
    setDistanceKm("");
    setTrafficLevel("Low");
    setBaseTime("");
    fetchRoutes();
  };

  const handleDeleteRoute = async (id) => {
    await deleteRoute(id);
    fetchRoutes();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Routes</h2>
      <div className="mb-4 flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="Route ID"
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Distance (km)"
          value={distanceKm}
          onChange={(e) => setDistanceKm(e.target.value)}
          className="border p-2"
        />
        <select
          value={trafficLevel}
          onChange={(e) => setTrafficLevel(e.target.value)}
          className="border p-2"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input
          type="number"
          placeholder="Base Time (minutes)"
          value={baseTime}
          onChange={(e) => setBaseTime(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={handleAddRoute}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Route
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-2 border">Route ID</th>
            <th className="p-2 border">Distance (km)</th>
            <th className="p-2 border">Traffic Level</th>
            <th className="p-2 border">Base Time (min)</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((r) => (
            <tr key={r._id}>
              <td className="p-2 border">{r.route_id}</td>
              <td className="p-2 border">{r.distance_km}</td>
              <td className="p-2 border">{r.traffic_level}</td>
              <td className="p-2 border">{r.base_time}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDeleteRoute(r._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {routes.length === 0 && (
            <tr>
              <td colSpan="5" className="p-3 text-center text-gray-500">
                No routes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
