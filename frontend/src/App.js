import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuizPage from './pages/QuizPage';
import RecommendationsPage from './pages/RecommendationsPage';
import CareerExplorationPage from './pages/CareerExplorationPage';
import CareerDetailPage from './pages/CareerDetailPage';
import RoadmapPage from './pages/RoadmapPage';
import DashboardPage from './pages/DashboardPage';
import CompareCareerPage from './pages/CompareCareerPage';
import NotFoundPage from './pages/NotFoundPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6C63FF', light: '#9C94FF', dark: '#4B43CC' },
    secondary: { main: '#00D4AA', light: '#33DDBB', dark: '#00A880' },
    background: { default: '#0A0E1A', paper: '#111827' },
    text: { primary: '#F1F5F9', secondary: '#94A3B8' },
    success: { main: '#10B981' },
    warning: { main: '#F59E0B' },
    error: { main: '#EF4444' },
    info: { main: '#3B82F6' }
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { styleOverrides: { root: { backgroundImage: 'none', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 10, padding: '10px 24px', fontWeight: 600 }, contained: { boxShadow: 'none', '&:hover': { boxShadow: '0 8px 25px rgba(108, 99, 255, 0.35)' } } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
    MuiLinearProgress: { styleOverrides: { root: { borderRadius: 10, height: 8 } } }
  }
});

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/explore" element={<CareerExplorationPage />} />
        <Route path="/career/:slug" element={<CareerDetailPage />} />
        <Route path="/roadmap/:slug" element={<RoadmapPage />} />
        <Route path="/compare" element={<CompareCareerPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;