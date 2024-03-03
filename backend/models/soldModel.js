const mongoose = require('mongoose');

const soldVehicleSchema = new mongoose.Schema({
  vehicle_id: { type: String, required: true, unique: true },
  car_id: { type: String },
  vehicle_info: { type: mongoose.Schema.Types.Mixed }
});

const SoldVehicle = mongoose.model('SoldVehicle', soldVehicleSchema);

module.exports = SoldVehicle;
