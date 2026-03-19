const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect Database
connectDB();
// Auto seed if SEED_ON_START is true
if (process.env.SEED_ON_START === 'true') {
  const seedDB = require('./utils/seeder');
}

// Middleware
app.use(cors({ origin: '*', credentials: false }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/roadmap', require('./routes/roadmap'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/analytics', require('./routes/analytics'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'AI Student Support API running' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Server Error' });
});
// One-time seed route
app.get('/api/seed-now', async (req, res) => {
  try {
    const CareerField = require('./models/CareerField');
    const Roadmap = require('./models/Roadmap');
    const { Project, QuizQuestion } = require('./models/ProjectAndQuiz');
    const careerFields = require('./data/careerFields');
    const quizQuestions = require('./data/quizQuestions');
    const projects = require('./data/projects');
    const roadmaps = require('./data/roadmaps');
    await CareerField.deleteMany({});
    await Roadmap.deleteMany({});
    await Project.deleteMany({});
    await QuizQuestion.deleteMany({});
    await CareerField.insertMany(careerFields);
    await Roadmap.insertMany(roadmaps);
    await Project.insertMany(projects);
    await QuizQuestion.insertMany(quizQuestions);
    res.json({ success: true, message: 'Database seeded successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`));

module.exports = app;