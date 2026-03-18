const User = require('../models/User');
const QuizResponse = require('../models/QuizResponse');
const CareerField = require('../models/CareerField');

// @desc Get dashboard data
// @route GET /api/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const latestQuiz = await QuizResponse.findOne({ user: req.user.id }).sort({ completedAt: -1 });

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, department: user.department, semester: user.semester, skills: user.skills, interests: user.interests, selectedCareer: user.selectedCareer, quizCompleted: user.quizCompleted, roadmapProgress: user.roadmapProgress },
      latestQuiz,
      totalRoadmapsStarted: user.roadmapProgress.length
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Set selected career
// @route PUT /api/dashboard/career
exports.setSelectedCareer = async (req, res) => {
  try {
    const { career } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { selectedCareer: career }, { new: true });
    res.json({ success: true, selectedCareer: user.selectedCareer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Get analytics
// @route GET /api/analytics
exports.getAnalytics = async (req, res) => {
  try {
    const [totalUsers, totalQuizzes, popularCareers] = await Promise.all([
      User.countDocuments(),
      QuizResponse.countDocuments(),
      CareerField.find().sort({ popularity: -1 }).limit(10).select('name popularity category')
    ]);

    const careerDistribution = await QuizResponse.aggregate([
      { $unwind: '$recommendations' },
      { $match: { 'recommendations.rank': 1 } },
      { $group: { _id: '$recommendations.career', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({ success: true, analytics: { totalUsers, totalQuizzes, popularCareers, careerDistribution } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
