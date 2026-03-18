const quizQuestions = [
  // Programming (3 questions)
  {
    question: "I enjoy writing code and building software applications from scratch.",
    category: "programming",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.2,
    orderIndex: 1
  },
  {
    question: "I like learning new programming languages and frameworks.",
    category: "programming",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.0,
    orderIndex: 2
  },
  {
    question: "I enjoy debugging code and fixing complex technical issues.",
    category: "programming",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.0,
    orderIndex: 3
  },

  // Data Analysis (3 questions)
  {
    question: "I enjoy working with spreadsheets, charts, and analyzing numerical data.",
    category: "dataAnalysis",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.2,
    orderIndex: 4
  },
  {
    question: "I like finding patterns and meaningful insights from large datasets.",
    category: "dataAnalysis",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.2,
    orderIndex: 5
  },
  {
    question: "I would enjoy creating data visualizations to tell stories with data.",
    category: "dataAnalysis",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.0,
    orderIndex: 6
  },

  // AI/ML (2 questions)
  {
    question: "I am fascinated by how machines can learn from data and make predictions.",
    category: "aiMl",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.3,
    orderIndex: 7
  },
  {
    question: "I am interested in building AI models like chatbots, image recognizers, or recommendation systems.",
    category: "aiMl",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.3,
    orderIndex: 8
  },

  // Cloud Computing (2 questions)
  {
    question: "I am interested in managing servers, deploying applications, and cloud infrastructure.",
    category: "cloud",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.2,
    orderIndex: 9
  },
  {
    question: "I like the idea of automating deployments and managing scalable infrastructure.",
    category: "cloud",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.0,
    orderIndex: 10
  },

  // Networking (2 questions)
  {
    question: "I enjoy understanding how networks and internet protocols work.",
    category: "networking",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.2,
    orderIndex: 11
  },
  {
    question: "I am interested in setting up and managing network infrastructure like routers and firewalls.",
    category: "networking",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.0,
    orderIndex: 12
  },

  // Cybersecurity (3 questions)
  {
    question: "I am passionate about protecting systems and data from hackers and cyber threats.",
    category: "cybersecurity",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.3,
    orderIndex: 13
  },
  {
    question: "I enjoy the challenge of finding security vulnerabilities in software and networks.",
    category: "cybersecurity",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.3,
    orderIndex: 14
  },
  {
    question: "I am interested in ethical hacking, penetration testing, or digital forensics.",
    category: "cybersecurity",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.2,
    orderIndex: 15
  },

  // UI/UX (2 questions)
  {
    question: "I enjoy designing visually appealing and user-friendly interfaces.",
    category: "uiux",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.2,
    orderIndex: 16
  },
  {
    question: "I care deeply about how users experience and interact with digital products.",
    category: "uiux",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.2,
    orderIndex: 17
  },

  // Game Development (2 questions)
  {
    question: "I have always been excited by the idea of creating my own video games.",
    category: "gameDev",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.2,
    orderIndex: 18
  },
  {
    question: "I am interested in 3D graphics, game physics, and interactive simulations.",
    category: "gameDev",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.0,
    orderIndex: 19
  },

  // Mobile Development (2 questions)
  {
    question: "I enjoy using mobile apps and would love to build apps for iOS or Android.",
    category: "mobileDev",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.2,
    orderIndex: 20
  },
  {
    question: "I want to create mobile applications that millions of users can download and use.",
    category: "mobileDev",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.0,
    orderIndex: 21
  },

  // Problem Solving (3 questions)
  {
    question: "I enjoy solving complex logic puzzles and challenging problems.",
    category: "problemSolving",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.1,
    orderIndex: 22
  },
  {
    question: "I like breaking down big problems into smaller, manageable steps.",
    category: "problemSolving",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.0,
    orderIndex: 23
  },
  {
    question: "I enjoy competitive programming and solving algorithmic challenges.",
    category: "problemSolving",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.1,
    orderIndex: 24
  },

  // Mathematics (3 questions)
  {
    question: "I enjoy subjects like calculus, linear algebra, and statistics.",
    category: "mathematics",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.1,
    orderIndex: 25
  },
  {
    question: "I am comfortable working with mathematical formulas, equations, and proofs.",
    category: "mathematics",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.0,
    orderIndex: 26
  },
  {
    question: "I find probability, statistics, and data modeling concepts exciting.",
    category: "mathematics",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.1,
    orderIndex: 27
  },

  // Logical Thinking (3 questions)
  {
    question: "I naturally think in a structured, systematic, and analytical way.",
    category: "logicalThinking",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.0,
    orderIndex: 28
  },
  {
    question: "I enjoy working through scenarios, hypotheses, and what-if analysis.",
    category: "logicalThinking",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.0,
    orderIndex: 29
  },
  {
    question: "I prefer working on tasks that have clear rules, patterns, and logical outcomes.",
    category: "logicalThinking",
    options: [
      { text: "Strongly Agree", value: 4 },
      { text: "Agree", value: 3 },
      { text: "Neutral", value: 2 },
      { text: "Disagree", value: 1 }
    ],
    weight: 1.0,
    orderIndex: 30
  }
];

module.exports = quizQuestions;
