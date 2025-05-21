require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const feedbackRoutes = require('./routes/feedback');
const path = require('path');

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/', feedbackRoutes);

// Serve frontend static files (optional if frontend hosted separately)
app.use(express.static(path.join(__dirname, '../frontend')));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
