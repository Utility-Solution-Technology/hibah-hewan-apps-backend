const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'Username Exist'],
  },
  whatsapp: {
    type: String,
    required: true,
    unique: [true, 'Whatsapp Exist'],
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email Exist'],
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model.users || mongoose.model('users', UserSchema);
