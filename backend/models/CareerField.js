const mongoose = require('mongoose');

const careerFieldSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  category: { type: String },
  industryDemand: { type: String, enum: ['Very High', 'High', 'Medium', 'Growing'], default: 'High' },
  difficultyLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
  salaryRange: { min: Number, max: Number, currency: { type: String, default: 'INR' } },
  salaryRangeUS: { min: Number, max: Number, currency: { type: String, default: 'USD' } },
  requiredSkills: [{ skill: String, level: { type: String, enum: ['Basic', 'Intermediate', 'Advanced', 'Expert'] } }],
  recommendedTools: [String],
  jobRoles: [String],
  icon: { type: String, default: '💻' },
  color: { type: String, default: '#4F46E5' },
  preparationTime: { type: String, default: '6-12 months' },
  certifications: [String],
  careerWeights: {
    programming: { type: Number, default: 0 },
    dataAnalysis: { type: Number, default: 0 },
    aiMl: { type: Number, default: 0 },
    cloud: { type: Number, default: 0 },
    networking: { type: Number, default: 0 },
    cybersecurity: { type: Number, default: 0 },
    uiux: { type: Number, default: 0 },
    gameDev: { type: Number, default: 0 },
    mobileDev: { type: Number, default: 0 },
    problemSolving: { type: Number, default: 0 },
    mathematics: { type: Number, default: 0 },
    logicalThinking: { type: Number, default: 0 }
  },
  popularity: { type: Number, default: 0 }
});

module.exports = mongoose.model('CareerField', careerFieldSchema);