import express from "express"
import dotenv from "dotenv"
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from 'cors';
import colors from 'colors';
const userRoutes = require('./routes/userRoutes');
const dealershipRoutes = require('./routes/dealershipRoutes.js');
const adminRoutes=require('./routes/adminRoutes.js')
const carRoutes=require('./routes/carRoutes.js')
const app=express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("api/v1/admin",adminRoutes)
app.use("api/v1/car",carRoutes)
app.use("api/v1/dealership",dealershipRoutes)
app.listen(PORT, () => {
    connectToMongoDB();
    console.log("Server is running on PORT", PORT.bgGreen);
})