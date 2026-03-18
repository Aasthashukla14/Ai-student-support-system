const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  careerField: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  totalDuration: { type: String },
  steps: [{
    stepNumber: Number,
    title: String,
    description: String,
    duration: String,
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    resources: [{
      title: String,
      url: String,
      platform: String,
      type: { type: String, enum: ['Course', 'Tutorial', 'Documentation', 'Practice', 'Video', 'Book'] },
      isFree: { type: Boolean, default: true }
    }],
    skills: [String],
    milestone: { type: Boolean, default: false }
  }]
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
