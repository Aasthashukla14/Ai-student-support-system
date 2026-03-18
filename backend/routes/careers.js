const express = require('express');
const router = express.Router();
const { getCareers, getCareer, getSkillGap, compareCareers } = require('../controllers/careerController');
const { protect } = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');

router.get('/', getCareers);
router.get('/compare', compareCareers);
router.get('/:slug', optionalAuth, getCareer);
router.post('/:slug/skill-gap', optionalAuth, getSkillGap);

module.exports = router;
