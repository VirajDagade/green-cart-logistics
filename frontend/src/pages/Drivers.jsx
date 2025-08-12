import React, { useState, useEffect } from "react";
import { getDrivers, createDriver, deleteDriver } from "../api/drivers";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState("");
  const [shiftHours, setShiftHours] = useState("");
  const [pastWeekHours, setPastWeekHours] = useState("");

  const fetchDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setDrivers([]);
      alert("Failed to load drivers. Check console for details.");
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleAddDriver = async () => {
    if (!name || !shiftHours || !pastWeekHours) {
      alert("Please fill all fields");
      return;
    }
    const pastHoursArray = pastWeekHours
      .split(",")
      .map((h) => Number(h.trim()))
      .filter((h) => !isNaN(h));

    try {
      await createDriver({
        name,
        shift_hours: Number(shiftHours),
        past_week_hours: pastHoursArray,
      });
      setName("");
      setShiftHours("");
      setPastWeekHours("");
      fetchDrivers();
    } catch (error) {
      console.error("Error adding driver:", error);
      alert("Failed to add driver. Check console for details.");
    }
  };

  const handleDeleteDriver = async (id) => {
    try {
      await deleteDriver(id);
      fetchDrivers();
    } catch (error) {
      console.error("Error deleting driver:", error);
      alert("Failed to delete driver. Check console for details.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Drivers</h2>
      <div className="mb-4 flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="Driver Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Shift Hours"
          value={shiftHours}
          onChange={(e) => setShiftHours(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Past Week Hours (comma separated)"
          value={pastWeekHours}
          onChange={(e) => setPastWeekHours(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={handleAddDriver}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Driver
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Shift Hours</th>
            <th className="p-2 border">Past Week Hours</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => (
            <tr key={d._id}>
              <td className="p-2 border">{d.name}</td>
              <td className="p-2 border">{d.shift_hours}</td>
              <td className="p-2 border">{d.past_week_hours.join(", ")}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDeleteDriver(d._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {drivers.length === 0 && (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-500">
                No drivers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
