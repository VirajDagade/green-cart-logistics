import React, { useState, useContext } from "react";
import api from "../api/api";
import { SimulationContext } from "../contexts/SimulationContext";

export default function Simulation() {
  const { lastResult, setLastResult } = useContext(SimulationContext);

  const [availableDrivers, setAvailableDrivers] = useState(1);
  const [startTime, setStartTime] = useState("09:00");
  const [maxHoursPerDriver, setMaxHoursPerDriver] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isValid =
    availableDrivers > 0 && maxHoursPerDriver > 0 && startTime.trim() !== "";

  const runSimulation = async (e) => {
    e.preventDefault();
    if (!isValid) {
      setError("Please enter valid inputs.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/simulation", {
        // <-- Fixed path here
        availableDrivers,
        startTime,
        maxHoursPerDriver,
      });
      setLastResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Simulation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Run Simulation</h1>
      <form
        className="bg-white p-4 rounded shadow max-w-lg"
        onSubmit={runSimulation}
      >
        <label className="block mb-2">Available Drivers:</label>
        <input
          type="number"
          className="border p-2 w-full mb-4"
          value={availableDrivers}
          onChange={(e) => setAvailableDrivers(Number(e.target.value))}
          min="1"
        />

        <label className="block mb-2">Start Time:</label>
        <input
          type="time"
          className="border p-2 w-full mb-4"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label className="block mb-2">Max Hours per Driver:</label>
        <input
          type="number"
          className="border p-2 w-full mb-4"
          value={maxHoursPerDriver}
          onChange={(e) => setMaxHoursPerDriver(Number(e.target.value))}
          min="1"
        />

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <button
          disabled={loading || !isValid}
          className={`px-4 py-2 rounded text-white ${
            loading || !isValid ? "bg-gray-400" : "bg-green-600"
          }`}
        >
          {loading ? "Running..." : "Run Simulation"}
        </button>
      </form>

      {lastResult && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-lg">
          <h2 className="text-xl font-semibold mb-2">
            Last Simulation Result:
          </h2>
          <pre className="whitespace-pre-wrap break-word text-sm">
            {JSON.stringify(lastResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
