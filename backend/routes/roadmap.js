const express = require('express');
const router = express.Router();
const { getRoadmap, updateProgress } = require('../controllers/roadmapController');
const { protect } = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');

router.get('/:slug', optionalAuth, getRoadmap);
router.put('/:slug/progress', protect, updateProgress);

module.exports = router;
