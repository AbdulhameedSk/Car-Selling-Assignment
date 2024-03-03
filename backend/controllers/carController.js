// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import Car from "../models/carModel";




const cars=app.get('/cars', async (req, res) => {
    try {
        // Fetch all cars from the database
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const carAtDealership=app.get('/cars/:dealershipId', async (req, res) => {
    const dealershipId = req.params.dealershipId;
    try {
        // Fetch all cars in a certain dealership from the database
        const cars = await Car.find({ dealership: dealershipId });
        res.json(cars);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const addCars=app.post('/cars', async (req, res) => {
    const { model, year, dealership } = req.body;
    try {
        // Create a new car
        const car = new Car({ model, year, dealership });
        await car.save();
        res.json(car);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Similarly, implement other common endpoints like adding deals, viewing deals, etc.

// Create REST endpoints for the user
const certainCarAtDealership=app.get('/user/:carId/dealerships', async (req, res) => {
    const carId = req.params.carId;
    try {
        // Find dealerships with a certain car
        const dealerships = await Dealership.find({ cars: carId });
        res.json(dealerships);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports={certainCarAtDealership,addCars,cars,carAtDealership}

