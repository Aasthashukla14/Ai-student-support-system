/**
 * AI Career Recommendation Engine
 * Rule-based scoring algorithm using interest mapping and weighted career scoring
 */

// Career weights map: each career has weights for each quiz category
const CAREER_WEIGHTS = {
  'Data Analyst': { programming: 0.6, dataAnalysis: 1.0, aiMl: 0.4, cloud: 0.2, networking: 0.1, cybersecurity: 0.1, uiux: 0.2, gameDev: 0.0, mobileDev: 0.1, problemSolving: 0.8, mathematics: 0.9, logicalThinking: 0.8 },
  'Data Scientist': { programming: 0.8, dataAnalysis: 1.0, aiMl: 0.9, cloud: 0.3, networking: 0.1, cybersecurity: 0.1, uiux: 0.1, gameDev: 0.0, mobileDev: 0.1, problemSolving: 0.9, mathematics: 1.0, logicalThinking: 0.9 },
  'Machine Learning Engineer': { programming: 0.9, dataAnalysis: 0.8, aiMl: 1.0, cloud: 0.5, networking: 0.1, cybersecurity: 0.1, uiux: 0.1, gameDev: 0.1, mobileDev: 0.1, problemSolving: 1.0, mathematics: 1.0, logicalThinking: 0.9 },
  'AI Engineer': { programming: 0.9, dataAnalysis: 0.7, aiMl: 1.0, cloud: 0.6, networking: 0.2, cybersecurity: 0.2, uiux: 0.2, gameDev: 0.2, mobileDev: 0.2, problemSolving: 1.0, mathematics: 0.9, logicalThinking: 1.0 },
  'Data Engineer': { programming: 0.9, dataAnalysis: 0.9, aiMl: 0.5, cloud: 0.7, networking: 0.4, cybersecurity: 0.3, uiux: 0.1, gameDev: 0.0, mobileDev: 0.1, problemSolving: 0.8, mathematics: 0.7, logicalThinking: 0.8 },
  'Software Engineer': { programming: 1.0, dataAnalysis: 0.4, aiMl: 0.3, cloud: 0.5, networking: 0.3, cybersecurity: 0.3, uiux: 0.3, gameDev: 0.3, mobileDev: 0.4, problemSolving: 0.9, mathematics: 0.6, logicalThinking: 0.9 },
  'Full Stack Developer': { programming: 1.0, dataAnalysis: 0.3, aiMl: 0.2, cloud: 0.5, networking: 0.4, cybersecurity: 0.3, uiux: 0.7, gameDev: 0.2, mobileDev: 0.5, problemSolving: 0.8, mathematics: 0.5, logicalThinking: 0.8 },
  'Frontend Developer': { programming: 0.8, dataAnalysis: 0.2, aiMl: 0.1, cloud: 0.3, networking: 0.2, cybersecurity: 0.2, uiux: 1.0, gameDev: 0.2, mobileDev: 0.4, problemSolving: 0.6, mathematics: 0.3, logicalThinking: 0.6 },
  'Backend Developer': { programming: 1.0, dataAnalysis: 0.4, aiMl: 0.3, cloud: 0.6, networking: 0.5, cybersecurity: 0.5, uiux: 0.2, gameDev: 0.1, mobileDev: 0.3, problemSolving: 0.9, mathematics: 0.6, logicalThinking: 0.9 },
  'Mobile App Developer': { programming: 0.9, dataAnalysis: 0.2, aiMl: 0.2, cloud: 0.4, networking: 0.3, cybersecurity: 0.3, uiux: 0.8, gameDev: 0.4, mobileDev: 1.0, problemSolving: 0.7, mathematics: 0.4, logicalThinking: 0.7 },
  'Game Developer': { programming: 0.9, dataAnalysis: 0.2, aiMl: 0.4, cloud: 0.3, networking: 0.4, cybersecurity: 0.2, uiux: 0.7, gameDev: 1.0, mobileDev: 0.5, problemSolving: 0.8, mathematics: 0.8, logicalThinking: 0.8 },
  'Cloud Engineer': { programming: 0.7, dataAnalysis: 0.4, aiMl: 0.3, cloud: 1.0, networking: 0.8, cybersecurity: 0.6, uiux: 0.1, gameDev: 0.0, mobileDev: 0.2, problemSolving: 0.7, mathematics: 0.5, logicalThinking: 0.8 },
  'DevOps Engineer': { programming: 0.8, dataAnalysis: 0.3, aiMl: 0.2, cloud: 0.9, networking: 0.8, cybersecurity: 0.7, uiux: 0.2, gameDev: 0.0, mobileDev: 0.2, problemSolving: 0.8, mathematics: 0.5, logicalThinking: 0.9 },
  'Cloud Architect': { programming: 0.7, dataAnalysis: 0.5, aiMl: 0.4, cloud: 1.0, networking: 0.9, cybersecurity: 0.8, uiux: 0.2, gameDev: 0.0, mobileDev: 0.2, problemSolving: 0.9, mathematics: 0.6, logicalThinking: 0.9 },
  'Cybersecurity Analyst': { programming: 0.6, dataAnalysis: 0.5, aiMl: 0.3, cloud: 0.5, networking: 0.9, cybersecurity: 1.0, uiux: 0.1, gameDev: 0.0, mobileDev: 0.1, problemSolving: 0.9, mathematics: 0.6, logicalThinking: 1.0 },
  'Ethical Hacker': { programming: 0.8, dataAnalysis: 0.3, aiMl: 0.2, cloud: 0.4, networking: 1.0, cybersecurity: 1.0, uiux: 0.1, gameDev: 0.1, mobileDev: 0.1, problemSolving: 1.0, mathematics: 0.5, logicalThinking: 1.0 },
  'Security Engineer': { programming: 0.8, dataAnalysis: 0.4, aiMl: 0.3, cloud: 0.6, networking: 0.9, cybersecurity: 1.0, uiux: 0.1, gameDev: 0.0, mobileDev: 0.1, problemSolving: 0.9, mathematics: 0.6, logicalThinking: 0.9 },
  'Network Engineer': { programming: 0.4, dataAnalysis: 0.3, aiMl: 0.1, cloud: 0.6, networking: 1.0, cybersecurity: 0.7, uiux: 0.1, gameDev: 0.0, mobileDev: 0.1, problemSolving: 0.7, mathematics: 0.5, logicalThinking: 0.8 },
  'System Administrator': { programming: 0.5, dataAnalysis: 0.3, aiMl: 0.1, cloud: 0.7, networking: 0.9, cybersecurity: 0.7, uiux: 0.1, gameDev: 0.0, mobileDev: 0.1, problemSolving: 0.7, mathematics: 0.4, logicalThinking: 0.7 },
  'Blockchain Developer': { programming: 1.0, dataAnalysis: 0.4, aiMl: 0.3, cloud: 0.5, networking: 0.5, cybersecurity: 0.7, uiux: 0.2, gameDev: 0.1, mobileDev: 0.3, problemSolving: 0.9, mathematics: 0.8, logicalThinking: 0.9 },
  'IoT Engineer': { programming: 0.8, dataAnalysis: 0.5, aiMl: 0.4, cloud: 0.6, networking: 0.8, cybersecurity: 0.5, uiux: 0.2, gameDev: 0.2, mobileDev: 0.4, problemSolving: 0.8, mathematics: 0.7, logicalThinking: 0.8 },
  'Robotics Engineer': { programming: 0.9, dataAnalysis: 0.5, aiMl: 0.8, cloud: 0.3, networking: 0.4, cybersecurity: 0.2, uiux: 0.2, gameDev: 0.3, mobileDev: 0.2, problemSolving: 1.0, mathematics: 1.0, logicalThinking: 0.9 },
  'AR/VR Developer': { programming: 0.9, dataAnalysis: 0.2, aiMl: 0.4, cloud: 0.4, networking: 0.3, cybersecurity: 0.2, uiux: 0.8, gameDev: 0.9, mobileDev: 0.6, problemSolving: 0.8, mathematics: 0.8, logicalThinking: 0.8 },
  'QA Engineer': { programming: 0.6, dataAnalysis: 0.5, aiMl: 0.2, cloud: 0.3, networking: 0.3, cybersecurity: 0.4, uiux: 0.4, gameDev: 0.2, mobileDev: 0.4, problemSolving: 0.9, mathematics: 0.5, logicalThinking: 0.9 },
  'Automation Test Engineer': { programming: 0.8, dataAnalysis: 0.4, aiMl: 0.3, cloud: 0.4, networking: 0.3, cybersecurity: 0.4, uiux: 0.3, gameDev: 0.1, mobileDev: 0.3, problemSolving: 0.9, mathematics: 0.5, logicalThinking: 0.9 },
  'UI Designer': { programming: 0.3, dataAnalysis: 0.2, aiMl: 0.1, cloud: 0.1, networking: 0.1, cybersecurity: 0.1, uiux: 1.0, gameDev: 0.4, mobileDev: 0.5, problemSolving: 0.5, mathematics: 0.2, logicalThinking: 0.4 },
  'UX Designer': { programming: 0.3, dataAnalysis: 0.6, aiMl: 0.2, cloud: 0.1, networking: 0.1, cybersecurity: 0.1, uiux: 1.0, gameDev: 0.3, mobileDev: 0.5, problemSolving: 0.8, mathematics: 0.3, logicalThinking: 0.7 },
  'Business Analyst': { programming: 0.3, dataAnalysis: 0.9, aiMl: 0.4, cloud: 0.3, networking: 0.2, cybersecurity: 0.2, uiux: 0.5, gameDev: 0.0, mobileDev: 0.1, problemSolving: 0.9, mathematics: 0.7, logicalThinking: 0.9 },
  'Product Manager': { programming: 0.4, dataAnalysis: 0.8, aiMl: 0.4, cloud: 0.3, networking: 0.2, cybersecurity: 0.2, uiux: 0.8, gameDev: 0.2, mobileDev: 0.3, problemSolving: 1.0, mathematics: 0.6, logicalThinking: 0.9 },
  'Database Administrator': { programming: 0.6, dataAnalysis: 0.8, aiMl: 0.3, cloud: 0.6, networking: 0.5, cybersecurity: 0.5, uiux: 0.1, gameDev: 0.0, mobileDev: 0.1, problemSolving: 0.8, mathematics: 0.7, logicalThinking: 0.8 },
  'Big Data Engineer': { programming: 0.9, dataAnalysis: 1.0, aiMl: 0.6, cloud: 0.8, networking: 0.5, cybersecurity: 0.3, uiux: 0.1, gameDev: 0.0, mobileDev: 0.1, problemSolving: 0.9, mathematics: 0.8, logicalThinking: 0.8 },
  'Site Reliability Engineer': { programming: 0.8, dataAnalysis: 0.5, aiMl: 0.2, cloud: 1.0, networking: 0.9, cybersecurity: 0.7, uiux: 0.1, gameDev: 0.0, mobileDev: 0.1, problemSolving: 0.9, mathematics: 0.5, logicalThinking: 0.9 },
  'Technical Consultant': { programming: 0.6, dataAnalysis: 0.6, aiMl: 0.4, cloud: 0.6, networking: 0.5, cybersecurity: 0.5, uiux: 0.4, gameDev: 0.1, mobileDev: 0.3, problemSolving: 0.9, mathematics: 0.5, logicalThinking: 0.9 }
};

