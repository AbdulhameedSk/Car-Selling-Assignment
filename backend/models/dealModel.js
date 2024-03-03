const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  deal_id: { type: String, required: true, unique: true },
  car_id: { type: String },
  deal_info: { type: mongoose.Schema.Types.Mixed }
});

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;
