import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  route_id: { type: String, required: true, unique: true },
  distance_km: { type: Number, required: true },
  traffic_level: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  base_time: { type: Number, required: true }, // in minutes
});

export default mongoose.model("Route", routeSchema);
