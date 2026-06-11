const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST route to handle contact form submissions
router.post('/submit', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      message
    });

    await newContact.save();
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
  