/**
 * Calculate career scores from quiz category scores
 * @param {Object} categoryScores - Scores per category (0-100)
 * @returns {Array} - Sorted career recommendations
 */
const calculateCareerScores = (categoryScores) => {
  const careerScores = {};

  // Normalize category scores to 0-1 range
  const maxPossibleScore = 100;
  const normalized = {};
  Object.keys(categoryScores).forEach(cat => {
    normalized[cat] = Math.min(categoryScores[cat] / maxPossibleScore, 1.0);
  });

  // Calculate weighted score for each career
  Object.entries(CAREER_WEIGHTS).forEach(([career, weights]) => {
    let totalWeight = 0;
    let weightedScore = 0;

    Object.entries(weights).forEach(([category, weight]) => {
      const score = normalized[category] || 0;
      weightedScore += score * weight;
      totalWeight += weight;
    });

    // Normalize to percentage
    const finalScore = totalWeight > 0 ? (weightedScore / totalWeight) * 100 : 0;
    careerScores[career] = Math.round(finalScore * 10) / 10;
  });

  // Sort by score descending
  const sorted = Object.entries(careerScores)
    .sort(([, a], [, b]) => b - a)
    .map(([career, score], index) => ({
      career,
      score,
      rank: index + 1,
      matchPercentage: Math.min(Math.round(score), 99)
    }));

  return sorted;
};

