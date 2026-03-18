const express = require('express');
const router = express.Router();
const { getQuestions, submitQuiz, getQuizHistory } = require('../controllers/quizController');
const { protect } = require('../middleware/auth');

// Optional auth for submit (works both logged in and out)
const optionalAuth = require('../middleware/optionalAuth');

router.get('/questions', getQuestions);
router.post('/submit', optionalAuth, submitQuiz);
router.get('/history', protect, getQuizHistory);

module.exports = router;
