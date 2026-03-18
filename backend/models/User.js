const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
  password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
  department: { type: String, default: '' },
  semester: { type: Number, min: 1, max: 8, default: 1 },
  skills: [{ type: String }],
  interests: [{ type: String }],
  selectedCareer: { type: String, default: null },
  quizCompleted: { type: Boolean, default: false },
  roadmapProgress: [{
    careerField: String,
    completedSteps: [Number],
    startedAt: { type: Date, default: Date.now }
  }],
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', userSchema);
