const CareerField = require('../models/CareerField');
const { analyzeSkillGap } = require('../algorithms/recommendationEngine');

// @desc Get all career fields
// @route GET /api/careers
exports.getCareers = async (req, res) => {
  try {
    const { category, difficulty, search, limit = 50 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficultyLevel = difficulty;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const careers = await CareerField.find(filter).limit(Number(limit)).sort({ popularity: -1 });
    res.json({ success: true, count: careers.length, careers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Get single career
// @route GET /api/careers/:slug
exports.getCareer = async (req, res) => {
  try {
    const career = await CareerField.findOne({ slug: req.params.slug });
    if (!career) return res.status(404).json({ success: false, message: 'Career not found' });
    await CareerField.findByIdAndUpdate(career._id, { $inc: { popularity: 1 } });
    res.json({ success: true, career });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Get skill gap analysis
// @route POST /api/careers/:slug/skill-gap
exports.getSkillGap = async (req, res) => {
  try {
    const { userSkills } = req.body;
    const career = await CareerField.findOne({ slug: req.params.slug });
    if (!career) return res.status(404).json({ success: false, message: 'Career not found' });

    const skills = userSkills || (req.user ? req.user.skills : []);
    const analysis = analyzeSkillGap(skills, career.requiredSkills);

    res.json({ success: true, career: career.name, ...analysis });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Compare two careers
// @route GET /api/careers/compare?career1=slug1&career2=slug2
exports.compareCareers = async (req, res) => {
  try {
    const { career1, career2 } = req.query;
    const [c1, c2] = await Promise.all([
      CareerField.findOne({ slug: career1 }),
      CareerField.findOne({ slug: career2 })
    ]);
    if (!c1 || !c2) return res.status(404).json({ success: false, message: 'One or both careers not found' });
    res.json({ success: true, comparison: { career1: c1, career2: c2 } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
