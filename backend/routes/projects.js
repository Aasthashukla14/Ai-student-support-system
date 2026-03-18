const express = require('express');
const router = express.Router();
const { getProjects, getAllProjects } = require('../controllers/roadmapController');

router.get('/', getAllProjects);
router.get('/:careerField', getProjects);

module.exports = router;
