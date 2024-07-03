const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Staff = require('../models/Staff');

const router = express.Router();
const JWT_SECRET = 'rahul1234';  // Use a strong secret in production

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const staff = new Staff({ name, email, password, role });
    await staff.save();
    res.status(201).send({ message: 'Staff registered successfully' });
  } catch (err) {
    res.status(400).send({ error: 'Email already in use' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const staff = await Staff.findOne({ email });
  if (!staff || !await bcrypt.compare(password, staff.password)) {
    return res.status(400).send({ error: 'Invalid email or password' });
  }
  const token = jwt.sign({ staffId: staff._id, role: staff.role }, JWT_SECRET);
  res.send({ token });
});

module.exports = router;
