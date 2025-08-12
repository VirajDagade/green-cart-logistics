import express from "express";
import {
  getRoutes,
  createRoute,
  deleteRoute,
} from "../controllers/routeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getRoutes);
router.post("/", protect, createRoute);
router.delete("/:id", protect, deleteRoute);

export default router;
