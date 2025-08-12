import Driver from "../models/Driver.js";
import Route from "../models/Route.js";
import Order from "../models/Order.js";
import SimulationResult from "../models/SimulationResult.js";

export const runSimulation = async (req, res) => {
  try {
    const { availableDrivers, startTime, maxHoursPerDriver } = req.body;

    if (!availableDrivers || !startTime || !maxHoursPerDriver) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (availableDrivers <= 0) {
      return res.status(400).json({ message: "Invalid number of drivers" });
    }

    const drivers = await Driver.find().limit(availableDrivers);
    const orders = await Order.find();
    const routes = await Route.find();

    let totalProfit = 0;
    let onTimeDeliveries = 0;
    let totalDeliveries = orders.length;
    let fuelCostTotal = 0;

    for (const order of orders) {
      // Fix: Use order.assigned_route to find matching route
      const route = routes.find((r) => r.route_id === order.assigned_route);
      if (!route) continue;

      // Fix: Use route.base_time instead of base_time_min
      let baseTime = route.base_time;

      // Fix: Calculate delivery time from order.delivery_timestamp (Date)
      const deliveryDate = new Date(order.delivery_timestamp);
      const deliveryTimeMinutes =
        deliveryDate.getHours() * 60 + deliveryDate.getMinutes();

      // Rule 2: Driver Fatigue - check if past_week_hours array has enough elements
      const driver = drivers[Math.floor(Math.random() * drivers.length)];
      const fatigueHours =
        driver.past_week_hours.length === 7 ? driver.past_week_hours[6] : 0;
      if (fatigueHours > 8) {
        baseTime = Math.floor(baseTime * 1.3); // slower by 30%
      }

      // Fuel cost calculation
      let fuelCost = route.distance_km * 5;
      if (route.traffic_level === "High") {
        fuelCost += route.distance_km * 2;
      }
      fuelCostTotal += fuelCost;

      // Profit calculation
      let orderProfit = order.value_rs;
      let penalty = 0;
      let bonus = 0;

      // Late delivery check (+10 minutes buffer)
      if (deliveryTimeMinutes > baseTime + 10) {
        penalty = 50;
      } else {
        onTimeDeliveries++;
      }

      // High value bonus
      if (order.value_rs > 1000 && penalty === 0) {
        bonus = order.value_rs * 0.1;
      }

      orderProfit = order.value_rs + bonus - penalty - fuelCost;
      totalProfit += orderProfit;
    }

    const efficiencyScore = totalDeliveries
      ? ((onTimeDeliveries / totalDeliveries) * 100).toFixed(2)
      : "0.00";

    const result = {
      totalProfit: totalProfit.toFixed(2),
      efficiencyScore,
      onTimeDeliveries,
      lateDeliveries: totalDeliveries - onTimeDeliveries,
      fuelCostTotal: fuelCostTotal.toFixed(2),
    };

    // Save simulation result to DB
    await SimulationResult.create({
      inputs: { availableDrivers, startTime, maxHoursPerDriver },
      results: result,
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
