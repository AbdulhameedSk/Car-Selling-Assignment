const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  car_id: { type: String, required: true, unique: true },
  type: { type: String },
  name: { type: String },
  model: { type: String },
  car_info: { type: mongoose.Schema.Types.Mixed }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
