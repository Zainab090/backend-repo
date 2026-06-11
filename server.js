const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// Routes
app.use('/api/careers', require('./routes/careerRoutes'));
app.use('/api/contact', require('./routes/contactRoutes')); // Similar logic to career without multer
app.use('/api/comments', require('./routes/commentRoutes'));
app.use("/api/newsletter", require("./routes/newsLetterRoutes"));
app.use('/api/admin', require('./routes/adminRoutes'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));