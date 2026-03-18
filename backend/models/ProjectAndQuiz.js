const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  careerField: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Beginner' },
  techStack: [String],
  estimatedTime: { type: String },
  features: [String],
  githubSearch: { type: String },
  category: { type: String }
});

const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  category: {
    type: String,
    enum: ['programming', 'dataAnalysis', 'aiMl', 'cloud', 'networking', 'cybersecurity', 'uiux', 'gameDev', 'mobileDev', 'problemSolving', 'mathematics', 'logicalThinking'],
    required: true
  },
  options: [{
    text: String,
    value: Number // 4=Strongly Agree, 3=Agree, 2=Neutral, 1=Disagree
  }],
  weight: { type: Number, default: 1 },
  orderIndex: { type: Number }
});

module.exports = {
  Project: mongoose.model('Project', projectSchema),
  QuizQuestion: mongoose.model('QuizQuestion', quizQuestionSchema)
};
