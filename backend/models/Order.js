import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  order_id: { type: String, required: true, unique: true },
  value_rs: { type: Number, required: true },
  assigned_route: { type: String, required: true }, // stores route_id
  delivery_timestamp: { type: Date, required: true },
});

export default mongoose.model("Order", orderSchema);
