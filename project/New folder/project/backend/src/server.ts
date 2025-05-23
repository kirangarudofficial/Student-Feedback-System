import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { feedbackRouter } from './routes/feedback.js';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/feedback')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/feedback', feedbackRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});