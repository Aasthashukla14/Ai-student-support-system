const Roadmap = require('../models/Roadmap');
const { Project } = require('../models/ProjectAndQuiz');
const User = require('../models/User');

// @desc Get roadmap for a career
// @route GET /api/roadmap/:slug
exports.getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ slug: req.params.slug });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });

    // Get user progress if authenticated
    let userProgress = null;
    if (req.user) {
      const user = await User.findById(req.user.id);
      userProgress = user.roadmapProgress.find(p => p.careerField === req.params.slug);
    }

    res.json({ success: true, roadmap, userProgress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Update roadmap progress
// @route PUT /api/roadmap/:slug/progress
exports.updateProgress = async (req, res) => {
  try {
    const { completedSteps } = req.body;
    const user = await User.findById(req.user.id);
    const existingIdx = user.roadmapProgress.findIndex(p => p.careerField === req.params.slug);

    if (existingIdx >= 0) {
      user.roadmapProgress[existingIdx].completedSteps = completedSteps;
    } else {
      user.roadmapProgress.push({ careerField: req.params.slug, completedSteps });
    }

    await user.save();
    res.json({ success: true, message: 'Progress updated', roadmapProgress: user.roadmapProgress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Get projects for a career
// @route GET /api/projects/:careerField
exports.getProjects = async (req, res) => {
  try {
    const { difficulty } = req.query;
    const filter = { careerField: { $regex: req.params.careerField, $options: 'i' } };
    if (difficulty) filter.difficulty = difficulty;

    const projects = await Project.find(filter);
    res.json({ success: true, count: projects.length, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Get all projects
// @route GET /api/projects
exports.getAllProjects = async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    if (category) filter.careerField = { $regex: category, $options: 'i' };
    if (difficulty) filter.difficulty = difficulty;

    const projects = await Project.find(filter).limit(100);
    res.json({ success: true, count: projects.length, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
