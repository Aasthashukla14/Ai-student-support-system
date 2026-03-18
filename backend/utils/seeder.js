const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log('✅ MongoDB Connected for seeding');

  // Import models AFTER connection
  const CareerField = require('../models/CareerField');
  const Roadmap = require('../models/Roadmap');
  const { Project, QuizQuestion } = require('../models/ProjectAndQuiz');

  const careerFields = require('../data/careerFields');
  const quizQuestions = require('../data/quizQuestions');
  const projects = require('../data/projects');
  const roadmaps = require('../data/roadmaps');

  try {
    console.log('🗑️  Clearing existing data...');
    await CareerField.deleteMany({});
    await Roadmap.deleteMany({});
    await Project.deleteMany({});
    await QuizQuestion.deleteMany({});

    console.log('🌱 Seeding Career Fields...');
    await CareerField.insertMany(careerFields);
    console.log(`   ✅ ${careerFields.length} career fields inserted`);

    console.log('🌱 Seeding Roadmaps...');
    await Roadmap.insertMany(roadmaps);
    console.log(`   ✅ ${roadmaps.length} roadmaps inserted`);

    console.log('🌱 Seeding Projects...');
    await Project.insertMany(projects);
    console.log(`   ✅ ${projects.length} projects inserted`);

    console.log('🌱 Seeding Quiz Questions...');
    await QuizQuestion.insertMany(quizQuestions);
    console.log(`   ✅ ${quizQuestions.length} quiz questions inserted`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}).catch(err => {
  console.error('❌ Connection error:', err);
  process.exit(1);
});