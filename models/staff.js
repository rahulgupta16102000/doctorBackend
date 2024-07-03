const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StaffSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' }
});

StaffSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Staff', StaffSchema);
