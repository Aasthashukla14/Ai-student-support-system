# 🎓 AI Student Support System — Career Path Guidance

An intelligent full-stack platform that helps engineering students discover suitable IT career paths using AI-powered interest assessment, personalized roadmaps, skill gap analysis, and project recommendations.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 AI Career Quiz | 30-question interest assessment across 12 categories |
| 🤖 Recommendation Engine | Rule-based AI scoring with weighted career mapping |
| 🗺️ Learning Roadmaps | Step-by-step paths with curated resources |
| 📊 Skill Gap Analysis | Compare your skills vs required skills |
| 🔍 Career Exploration | Browse 33+ careers with salary, difficulty, demand |
| ⚖️ Career Comparison | Compare two career paths side-by-side |
| 📁 Project Ideas | 55+ real projects organized by career field |
| 📈 Progress Tracking | Mark roadmap steps as complete |
| 🔐 Auth System | JWT-based register/login with bcrypt hashing |
| 📱 Responsive UI | Mobile-first dark theme with Material UI |

---

## 🏗️ Tech Stack

```
Frontend: React.js 18, Material UI 5, React Router 6, Chart.js
Backend:  Node.js 18+, Express.js 4, MongoDB (Mongoose)
Auth:     JWT (jsonwebtoken), bcryptjs
Database: MongoDB 
```

---

## 📁 Project Structure

```
ai-student-support-system/
├── backend/
│   ├── algorithms/
│   │   └── recommendationEngine.js   ← AI scoring algorithm
│   ├── config/
│   │   └── db.js                     ← MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── careerController.js
│   │   ├── dashboardController.js
│   │   └── quizController.js
│   ├── data/
│   │   ├── careerFields.js           ← 33 career datasets
│   │   ├── quizQuestions.js          ← 30 quiz questions
│   │   ├── projects.js               ← 55+ project ideas
│   │   └── roadmaps.js               ← 10 detailed roadmaps
│   ├── middleware/
│   │   ├── auth.js                   ← JWT protect + generateToken
│   │   └── optionalAuth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── CareerField.js
│   │   ├── QuizResponse.js
│   │   ├── Roadmap.js
│   │   └── ProjectAndQuiz.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── careers.js
│   │   ├── quiz.js
│   │   ├── roadmap.js
│   │   ├── projects.js
│   │   ├── dashboard.js
│   │   └── analytics.js
│   ├── utils/
│   │   └── seeder.js                 ← Database seed script
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── common/
    │   │       └── Navbar.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── LoginPage.js
    │   │   ├── RegisterPage.js
    │   │   ├── QuizPage.js
    │   │   ├── RecommendationsPage.js
    │   │   ├── CareerExplorationPage.js
    │   │   ├── CareerDetailPage.js
    │   │   ├── RoadmapPage.js
    │   │   ├── DashboardPage.js
    │   │   └── CompareCareerPage.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

---

## 🚀 Local Setup (Step-by-Step)

### Prerequisites
- Node.js 18+ (https://nodejs.org)
- MongoDB Atlas account (https://www.mongodb.com/atlas) — free tier works
- Git

---

### Step 1 — Clone / Download

```bash
# If using git
git clone https://github.com/yourusername/ai-student-support-system.git
cd ai-student-support-system

# Or extract the ZIP and navigate to the folder
```

---

### Step 2 — MongoDB Atlas Setup

1. Go to https://www.mongodb.com/atlas and create a free account
2. Create a new **free cluster** (M0)
3. Under **Database Access** → Add a user with password
4. Under **Network Access** → Add IP `0.0.0.0/0` (allow all) for development
5. Click **Connect** → **Drivers** → Copy the connection string
6. It looks like: `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
7. Add your database name: `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/ai-student-support?retryWrites=true&w=majority`

---

### Step 3 — Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ai-student-support?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_key_change_this_in_production_minimum_32_chars
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

---

### Step 4 — Seed the Database

```bash
# Still inside /backend
npm run seed
```

Expected output:
```
✅ MongoDB Connected for seeding
🗑️  Clearing existing data...
🌱 Seeding Career Fields...
   ✅ 33 career fields inserted
🌱 Seeding Roadmaps...
   ✅ 10 roadmaps inserted
🌱 Seeding Projects...
   ✅ 55 projects inserted
🌱 Seeding Quiz Questions...
   ✅ 30 quiz questions inserted
🎉 Database seeded successfully!
```

---

### Step 5 — Start Backend

```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

Server starts at: `http://localhost:5000`
Health check: `http://localhost:5000/api/health`

---

### Step 6 — Frontend Setup

```bash
# Open a new terminal
cd frontend

# Install dependencies
npm install
```

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

### Step 7 — Start Frontend

```bash
npm start
```

Frontend starts at: `http://localhost:3000`

---

## 🌐 API Reference

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| PUT | `/api/auth/profile` | Update profile | ✅ |

