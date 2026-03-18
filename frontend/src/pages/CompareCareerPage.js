import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip, Autocomplete, TextField, CircularProgress, Alert, LinearProgress, Divider } from '@mui/material';
import { CompareArrows, ArrowForward } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';

const DIFF_ORDER = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };
const DIFF_COLORS = { Beginner: '#10B981', Intermediate: '#3B82F6', Advanced: '#F59E0B', Expert: '#EF4444' };
const DEMAND_COLORS = { 'Very High': '#10B981', High: '#3B82F6', Medium: '#F59E0B', Growing: '#A855F7' };

export default function CompareCareerPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [careers, setCareers] = useState([]);
  const [career1, setCareer1] = useState(null);
  const [career2, setCareer2] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await api.get('/careers');
        setCareers(res.data.careers);
        // Pre-select if slug in query
        const preSlug = searchParams.get('career1');
        if (preSlug) {
          const found = res.data.careers.find(c => c.slug === preSlug);
          if (found) setCareer1(found);
        }
      } catch (e) { setError('Failed to load careers list.'); }
      finally { setListLoading(false); }
    };
    fetchCareers();
  }, []);

  const handleCompare = async () => {
    if (!career1 || !career2) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/careers/compare?career1=${career1.slug}&career2=${career2.slug}`);
      setComparison(res.data.comparison);
    } catch (e) {
      setError('Failed to compare careers.');
    } finally {
      setLoading(false);
    }
  };

  const CompareCard = ({ career, highlight }) => (
    <Card sx={{ height: '100%', background: highlight ? 'rgba(108,99,255,0.08)' : 'rgba(17,24,39,0.9)', border: `1px solid ${highlight ? 'rgba(108,99,255,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, pb: 2, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Typography sx={{ fontSize: '2rem' }}>{career.icon}</Typography>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>{career.name}</Typography>
            <Chip label={career.category} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: 'text.secondary', mt: 0.5, fontSize: 10 }} />
          </Box>
        </Box>

        {/* Salary */}
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Salary (India)</Typography>
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#00D4AA', mt: 0.3 }}>
            ₹{(career.salaryRange?.min / 100000).toFixed(0)}L – {(career.salaryRange?.max / 100000).toFixed(0)}L
          </Typography>
        </Box>

        {/* Difficulty */}
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Difficulty</Typography>
          <Box sx={{ mt: 0.8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Chip label={career.difficultyLevel} size="small" sx={{ bgcolor: `${DIFF_COLORS[career.difficultyLevel]}20`, color: DIFF_COLORS[career.difficultyLevel], fontWeight: 700 }} />
              <Typography variant="caption" sx={{ color: DIFF_COLORS[career.difficultyLevel], fontWeight: 700 }}>{DIFF_ORDER[career.difficultyLevel]}/4</Typography>
            </Box>
            <LinearProgress variant="determinate" value={(DIFF_ORDER[career.difficultyLevel] / 4) * 100}
              sx={{ height: 6, borderRadius: 10, bgcolor: 'rgba(255,255,255,0.06)', '& .MuiLinearProgress-bar': { bgcolor: DIFF_COLORS[career.difficultyLevel] } }} />
          </Box>
        </Box>

        {/* Demand */}
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Industry Demand</Typography>
          <Box sx={{ mt: 0.8 }}>
            <Chip label={career.industryDemand} size="small" sx={{ bgcolor: `${DEMAND_COLORS[career.industryDemand]}20`, color: DEMAND_COLORS[career.industryDemand], fontWeight: 700 }} />
          </Box>
        </Box>

        {/* Prep Time */}
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Preparation Time</Typography>
          <Typography variant="body1" sx={{ fontWeight: 700, color: '#F59E0B', mt: 0.3 }}>⏱️ {career.preparationTime}</Typography>
        </Box>

        {/* Skills */}
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Key Skills</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mt: 1 }}>
            {career.requiredSkills?.slice(0, 6).map(({ skill }) => (
              <Chip key={skill} label={skill} size="small" sx={{ bgcolor: 'rgba(108,99,255,0.1)', color: '#9C94FF', fontSize: 10 }} />
            ))}
          </Box>
        </Box>

        {/* Job Roles */}
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Top Roles</Typography>
          {career.jobRoles?.slice(0, 3).map(role => (
            <Typography key={role} variant="body2" color="text.secondary" sx={{ mt: 0.5, '&:before': { content: '"→ "', color: 'primary.main' } }}>{role}</Typography>
          ))}
        </Box>

        <Button fullWidth variant="contained" onClick={() => navigate(`/career/${career.slug}`)} endIcon={<ArrowForward />} sx={{ mt: 3, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)' }}>
          Full Details
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>
            Compare <Box component="span" sx={{ color: 'primary.main' }}>Career Paths</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
            Select two tech careers and compare them side-by-side on salary, difficulty, skills, and more.
          </Typography>
        </Box>

        {/* Selector */}
        <Card sx={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)', mb: 4, p: 1 }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={5}>
                <Autocomplete options={careers} getOptionLabel={o => o.name} value={career1} onChange={(_, v) => setCareer1(v)} loading={listLoading}
                  renderInput={params => <TextField {...params} label="First Career" />}
                  renderOption={(props, option) => <Box component="li" {...props}><Typography sx={{ mr: 1 }}>{option.icon}</Typography>{option.name}</Box>} />
              </Grid>
              <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
                <CompareArrows sx={{ fontSize: 36, color: 'primary.main' }} />
              </Grid>
              <Grid item xs={12} md={5}>
                <Autocomplete options={careers.filter(c => c.slug !== career1?.slug)} getOptionLabel={o => o.name} value={career2} onChange={(_, v) => setCareer2(v)} loading={listLoading}
                  renderInput={params => <TextField {...params} label="Second Career" />}
                  renderOption={(props, option) => <Box component="li" {...props}><Typography sx={{ mr: 1 }}>{option.icon}</Typography>{option.name}</Box>} />
              </Grid>
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button variant="contained" onClick={handleCompare} disabled={!career1 || !career2 || loading} size="large" startIcon={loading ? <CircularProgress size={18} /> : <CompareArrows />}
                sx={{ px: 5, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)' }}>
                {loading ? 'Comparing...' : 'Compare Now'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {/* Results */}
        {comparison && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CompareCard career={comparison.career1} highlight={true} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CompareCard career={comparison.career2} highlight={false} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}