/**
 * Calculate category scores from quiz responses
 * @param {Array} responses - Array of { category, answer } objects
 * @returns {Object} - Category scores normalized to 0-100
 */
const calculateCategoryScores = (responses) => {
  const categoryCounts = {};
  const categoryTotals = {};
  const maxPerAnswer = 4; // Strongly Agree = 4

  responses.forEach(({ category, answer, weight = 1 }) => {
    if (!categoryCounts[category]) {
      categoryCounts[category] = 0;
      categoryTotals[category] = 0;
    }
    categoryTotals[category] += answer * weight;
    categoryCounts[category] += maxPerAnswer * weight;
  });

  const categoryScores = {};
  Object.keys(categoryTotals).forEach(cat => {
    categoryScores[cat] = categoryCounts[cat] > 0
      ? Math.round((categoryTotals[cat] / categoryCounts[cat]) * 100)
      : 0;
  });

  return categoryScores;
};

/**
 * Analyze skill gaps between user skills and required career skills
 */
const analyzeSkillGap = (userSkills, requiredSkills) => {
  const userSkillsLower = userSkills.map(s => s.toLowerCase().trim());
  const missing = [];
  const existing = [];

  requiredSkills.forEach(({ skill, level }) => {
    const skillLower = skill.toLowerCase().trim();
    const hasSkill = userSkillsLower.some(us =>
      us.includes(skillLower) || skillLower.includes(us)
    );
    if (hasSkill) {
      existing.push({ skill, level });
    } else {
      missing.push({ skill, level });
    }
  });

  const completionPercentage = requiredSkills.length > 0
    ? Math.round((existing.length / requiredSkills.length) * 100)
    : 0;

  return { missing, existing, completionPercentage };
};

