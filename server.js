const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const staffAuthRoutes = require('./routes/staffAuth');
const patientsRoutes = require('./routes/patient');
const appointmentsRoutes = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/staff', staffAuthRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/appointments', appointmentsRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/doctorApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
