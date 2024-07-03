const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  appointmentDate: Date,
  doctor: String,
  // Add more fields as needed
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
