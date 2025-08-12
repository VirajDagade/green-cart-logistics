import express from "express";
import {
  getDrivers,
  createDriver,
  deleteDriver,
} from "../controllers/driverController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getDrivers);
router.post("/", protect, createDriver);
router.delete("/:id", protect, deleteDriver);

export default router;
