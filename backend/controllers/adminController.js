import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel';
import generateTokenAndSetCookie from "../utils/generateToken.js";


const router = express.Router();

// Route for user login
const login=router.post("/login", async (req, res) => {
  const { admin_id, password } = req.body;
  try {
    // Find the admin in the database by admin_id
    const admin = await Admin.findOne({ admin_id });
    if (!admin) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate JWT token
    const token = jwt.sign({ admin_id: admin.admin_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token in the response
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error in login route", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route for admin logout (if needed)
const logout=router.post("/logout", (req, res) => {
  // Clear the JWT token by setting it to an empty string and an immediate expiration
  res.cookie("jwt", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
});

const signup=router.post("/signup", async (req, res) => {
    const { admin_id, password } = req.body;
    try {
      // Check if the admin already exists
      const existingAdmin = await Admin.findOne({ admin_id });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new admin
      const newAdmin = new Admin({ admin_id, password: hashedPassword });
      await newAdmin.save();
  
      // Generate JWT token
      const token = jwt.sign({ admin_id: newAdmin.admin_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send the token in the response
      return res.status(201).json({ token });
    } catch (error) {
      console.error("Error in signup route", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports={login,logout,signup}