const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter"); // Make sure this path to your schema is correct

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe an email to the newsletter
router.post("/subscribe", async (req, res) => {
  try {
    // 1. Corrected req.body syntax
    const { email } = req.body; 

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email address is required." 
      });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    return res.status(201).json({
      success: true,
      message: "Thank you for subscribing to our newsletter!",
    });
    
  } catch (error) {
    // Catch Mongoose duplicate key error (11000 means unique validation failed)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This email is already subscribed to our newsletter.",
      });
    }

    console.error("Newsletter Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

module.exports = router;