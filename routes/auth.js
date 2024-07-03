const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'rahul1234';  // Use a strong secret in production

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).send({ error: 'Email already in use' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('email, password',email, password)
  const user = await User.findOne({ email });
  console.log('user',user)
  const hashPassword = await bcrypt.compare(password, user.password)
  console.log('hashPassword',hashPassword)

  if (!user || !hashPassword) {
    return res.status(400).send({ error: 'Invalid email or password' });
  }
   const token = jwt.sign({ userId: user._id, role: 'user' }, JWT_SECRET);
  res.send({ token });
});

module.exports = router;
