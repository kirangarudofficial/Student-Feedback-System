const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/submit-feedback', async (req, res) => {
  try {
    const { name, feedback } = req.body;
    if (!name || !feedback) {
      return res.status(400).json({ message: 'Name and feedback are required' });
    }
    const newFeedback = new Feedback({ name, feedback });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