### Quiz
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/quiz/questions` | Get all 30 questions | ❌ |
| POST | `/api/quiz/submit` | Submit answers, get recommendations | Optional |
| GET | `/api/quiz/history` | Get user's quiz history | ✅ |

### Careers
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/careers` | List all careers (with filters) | ❌ |
| GET | `/api/careers/:slug` | Get career details | ❌ |
| POST | `/api/careers/:slug/skill-gap` | Get skill gap analysis | Optional |
| GET | `/api/careers/compare?career1=&career2=` | Compare two careers | ❌ |

### Roadmap
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/roadmap/:slug` | Get roadmap for career | Optional |
| PUT | `/api/roadmap/:slug/progress` | Save progress | ✅ |

### Projects
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/projects` | Get all projects | ❌ |
| GET | `/api/projects/:careerField` | Get projects by career | ❌ |

### Dashboard
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/dashboard` | Get user dashboard data | ✅ |
| PUT | `/api/dashboard/career` | Set selected career | ✅ |

### Analytics
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/analytics` | Get platform analytics | ❌ |

---

## 🤖 AI Algorithm — How It Works

The recommendation engine is a **rule-based weighted scoring system**:

```
1. User takes 30-question quiz
   → Each question maps to 1 of 12 interest categories
   → Answer values: Strongly Agree(4) Agree(3) Neutral(2) Disagree(1)

2. Category Score Calculation:
   → For each category: (sum of weighted answers / max possible) × 100

3. Career Score Calculation:
   → For each of 33 careers, pre-defined weights per category (0.0 – 1.0)
   → Career Score = Σ(category_score × career_weight) / Σ(weights) × 100

4. Ranking:
   → All 33 careers sorted by score
   → Top 5 returned as recommendations

5. Skill Gap Analysis:
   → User's skills list vs career's requiredSkills list
   → Fuzzy string matching to identify gaps
```

Example career weights for **Data Scientist**:
```
programming: 0.8, dataAnalysis: 1.0, aiMl: 0.9, mathematics: 1.0,
problemSolving: 0.9, logicalThinking: 0.9, cloud: 0.3, ...
```

---

## ☁️ Deployment

### Option A — Render (Recommended — Free)

**Backend on Render:**
1. Push your code to GitHub
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Set root directory: `backend`
5. Build command: `npm install`
6. Start command: `node server.js`
7. Add environment variables (from `.env`)
8. Deploy → note the URL (e.g., `https://your-app.onrender.com`)

**Frontend on Render (Static Site):**
1. New → Static Site
2. Root directory: `frontend`
3. Build command: `npm install && npm run build`
4. Publish directory: `build`
5. Add env var: `REACT_APP_API_URL=https://your-backend.onrender.com/api`

---

### Option B — Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd backend
railway init
railway up

# Deploy frontend
cd ../frontend
railway init
railway up
```

---

### Option C — Vercel (Frontend) + Railway (Backend)

**Backend on Railway:**
```bash
cd backend && railway up
```

**Frontend on Vercel:**
```bash
cd frontend
npm install -g vercel
REACT_APP_API_URL=https://your-railway-url.up.railway.app/api vercel --prod
```

---

## 🔒 Security Features

- Passwords hashed with **bcryptjs** (10 salt rounds)
- **JWT tokens** expire in 7 days
- **Optional auth middleware** — quiz works without login
- **CORS** configured for specific origins in production
- **Input validation** via express-validator ready to extend
- **401 auto-redirect** on expired tokens in frontend

---

## 📦 Database Collections Summary

| Collection | Documents | Purpose |
|---|---|---|
| Users | Dynamic | User accounts, skills, progress |
| CareerFields | 33 | All career data with weights |
| QuizQuestions | 30 | Assessment questions |
| Roadmaps | 10 | Step-by-step learning paths |
| Projects | 55+ | Project ideas by career |
| QuizResponses | Dynamic | User quiz history |

---

## 🎨 Pages Reference

| Page | Route | Description |
|---|---|---|
| Home | `/` | Landing page with features |
| Login | `/login` | JWT authentication |
| Register | `/register` | Create account with skills |
| Quiz | `/quiz` | 30-question assessment |
| Results | `/recommendations` | AI career recommendations |
| Explore | `/explore` | Browse/filter all careers |
| Career Detail | `/career/:slug` | Full career info + skill gap |
| Roadmap | `/roadmap/:slug` | Interactive learning path |
| Compare | `/compare` | Side-by-side career comparison |
| Dashboard | `/dashboard` | User progress hub (auth required) |

---

## 🛠️ Extending the Project

**Add more career fields:**
→ Edit `backend/data/careerFields.js` and re-run `npm run seed`

**Add more quiz questions:**
→ Edit `backend/data/quizQuestions.js` (max recommended: 40)

**Add roadmaps for more careers:**
→ Edit `backend/data/roadmaps.js` following the existing schema

**Add more project ideas:**
→ Edit `backend/data/projects.js`

**Tune AI weights:**
→ Edit `backend/algorithms/recommendationEngine.js` — `CAREER_WEIGHTS`

---

## 📝 License

MIT — Free to use, modify, and distribute.

---

Built with ❤️ for engineering students navigating tech career choices.
