const express = require('express');
const router = express.Router();
const { getDashboard, setSelectedCareer } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getDashboard);
router.put('/career', protect, setSelectedCareer);

module.exports = router;
