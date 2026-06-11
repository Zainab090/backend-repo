const express = require('express');
const router = express.Router();
const multer = require('multer');
const Career = require('../models/Career');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const application = new Career({
      ...req.body,
      resumePath: req.file ? req.file.path : null
    });
    await application.save();
    res.status(201).json({ success: true, message: "Application received." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;