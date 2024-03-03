import express from "express"
import dotenv from "dotenv"
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from 'cors';
import colors from 'colors';
const app=express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 3000

app.use(express.json());
// app.use("/api/v1/", authRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log("Server is running on PORT", PORT.bgGreen);
})