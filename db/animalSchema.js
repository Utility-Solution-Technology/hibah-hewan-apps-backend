const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
    enum: ['Anabul', 'Reptil'],
  },
  age: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: ['dihibahkan', 'diadopsi'],
    default: 'dihibahkan',
  },
  time_create: {
    type: String,
    required: true,
  },
  time_update: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model.animals || mongoose.model('animals', AnimalSchema);
