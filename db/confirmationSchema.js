const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  animalID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'animals',
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  time_confirm: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model.confirmations || mongoose.model('confirmations', AnimalSchema);
