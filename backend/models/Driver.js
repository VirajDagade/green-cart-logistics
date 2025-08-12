import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shift_hours: { type: Number, required: true },
  past_week_hours: { type: [Number], required: true },
});

// Use this to prevent OverwriteModelError:
const Driver = mongoose.models.Driver || mongoose.model("Driver", driverSchema);

export default Driver;
