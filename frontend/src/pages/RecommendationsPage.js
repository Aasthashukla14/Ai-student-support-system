import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Grid, Chip, LinearProgress, Alert, CircularProgress, Avatar } from '@mui/material';
import { TrendingUp, School, ArrowForward, AutoAwesome, Lightbulb, Replay } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CAREER_ICONS = { 'Data Analyst':'📊','Data Scientist':'🔬','Machine Learning Engineer':'🤖','AI Engineer':'🧠','Data Engineer':'⚙️','Software Engineer':'💻','Full Stack Developer':'🌐','Frontend Developer':'🎨','Backend Developer':'⚡','Mobile App Developer':'📱','Game Developer':'🎮','Cloud Engineer':'☁️','DevOps Engineer':'🔄','Cloud Architect':'🏛️','Cybersecurity Analyst':'🛡️','Ethical Hacker':'🔓','Security Engineer':'🔒','Network Engineer':'🌐','System Administrator':'🖥️','Blockchain Developer':'⛓️','IoT Engineer':'🔌','Robotics Engineer':'🦾','AR/VR Developer':'🥽','QA Engineer':'✅','Automation Test Engineer':'⚙️','UI Designer':'🖌️','UX Designer':'🧩','Business Analyst':'📈','Product Manager':'📋','Database Administrator':'🗄️','Big Data Engineer':'💾','Site Reliability Engineer':'🔧','Technical Consultant':'💼' };
const COLORS = ['#6C63FF','#00D4AA','#F59E0B','#3B82F6','#EC4899'];

