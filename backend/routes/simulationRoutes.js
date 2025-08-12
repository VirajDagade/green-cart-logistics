import express from "express";
import { runSimulation } from "../controllers/simulationController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, runSimulation);

export default router;
