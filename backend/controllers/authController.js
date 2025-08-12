import Manager from "../models/Manager.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register new manager (for setup only)
export const registerManager = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingManager = await Manager.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: "Manager already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const manager = await Manager.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Manager registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login manager
export const loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;

    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
