const { QuizQuestion } = require('../models/ProjectAndQuiz');
const QuizResponse = require('../models/QuizResponse');
const User = require('../models/User');
const { calculateCategoryScores, calculateCareerScores, generateCareerAdvice } = require('../algorithms/recommendationEngine');

// @desc Get all quiz questions
// @route GET /api/quiz/questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await QuizQuestion.find().sort({ orderIndex: 1 });
    res.json({ success: true, count: questions.length, questions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Submit quiz and get recommendations
// @route POST /api/quiz/submit
exports.submitQuiz = async (req, res) => {
  try {
    const { responses } = req.body;
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ success: false, message: 'Quiz responses are required' });
    }

    // Calculate category scores
    const categoryScores = calculateCategoryScores(responses);
    // Calculate career recommendations
    const careerRankings = calculateCareerScores(categoryScores);
    const top5 = careerRankings.slice(0, 5);
    const advice = generateCareerAdvice(categoryScores);

    // Save to DB if authenticated
    let savedResponse = null;
    if (req.user) {
      savedResponse = await QuizResponse.create({
        user: req.user.id,
        responses,
        categoryScores,
        recommendations: top5.map(r => ({ career: r.career, score: r.score, rank: r.rank }))
      });
      await User.findByIdAndUpdate(req.user.id, { quizCompleted: true });
    }

    res.json({
      success: true,
      categoryScores,
      recommendations: top5,
      allRankings: careerRankings.slice(0, 10),
      advice,
      quizResponseId: savedResponse?._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Get user's quiz history
// @route GET /api/quiz/history
exports.getQuizHistory = async (req, res) => {
  try {
    const history = await QuizResponse.find({ user: req.user.id }).sort({ completedAt: -1 });
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
