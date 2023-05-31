const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to animal_adoption DB!');
  } catch (err) {
    console.error(err);
  }
}

module.exports = dbConnect;
