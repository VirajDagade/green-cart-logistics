import React, { useContext } from "react";
import { SimulationContext } from "../contexts/SimulationContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const { lastResult } = useContext(SimulationContext);

  if (!lastResult) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
        <p>No simulation data yet. Run a simulation to see KPIs.</p>
      </div>
    );
  }

  const chartData = [
    { name: "On-time", value: lastResult.onTimeDeliveries },
    { name: "Late", value: lastResult.lateDeliveries },
  ];

  const fuelData = [
    { name: "Fuel Cost", value: parseFloat(lastResult.fuelCostTotal) },
    { name: "Remaining Profit", value: parseFloat(lastResult.totalProfit) },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-gray-500 text-sm">Total Profit</h2>
          <p className="text-xl font-bold">₹{lastResult.totalProfit}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-gray-500 text-sm">Efficiency</h2>
          <p className="text-xl font-bold">{lastResult.efficiencyScore}%</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-gray-500 text-sm">On-time</h2>
          <p className="text-xl font-bold">{lastResult.onTimeDeliveries}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-gray-500 text-sm">Late</h2>
          <p className="text-xl font-bold">{lastResult.lateDeliveries}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-gray-500 text-sm">Fuel Cost</h2>
          <p className="text-xl font-bold">₹{lastResult.fuelCostTotal}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg mb-4">On-time vs Late Deliveries</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg mb-4">Fuel Cost Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={fuelData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {fuelData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
