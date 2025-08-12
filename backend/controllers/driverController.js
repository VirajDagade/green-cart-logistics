import Driver from "../models/Driver.js";

// Get all drivers
export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drivers" });
  }
};

// Create driver
export const createDriver = async (req, res) => {
  const { name, shift_hours, past_week_hours } = req.body;

  if (!name || shift_hours == null || !Array.isArray(past_week_hours)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newDriver = new Driver({ name, shift_hours, past_week_hours });
    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ message: "Error creating driver" });
  }
};

// Delete driver
export const deleteDriver = async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: "Driver deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting driver" });
  }
};
