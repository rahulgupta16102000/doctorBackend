const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  // Add more fields as needed
});

module.exports = mongoose.model('Patient', PatientSchema);
