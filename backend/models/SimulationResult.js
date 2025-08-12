import mongoose from "mongoose";

const simulationResultSchema = new mongoose.Schema({
  inputs: { type: Object, required: true },
  results: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("SimulationResult", simulationResultSchema);
