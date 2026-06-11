const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// ✅ POST COMMENT
router.post("/", async (req, res) => {
  try {
    const { name, email, website, message, slug } = req.body;

    if (!name || !email || !message || !slug) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const comment = await Comment.create({
      name,
      email,
      website,
      message,
      slug,
    });

    res.status(201).json({
      success: true,
      message: "Comment added",
      comment,
    });

  } catch (error) {
    console.error("POST ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ✅ GET COMMENTS BY SLUG
router.get("/", async (req, res) => {
  try {
    const { slug } = req.query;

    const comments = await Comment.find({ slug })
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching comments",
    });
  }
});

module.exports = router;