const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_email: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  user_location: { type: String },
  user_info: { type: mongoose.Schema.Types.Mixed },
  password: { type: String, required: true },
  vehicle_info: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
