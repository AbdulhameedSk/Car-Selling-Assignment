import express from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const router = express.Router();

const signup = router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = generateTokenAndSetCookie(newUser, res);

    return res.status(201).json({ token });
  } catch (error) {
    console.log("Error in signup route", error.message);
    return res.status(500).json({ error: "Error in signup route" });
  }
});

const login = router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = generateTokenAndSetCookie(user, res);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Error in login route" });
  }
});

const logout = router.post("/logout", (req, res) => {
  try {
    res.cookie("jwt", "", { expires: new Date(0) });
    res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({ error: "Error in logout route" });
  }
});

module.exports = { signup, login, logout };
