import express from 'express';
import { Feedback } from '../models/Feedback.js';

export const feedbackRouter = express.Router();

// Get all feedback
feedbackRouter.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit new feedback
feedbackRouter.post('/', async (req, res) => {
  const feedback = new Feedback(req.body);
  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});