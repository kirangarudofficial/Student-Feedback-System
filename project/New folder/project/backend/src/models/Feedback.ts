import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  instructorId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comments: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);