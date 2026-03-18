import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, Chip, Avatar } from '@mui/material';
import { AutoAwesome, Quiz, TrendingUp, School, Code, Security, Cloud, Brush, ArrowForward, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: <Quiz />, title: 'AI Interest Quiz', desc: 'Answer 30 smart questions to discover your ideal tech career path.', color: '#6C63FF' },
  { icon: <TrendingUp />, title: 'Career Recommendations', desc: 'Get top 5 personalized career matches ranked by your interest scores.', color: '#00D4AA' },
  { icon: <School />, title: 'Learning Roadmaps', desc: 'Step-by-step learning paths with resources, tools, and timelines.', color: '#F59E0B' },
  { icon: <Code />, title: 'Skill Gap Analysis', desc: 'See exactly which skills you\'re missing and how to acquire them.', color: '#3B82F6' },
  { icon: <Security />, title: '33+ Career Paths', desc: 'Explore every tech career from ML Engineer to Ethical Hacker.', color: '#EF4444' },
  { icon: <Brush />, title: 'Project Ideas', desc: '55+ real project ideas organized by career field and difficulty.', color: '#EC4899' },
];

const stats = [
  { value: '39+', label: 'Career Paths' },
  { value: '30', label: 'Quiz Questions' },
  { value: '55+', label: 'Project Ideas' },
  { value: '39+', label: 'Roadmaps' },
];

const careerTags = ['Data Science', 'Web Dev', 'Cybersecurity', 'Cloud', 'AI/ML', 'DevOps', 'Mobile', 'Blockchain', 'IoT', 'Game Dev', 'UI/UX', 'SRE', 'Beginner Friendly', 'Python', 'Networking'];
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A' }}>
      {/* Hero */}
      <Box sx={{ position: 'relative', overflow: 'hidden', pt: { xs: 8, md: 14 }, pb: { xs: 8, md: 12 } }}>
        {/* Background glow effects */}
        <Box sx={{ position: 'absolute', top: '10%', left: '20%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', top: '30%', right: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Chip icon={<AutoAwesome sx={{ fontSize: '14px !important' }} />} label="AI-Powered Career Guidance for Engineering Students"
              sx={{ mb: 3, bgcolor: 'rgba(108,99,255,0.15)', color: '#9C94FF', border: '1px solid rgba(108,99,255,0.3)', fontWeight: 600, fontSize: 13, py: 2 }} />

            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' }, fontWeight: 900, lineHeight: 1.1, mb: 3 }}>
              Discover Your{' '}
              <Box component="span" sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Perfect Tech Career
              </Box>
              <br />Path with AI
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto', mb: 5, lineHeight: 1.7, fontWeight: 400, fontSize: { xs: '1rem', md: '1.15rem' } }}>
              Take a 30-question AI assessment, get personalized career recommendations, skill gap analysis, learning roadmaps, and project ideas — all in one platform.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}>
              <Button variant="contained" size="large" endIcon={<ArrowForward />} onClick={() => navigate('/quiz')}
                sx={{ px: 4, py: 1.5, fontSize: '1rem', background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', '&:hover': { background: 'linear-gradient(135deg, #4B43CC, #00A880)', transform: 'translateY(-2px)' }, transition: 'all 0.2s' }}>
                Take Free Career Quiz
              </Button>
              <Button variant="outlined" size="large" onClick={() => navigate('/explore')}
                sx={{ px: 4, py: 1.5, fontSize: '1rem', borderColor: 'rgba(255,255,255,0.2)', '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(108,99,255,0.1)' } }}>
                Explore Careers
              </Button>
            </Box>

            {/* Trust signals */}
            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Free to use', 'No signup required for quiz', 'AI-powered recommendations'].map(t => (
                <Box key={t} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CheckCircle sx={{ fontSize: 14, color: '#00D4AA' }} />
                  <Typography variant="caption" color="text.secondary">{t}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Stats */}
          <Grid container spacing={3} sx={{ mt: 8, mb: 2 }}>
            {stats.map(s => (
              <Grid item xs={6} md={3} key={s.label}>
                <Card sx={{ textAlign: 'center', py: 3, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Typography variant="h3" sx={{ fontWeight: 900, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {s.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{s.label}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Career tags marquee */}
      <Box sx={{ py: 3, bgcolor: 'rgba(108,99,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {careerTags.map(tag => (
              <Chip key={tag} label={tag} size="small" onClick={() => navigate('/explore')}
                sx={{ bgcolor: 'rgba(108,99,255,0.1)', color: '#9C94FF', border: '1px solid rgba(108,99,255,0.2)', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(108,99,255,0.2)' } }} />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Everything You Need to{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>Launch Your Career</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', fontSize: '1.05rem' }}>
            A complete career guidance system designed specifically for engineering and CS students.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ height: '100%', p: 1, background: 'rgba(255,255,255,0.02)', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-6px)', background: 'rgba(255,255,255,0.04)', boxShadow: `0 20px 60px ${f.color}20` } }}>
                <CardContent sx={{ p: 3 }}>
                  <Avatar sx={{ bgcolor: `${f.color}20`, color: f.color, mb: 2.5, width: 52, height: 52 }}>{f.icon}</Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{f.title}</Typography>
                  <Typography color="text.secondary" variant="body2" sx={{ lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,170,0.1))', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Ready to Find Your Career Path?</Typography>
          <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
            Join thousands of students who found clarity with our AI career guidance system.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" onClick={() => navigate('/quiz')} endIcon={<ArrowForward />}
              sx={{ px: 5, py: 1.5, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', fontSize: '1rem' }}>
              Start the Quiz Now
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/register')}
              sx={{ px: 5, py: 1.5, borderColor: 'rgba(255,255,255,0.2)', fontSize: '1rem' }}>
              Create Account
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
        <Typography color="text.secondary" variant="body2">
          © 2024 CareerAI — AI Student Support System for Career Path Guidance
        </Typography>
      </Box>
    </Box>
  );
}
