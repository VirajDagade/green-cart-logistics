import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import csv from "csv-parser";
import Driver from "../models/Driver.js";
import Route from "../models/Route.js";
import Order from "../models/Order.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const importCSV = (filePath, model, transformFn) => {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => data.push(transformFn(row)))
      .on("end", async () => {
        try {
          await model.deleteMany();
          await model.insertMany(data);
          console.log(
            `Imported ${data.length} records into ${model.modelName}`
          );
          resolve();
        } catch (err) {
          reject(err);
        }
      });
  });
};

try {
  await importCSV("./data/drivers.csv", Driver, (row) => ({
    name: row.name,
    shift_hours: Number(row.shift_hours),
    past_week_hours: row.past_week_hours.split("|").map(Number),
  }));

  await importCSV("./data/routes.csv", Route, (row) => ({
    route_id: Number(row.route_id),
    distance_km: Number(row.distance_km),
    traffic_level: row.traffic_level,
    base_time_min: Number(row.base_time_min),
  }));

  await importCSV("./data/orders.csv", Order, (row) => ({
    order_id: Number(row.order_id),
    value_rs: Number(row.value_rs),
    route_id: Number(row.route_id),
    delivery_time: row.delivery_time,
  }));

  console.log("✅ All data imported successfully");
  process.exit();
} catch (error) {
  console.error(error);
  process.exit(1);
}
