const express = require('express');
const { certainCarAtDealership,addCars,cars,carAtDealership}= require('../controllers/carController');
const router = express.Router();

router.post("/certainCarAtDealership", certainCarAtDealership);
router.post("/addCars", addCars);
router.get("/cars", cars);
router.get("/carAtDealership",carAtDealership);

module.exports = router;
