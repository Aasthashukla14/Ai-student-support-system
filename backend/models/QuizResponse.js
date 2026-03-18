const mongoose = require('mongoose');

const quizResponseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responses: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestion' },
    questionText: String,
    answer: { type: Number, min: 1, max: 4 }, // 1=Strongly Agree, 2=Agree, 3=Neutral, 4=Disagree
    category: String
  }],
  categoryScores: {
    programming: { type: Number, default: 0 },
    dataAnalysis: { type: Number, default: 0 },
    aiMl: { type: Number, default: 0 },
    cloud: { type: Number, default: 0 },
    networking: { type: Number, default: 0 },
    cybersecurity: { type: Number, default: 0 },
    uiux: { type: Number, default: 0 },
    gameDev: { type: Number, default: 0 },
    mobileDev: { type: Number, default: 0 },
    problemSolving: { type: Number, default: 0 },
    mathematics: { type: Number, default: 0 },
    logicalThinking: { type: Number, default: 0 }
  },
  recommendations: [{
    career: String,
    score: Number,
    rank: Number
  }],
  completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizResponse', quizResponseSchema);
