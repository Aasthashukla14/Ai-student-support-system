# 🎓 CareerAI — AI Student Support System for Career Path Guidance

An intelligent full-stack platform that helps engineering students discover suitable IT career paths using AI-powered interest assessment, personalized roadmaps, skill gap analysis, and project recommendations.

---

## 🌟 Project Info

> 📁 **GitHub:** [https://github.com/Aasthashukla14/Ai-student-support-system](https://github.com/Aasthashukla14/Ai-student-support-system)
> 💻 **Runs locally** on `http://localhost:3000`
> 🎓 **Submitted as:** Final Year College Project

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 AI Career Quiz | 30-question interest assessment across 12 categories |
| 🤖 Recommendation Engine | Rule-based AI scoring with weighted career mapping |
| 🗺️ Learning Roadmaps | Step-by-step paths with curated resources for all 39 careers |
| 📊 Skill Gap Analysis | Compare your skills vs required skills for any career |
| 🔍 Career Exploration | Browse 39+ careers with salary, difficulty, and demand info |
| ⚖️ Career Comparison | Compare two career paths side-by-side |
| 📁 Project Ideas | 55+ real projects organized by career field |
| 📈 Progress Tracking | Mark roadmap steps as complete with progress percentage |
| 🔐 Auth System | JWT-based register/login with bcrypt password hashing |
| ✏️ Profile Edit | Update name, department, semester, skills and interests |
| 🔥 High Demand Badges | Visual indicators on high-demand careers |
| 📄 Print Roadmap | Save any roadmap as a clean PDF document |
| 🚫 404 Page | Helpful not-found page with navigation options |
| 💾 Quiz Results Saved | Results persist even after browser close |
| 📱 Responsive UI | Mobile-first dark theme with Material UI |

---

## 🏗️ Tech Stack

```
Frontend:  React.js 18, Material UI 5, React Router 6, Axios
Backend:   Node.js 18+, Express.js 4, MongoDB (Mongoose)
Auth:      JWT (jsonwebtoken), bcryptjs
Database:  MongoDB (Local or Atlas)
```

---

## 📁 Project Structure

```
ai-student-support-system/
├── backend/
│   ├── algorithms/
│   │   └── recommendationEngine.js   ← AI scoring algorithm
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── careerController.js
│   │   ├── dashboardController.js
│   │   ├── quizController.js
│   │   └── roadmapController.js
│   ├── data/
│   │   ├── careerFields.js           ← 39 career datasets
│   │   ├── quizQuestions.js          ← 30 quiz questions
│   │   ├── projects.js               ← 55+ project ideas
│   │   └── roadmaps.js               ← 39 detailed roadmaps
│   ├── middleware/
│   │   ├── auth.js
│   │   └── optionalAuth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── CareerField.js
│   │   ├── QuizResponse.js
│   │   ├── Roadmap.js
│   │   └── ProjectAndQuiz.js
│   ├── routes/
│   ├── utils/seeder.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/common/Navbar.js
        ├── context/AuthContext.js
        ├── pages/
        │   ├── HomePage.js
        │   ├── LoginPage.js
        │   ├── RegisterPage.js
        │   ├── QuizPage.js
        │   ├── RecommendationsPage.js
        │   ├── CareerExplorationPage.js
        │   ├── CareerDetailPage.js
        │   ├── RoadmapPage.js
        │   ├── DashboardPage.js
        │   ├── CompareCareerPage.js
        │   └── NotFoundPage.js
        ├── services/api.js
        ├── App.js
        └── index.js
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+ → nodejs.org
- MongoDB Community Server → mongodb.com/try/download/community
- Git → git-scm.com

### Step 1 — Clone
```bash
git clone https://github.com/Aasthashukla14/Ai-student-support-system.git
cd Ai-student-support-system
```

### Step 2 — Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-student-support
JWT_SECRET=mySuper$ecretKey123CareerAI2024
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Step 3 — Seed Database
```bash
npm run seed
```

### Step 4 — Start Backend
```bash
npm run dev
```
Runs at: http://localhost:5000

### Step 5 — Frontend
```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 6 — Start Frontend
```bash
npm start
```
Opens at: http://localhost:3000

---

## 🤖 AI Algorithm

The recommendation engine uses a **rule-based weighted scoring system**:

```
1. User answers 30 questions across 12 interest categories
   Answers: Strongly Agree(4) Agree(3) Neutral(2) Disagree(1)

2. Category Score = (sum of weighted answers / max possible) × 100

3. Career Score = Σ(category_score × career_weight) / Σ(weights) × 100

4. All 39 careers ranked → Top 5 recommended
```

**12 Interest Categories:** Programming, Data Analysis, AI/ML, Cloud Computing,
Networking, Cybersecurity, UI/UX Design, Game Development, Mobile Development,
Problem Solving, Mathematics, Logical Thinking

---

## 🌐 API Reference

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| PUT | `/api/auth/profile` | Update profile | ✅ |
| GET | `/api/quiz/questions` | Get 30 questions | ❌ |
| POST | `/api/quiz/submit` | Submit quiz | Optional |
| GET | `/api/careers` | List all careers | ❌ |
| GET | `/api/careers/:slug` | Career details | ❌ |
| POST | `/api/careers/:slug/skill-gap` | Skill gap | Optional |
| GET | `/api/careers/compare` | Compare careers | ❌ |
| GET | `/api/roadmap/:slug` | Get roadmap | Optional |
| PUT | `/api/roadmap/:slug/progress` | Save progress | ✅ |
| GET | `/api/dashboard` | Dashboard data | ✅ |

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Landing page |
| Login | `/login` | Sign in |
| Register | `/register` | Create account |
| Quiz | `/quiz` | 30-question AI assessment |
| Results | `/recommendations` | AI career recommendations |
| Explore | `/explore` | Browse all 39 careers |
| Career Detail | `/career/:slug` | Full career info + skill gap |
| Roadmap | `/roadmap/:slug` | Learning path + PDF export |
| Compare | `/compare` | Side-by-side comparison |
| Dashboard | `/dashboard` | User progress hub |
| 404 | `/*` | Not found page |

---

## 🎓 Career Fields (39 Total)

**Beginner Level (6):** Web Designer, Junior Python Developer, IT Support Specialist,
Junior Data Analyst, Junior Network Technician, Content & Technical Writer

**Intermediate Level (15):** Data Analyst, Frontend Developer, Full Stack Developer,
Backend Developer, Mobile App Developer, QA Engineer, UI Designer, UX Designer,
Business Analyst, Database Administrator, Network Engineer, System Administrator,
Automation Test Engineer, Software Engineer, Technical Consultant

**Advanced Level (12):** Data Scientist, Data Engineer, Cloud Engineer, DevOps Engineer,
Cybersecurity Analyst, Security Engineer, IoT Engineer, AR/VR Developer,
Product Manager, Game Developer, Blockchain Developer, Big Data Engineer

**Expert Level (6):** Machine Learning Engineer, AI Engineer, Ethical Hacker,
Cloud Architect, Site Reliability Engineer, Robotics Engineer

---

## ☁️ Deployment (Optional)

### Backend → Railway (Free)
1. Go to railway.app → New Project → Deploy from GitHub
2. Select `backend` as root directory
3. Add MongoDB plugin
4. Add environment variables
5. Deploy

### Frontend → Vercel (Free)
1. Go to vercel.com → New Project → Import GitHub repo
2. Select `frontend` as root directory
3. Add: `REACT_APP_API_URL=https://your-railway-url/api`
4. Deploy

> ⚠️ For deployment, replace local MongoDB URI with MongoDB Atlas or Railway MongoDB plugin URI.

---

## 🔒 Security Features
- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens expire in 7 days
- CORS configured for specific origins
- Quiz works without login (optional auth)
- Input validation on all API endpoints

---

## 📝 License

MIT — Free to use, modify, and distribute for educational purposes.

---

> Built with ❤️ for engineering students navigating tech career choices.
> **CareerAI** — Helping students find their perfect tech career path through AI-powered guidance.