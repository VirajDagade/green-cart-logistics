import Route from "../models/Route.js";

// Get all routes
export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching routes" });
  }
};

// Create route
export const createRoute = async (req, res) => {
  const { route_id, distance_km, traffic_level, base_time } = req.body;

  if (!route_id || distance_km == null || !traffic_level || base_time == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newRoute = new Route({
      route_id,
      distance_km,
      traffic_level,
      base_time,
    });
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(500).json({ message: "Error creating route" });
  }
};

// Delete route
export const deleteRoute = async (req, res) => {
  try {
    await Route.findByIdAndDelete(req.params.id);
    res.json({ message: "Route deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting route" });
  }
};
