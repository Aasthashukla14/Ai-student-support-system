import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Chip, Button, Divider, List, ListItem, ListItemIcon, ListItemText, CircularProgress, Alert, Tab, Tabs, LinearProgress } from '@mui/material';
import { CheckCircle, Work, School, TrendingUp, ArrowForward, ArrowBack, Build, EmojiEvents, CompareArrows } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const DIFFICULTY_COLORS = { Beginner: '#10B981', Intermediate: '#3B82F6', Advanced: '#F59E0B', Expert: '#EF4444' };
const LEVEL_COLORS = { Basic: '#10B981', Intermediate: '#3B82F6', Advanced: '#EC4899' };

export default function CareerDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [career, setCareer] = useState(null);
  const [skillGap, setSkillGap] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [careerRes, roadmapRes, projectsRes] = await Promise.allSettled([
          api.get(`/careers/${slug}`),
          api.get(`/roadmap/${slug}`),
          api.get(`/projects/${encodeURIComponent(slug.replace(/-/g, ' '))}`)
        ]);
        if (careerRes.status === 'fulfilled') {
          setCareer(careerRes.value.data.career);
          // Skill gap if user is logged in
          if (user?.skills?.length > 0) {
            try {
              const sgRes = await api.post(`/careers/${slug}/skill-gap`, { userSkills: user.skills });
              setSkillGap(sgRes.data);
            } catch (_) {}
          }
        } else setError('Career not found.');
        if (roadmapRes.status === 'fulfilled') setRoadmap(roadmapRes.value.data.roadmap);
        if (projectsRes.status === 'fulfilled') setProjects(projectsRes.value.data.projects?.slice(0, 6) || []);
      } catch (e) {
        setError('Failed to load career details.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [slug, user]);

  if (loading) return <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box>;
  if (error || !career) return <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Alert severity="error">{error || 'Career not found'}</Alert></Box>;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', py: 5 }}>
      <Container maxWidth="lg">
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3, color: 'text.secondary' }}>Back</Button>

        {/* Hero */}
        <Card sx={{ background: `linear-gradient(135deg, ${career.color}15, rgba(17,24,39,0.95))`, border: `1px solid ${career.color}30`, mb: 4 }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ fontSize: '3rem' }}>{career.icon}</Box>
                  <Box>
                    <Chip label={career.category} size="small" sx={{ mb: 1, bgcolor: `${career.color}20`, color: career.color, border: `1px solid ${career.color}40` }} />
                    <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.2 }}>{career.name}</Typography>
                  </Box>
                </Box>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.05rem', mb: 3 }}>{career.description}</Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                  {career.industryDemand === 'Very High' && (
                    <Chip label="🔥 High Demand" sx={{ bgcolor: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', fontWeight: 700 }} />
                  )}
                  <Chip label={career.difficultyLevel} sx={{ bgcolor: `${DIFFICULTY_COLORS[career.difficultyLevel]}20`, color: DIFFICULTY_COLORS[career.difficultyLevel], fontWeight: 700 }} />
                  <Chip label={`Demand: ${career.industryDemand}`} icon={<TrendingUp sx={{ fontSize: '16px !important' }} />} sx={{ bgcolor: 'rgba(16,185,129,0.1)', color: '#10B981', fontWeight: 600 }} />
                  <Chip label={`⏱️ ${career.preparationTime}`} sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: 'text.secondary' }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>SALARY RANGE (INDIA)</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#00D4AA', mt: 0.5 }}>
                      ₹{(career.salaryRange?.min / 100000).toFixed(0)}L – {(career.salaryRange?.max / 100000).toFixed(0)}L
                    </Typography>
                    <Typography variant="caption" color="text.secondary">per year</Typography>
                    <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.06)' }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>SALARY (US)</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#3B82F6', mt: 0.5 }}>
                      ${career.salaryRangeUS?.min?.toLocaleString()} – ${career.salaryRangeUS?.max?.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button fullWidth variant="contained" onClick={() => navigate(`/roadmap/${career.slug}`)} endIcon={<School />}
                    sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', py: 1.2 }}>
                    View Roadmap
                  </Button>
                  <Button variant="outlined" onClick={() => navigate(`/compare?career1=${career.slug}`)} sx={{ borderColor: 'rgba(255,255,255,0.15)', minWidth: 50 }}>
                    <CompareArrows />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3, '& .MuiTab-root': { fontWeight: 600 }, '& .MuiTabs-indicator': { background: 'linear-gradient(90deg, #6C63FF, #00D4AA)' } }}>
          <Tab label="Skills & Tools" />
          <Tab label="Job Roles" />
          {skillGap && <Tab label="My Skill Gap" />}
          <Tab label="Certifications" />
          {projects.length > 0 && <Tab label="Projects" />}
        </Tabs>

        {/* Skills Tab */}
        {tab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>Required Skills</Typography>
                  {career.requiredSkills?.map(({ skill, level }) => (
                    <Box key={skill} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle sx={{ fontSize: 16, color: LEVEL_COLORS[level] || '#6C63FF' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{skill}</Typography>
                      </Box>
                      <Chip label={level} size="small" sx={{ bgcolor: `${LEVEL_COLORS[level]}15`, color: LEVEL_COLORS[level], border: `1px solid ${LEVEL_COLORS[level]}30`, fontSize: 10, fontWeight: 600 }} />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>Recommended Tools</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {career.recommendedTools?.map(tool => (
                      <Chip key={tool} label={tool} icon={<Build sx={{ fontSize: '14px !important' }} />}
                        sx={{ bgcolor: 'rgba(108,99,255,0.1)', color: '#9C94FF', border: '1px solid rgba(108,99,255,0.2)', fontWeight: 500 }} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Job Roles Tab */}
        {tab === 1 && (
          <Card sx={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>Career Progression</Typography>
              <Grid container spacing={2}>
                {career.jobRoles?.map((role, i) => (
                  <Grid item xs={12} sm={6} key={role}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <Box sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: 'rgba(108,99,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: 'primary.main' }}>{i + 1}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{role}</Typography>
                        <Typography variant="caption" color="text.secondary">{i === 0 ? 'Entry Level' : i === career.jobRoles.length - 1 ? 'Senior Level' : 'Mid Level'}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Skill Gap Tab */}
        {tab === 2 && skillGap && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: skillGap.completionPercentage >= 60 ? '#10B981' : skillGap.completionPercentage >= 30 ? '#F59E0B' : '#EF4444' }}>
                    {skillGap.completionPercentage}%
                  </Typography>
                  <Typography color="text.secondary">Skills Ready</Typography>
                  <LinearProgress variant="determinate" value={skillGap.completionPercentage} sx={{ mt: 2, height: 10, borderRadius: 10, bgcolor: 'rgba(255,255,255,0.06)', '& .MuiLinearProgress-bar': { bgcolor: skillGap.completionPercentage >= 60 ? '#10B981' : '#F59E0B' } }} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#10B981', mb: 2 }}>✅ You Have ({skillGap.existing?.length})</Typography>
                  {skillGap.existing?.map(s => <Chip key={s.skill} label={s.skill} size="small" sx={{ m: 0.4, bgcolor: 'rgba(16,185,129,0.15)', color: '#10B981' }} />)}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#EF4444', mb: 2 }}>❌ To Learn ({skillGap.missing?.length})</Typography>
                  {skillGap.missing?.map(s => <Chip key={s.skill} label={s.skill} size="small" sx={{ m: 0.4, bgcolor: 'rgba(239,68,68,0.15)', color: '#EF4444' }} />)}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Certifications Tab */}
        {((skillGap && tab === 3) || (!skillGap && tab === 2)) && (
          <Card sx={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmojiEvents sx={{ color: '#F59E0B' }} /> Recommended Certifications
              </Typography>
              <Grid container spacing={2}>
                {career.certifications?.map((cert, i) => (
                  <Grid item xs={12} sm={6} key={cert}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, bgcolor: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
                      <EmojiEvents sx={{ color: '#F59E0B', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{cert}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Projects Tab */}
        {projects.length > 0 && tab === (skillGap ? 4 : 3) && (
          <Grid container spacing={2.5}>
            {projects.map(p => (
              <Grid item xs={12} sm={6} md={4} key={p._id}>
                <Card sx={{ height: '100%', background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: 700, flex: 1 }}>{p.title}</Typography>
                      <Chip label={p.difficulty} size="small" sx={{ ml: 1, flexShrink: 0, bgcolor: `${DIFFICULTY_COLORS[p.difficulty]}15`, color: DIFFICULTY_COLORS[p.difficulty], fontSize: 10 }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>{p.description}</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {p.techStack?.slice(0, 4).map(t => <Chip key={t} label={t} size="small" sx={{ fontSize: 10, bgcolor: 'rgba(108,99,255,0.1)', color: '#9C94FF' }} />)}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}