import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import generateTokenAndSetCookie from "../utils/generateToken.js";
import Dealership from "../models/dealershipModel";

const router = express.Router();

// Route for dealership signup
const signup = router.post("/signup", async (req, res) => {
  try {
    const { dealership_email, password } = req.body;

    // Check if dealership already exists
    const existingDealership = await Dealership.findOne({ dealership_email });
    if (existingDealership) {
      return res.status(400).json({ message: "Dealership already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new dealership
    const newDealership = new Dealership({
      dealership_email,
      password: hashedPassword,
    });

    // Save dealership to database
    await newDealership.save();

    res.status(201).json({ message: "Dealership signed up successfully" });
  } catch (error) {
    console.error("Error in dealership signup route", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for dealership login
const login = router.post("/login", async (req, res) => {
  try {
    const { dealership_email, password } = req.body;

    // Check if dealership exists
    const dealership = await Dealership.findOne({ dealership_email });
    if (!dealership) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, dealership.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { dealership_id: dealership._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in dealership login route", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Route for dealership logout
const logout = router.post("/logout", async (req, res) => {
  try {
    // Assuming you are using JWT tokens for authentication
    // You may want to implement additional logic depending on your authentication mechanism

    // Simply respond with a success message
    res.cookie("jwt", "", { expires: new Date(0) });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in dealership logout route", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { signup, login, logout };

