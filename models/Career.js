const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  phone: String,
  resumePath: String, // Path to the file in the 'uploads' folder
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Career', careerSchema);