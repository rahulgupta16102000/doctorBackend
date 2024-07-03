const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Create a new patient
router.post('/', async (req, res) => {
  const { name, age, gender } = req.body;
  try {
    const patient = new Patient({ name, age, gender });
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