/**
 * Generate career advice based on top categories
 */
const generateCareerAdvice = (categoryScores) => {
  const sorted = Object.entries(categoryScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const adviceMap = {
    dataAnalysis: "You have strong data analysis tendencies. Consider careers in Data Science or Business Analytics.",
    aiMl: "Your AI/ML interest is high. Machine Learning Engineer or AI Engineer could be excellent fits.",
    cybersecurity: "You show strong security interests. Cybersecurity Analyst or Ethical Hacking could be ideal.",
    uiux: "You have great design sensibilities. UI/UX Design or Frontend Development might suit you well.",
    cloud: "You're drawn to cloud computing. Cloud Engineering or DevOps are promising paths.",
    networking: "Networking is your strength. Consider Network Engineer or Cybersecurity roles.",
    gameDev: "Game development excites you. Game Developer or AR/VR Developer could be great paths.",
    mobileDev: "Mobile development is your area. Mobile App Development is a natural choice.",
    programming: "You have strong programming interests. Software Engineering or Backend Development could be ideal.",
    mathematics: "Your mathematical aptitude is high. Data Science or ML Engineering would leverage this well.",
    logicalThinking: "Your logical thinking is strong. Software Engineering or Problem-solving roles would suit you.",
    problemSolving: "You excel at problem-solving. Engineering and analytical roles would be great fits."
  };

  return sorted.map(([cat]) => adviceMap[cat]).filter(Boolean);
};

module.exports = { calculateCareerScores, calculateCategoryScores, analyzeSkillGap, generateCareerAdvice, CAREER_WEIGHTS };
