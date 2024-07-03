const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

// Create a new appointment
router.post('/', async (req, res) => {
  const { patientId, appointmentDate, doctor } = req.body;
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const appointment = new Appointment({ patientId, appointmentDate, doctor });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patientId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