const CategoryBar = ({ label, value, color }) => (
  <Box sx={{ mb: 1.5 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>{label}</Typography>
      <Typography variant="caption" sx={{ fontWeight: 700, color }}>{value}%</Typography>
    </Box>
    <LinearProgress variant="determinate" value={value}
      sx={{ height: 6, borderRadius: 10, bgcolor: 'rgba(255,255,255,0.06)', '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 10 } }} />
  </Box>
);

const CATEGORY_LABELS = { programming:'Programming', dataAnalysis:'Data Analysis', aiMl:'AI/ML', cloud:'Cloud', networking:'Networking', cybersecurity:'Cybersecurity', uiux:'UI/UX', gameDev:'Game Dev', mobileDev:'Mobile Dev', problemSolving:'Problem Solving', mathematics:'Mathematics', logicalThinking:'Logical Thinking' };

export default function RecommendationsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem('quizResults') || localStorage.getItem('quizResults');
    if (saved) {
      setResults(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  if (loading) return <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box>;

  if (!results) return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ mb: 2 }}>No results found</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Take the quiz first to see your career recommendations.</Typography>
        <Button variant="contained" onClick={() => navigate('/quiz')} sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)' }}>Take the Quiz</Button>
      </Container>
    </Box>
  );

  const { recommendations, categoryScores, advice, allRankings } = results;
  const topCareer = recommendations?.[0];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip icon={<AutoAwesome sx={{ fontSize: '14px !important' }} />} label="AI Analysis Complete"
            sx={{ mb: 2, bgcolor: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.3)' }} />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>Your Career Recommendations</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', fontSize: '1.05rem' }}>
            Based on your quiz responses, here are your top matched career paths ranked by compatibility.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left — Top 5 recommendations */}
          <Grid item xs={12} md={7}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>🎯 Top 5 Career Matches</Typography>
            {recommendations?.map((rec, i) => (
              <Card key={rec.career} sx={{ mb: 2.5, background: i === 0 ? 'rgba(108,99,255,0.08)' : 'rgba(17,24,39,0.9)', border: `1px solid ${i === 0 ? 'rgba(108,99,255,0.4)' : 'rgba(255,255,255,0.06)'}`, transition: 'all 0.2s', '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 15px 40px ${COLORS[i]}25` } }}>
                <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2.5 }}>
                  {/* Rank */}
                  <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: i === 0 ? 'linear-gradient(135deg, #6C63FF, #00D4AA)' : `${COLORS[i]}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Typography sx={{ fontWeight: 900, fontSize: i === 0 ? '1.1rem' : '1rem', color: i === 0 ? 'white' : COLORS[i] }}>#{i + 1}</Typography>
                  </Box>

                  {/* Icon & Name */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                      <Typography sx={{ fontSize: '1.3rem' }}>{CAREER_ICONS[rec.career] || '💼'}</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' } }}>{rec.career}</Typography>
                      {i === 0 && <Chip label="Best Match" size="small" sx={{ bgcolor: 'rgba(108,99,255,0.2)', color: '#9C94FF', border: '1px solid rgba(108,99,255,0.4)', fontWeight: 700, height: 22, fontSize: 11 }} />}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <LinearProgress variant="determinate" value={rec.matchPercentage}
                        sx={{ flex: 1, height: 7, borderRadius: 10, bgcolor: 'rgba(255,255,255,0.06)', '& .MuiLinearProgress-bar': { background: `linear-gradient(90deg, ${COLORS[i]}, ${i === 0 ? '#00D4AA' : COLORS[i]}cc)`, borderRadius: 10 } }} />
                      <Typography sx={{ fontWeight: 800, color: COLORS[i], fontSize: '0.95rem', minWidth: 45 }}>{rec.matchPercentage}%</Typography>
                    </Box>
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexShrink: 0 }}>
                    <Button size="small" variant={i === 0 ? 'contained' : 'outlined'} onClick={() => navigate(`/career/${rec.career.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`)} endIcon={<ArrowForward />}
                      sx={{ fontSize: 11, px: 1.5, py: 0.5, background: i === 0 ? 'linear-gradient(135deg, #6C63FF, #00D4AA)' : undefined, borderColor: i !== 0 ? 'rgba(255,255,255,0.15)' : undefined }}>
                      Explore
                    </Button>
                    <Button size="small" variant="outlined" onClick={() => navigate(`/roadmap/${rec.career.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`)} endIcon={<School sx={{ fontSize: 14 }} />}
                      sx={{ fontSize: 11, px: 1.5, py: 0.5, borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}>
                      Roadmap
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}

            <Button variant="outlined" startIcon={<Replay />} onClick={() => navigate('/quiz')} fullWidth
              sx={{ mt: 1, borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary', py: 1.2 }}>
              Retake Quiz
            </Button>
          </Grid>

          {/* Right — Category scores & advice */}
          <Grid item xs={12} md={5}>
            {/* Category Analysis */}
            <Card sx={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)', mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUp sx={{ color: 'primary.main' }} /> Interest Analysis
                </Typography>
                {categoryScores && Object.entries(categoryScores).map(([cat, score], i) => (
                  <CategoryBar key={cat} label={CATEGORY_LABELS[cat] || cat} value={score} color={Object.values(COLORS)[i % COLORS.length]} />
                ))}
              </CardContent>
            </Card>

            {/* AI Advice */}
            {advice?.length > 0 && (
              <Card sx={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.2)', mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Lightbulb sx={{ color: '#F59E0B' }} /> AI Career Advice
                  </Typography>
                  {advice.map((a, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 2, alignItems: 'flex-start' }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#6C63FF', mt: 0.8, flexShrink: 0 }} />
                      <Typography color="text.secondary" variant="body2" sx={{ lineHeight: 1.7 }}>{a}</Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card sx={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,170,0.1))', border: '1px solid rgba(108,99,255,0.2)' }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Save Your Results</Typography>
                <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
                  Create a free account to save recommendations, track progress, and access your personalized dashboard.
                </Typography>
                <Button variant="contained" fullWidth onClick={() => navigate('/register')} sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', mb: 1 }}>
                  Create Free Account
                </Button>
                <Button variant="text" fullWidth onClick={() => navigate('/explore')} sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                  Browse all careers without account
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
