// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const Career = require('../models/Career');
const Newsletter = require('../models/Newsletter');
const Comment = require('../models/Comment');



// Get All Submissions Summary
router.get('/dashboard-data', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    const careers = await Career.find().sort({ submittedAt: -1 });
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    const comments = await Comment.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { contacts, careers, newsletters, comments }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete handler endpoints for moderation
router.delete('/contact/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Contact deleted" });
});

router.delete('/career/:id', async (req, res) => {
  await Career.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Application deleted" });
});

router.delete('/comment/:id', async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Comment moderated/deleted" });
});

module.exports = router;