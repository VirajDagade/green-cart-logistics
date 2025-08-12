import express from "express";
import {
  registerManager,
  loginManager,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerManager); // For initial setup only
router.post("/login", loginManager);

export default router;
