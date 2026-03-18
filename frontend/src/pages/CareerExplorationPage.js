import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea, Chip, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, CircularProgress, Alert, Button } from '@mui/material';
import { Search, ArrowForward, TrendingUp, School } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const DIFFICULTY_COLORS = { Beginner: '#10B981', Intermediate: '#3B82F6', Advanced: '#F59E0B', Expert: '#EF4444' };
const DEMAND_COLORS = { 'Very High': '#10B981', 'High': '#3B82F6', 'Medium': '#F59E0B', 'Growing': '#A855F7' };

export default function CareerExplorationPage() {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/careers?limit=100');
        setCareers(res.data.careers);
        setFiltered(res.data.careers);
      } catch (e) {
        setError('Failed to load careers.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    let result = [...careers];
    if (search) result = result.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.shortDescription?.toLowerCase().includes(search.toLowerCase()));
    if (categoryFilter !== 'All') result = result.filter(c => c.category === categoryFilter);
    if (difficultyFilter !== 'All') result = result.filter(c => c.difficultyLevel === difficultyFilter);
    setFiltered(result);
  }, [search, categoryFilter, difficultyFilter, careers]);

  const categories = ['All', ...new Set(careers.map(c => c.category).filter(Boolean))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  if (loading) return <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box>;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', py: 6 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>
            Explore <Box component="span" sx={{ color: 'primary.main' }}>Tech Careers</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', mb: 2, fontSize: '1.05rem' }}>
            Browse 39+ IT career paths with salary data, skill requirements, and learning roadmaps.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/quiz')} endIcon={<ArrowForward />}
            sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)' }}>
            Not sure? Take the Quiz
          </Button>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField placeholder="Search careers..." value={search} onChange={e => setSearch(e.target.value)} size="small"
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
            sx={{ flexGrow: 1, maxWidth: 400 }} />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Category</InputLabel>
            <Select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} label="Category">
              {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Difficulty</InputLabel>
            <Select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)} label="Difficulty">
              {difficulties.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </Select>
          </FormControl>
          <Typography variant="body2" color="text.secondary">{filtered.length} careers</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {/* Career Grid */}
        <Grid container spacing={3}>
          {filtered.map(career => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={career._id}>
              <Card sx={{ height: '100%', background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.25s', '&:hover': { transform: 'translateY(-6px)', borderColor: career.color || '#6C63FF', boxShadow: `0 20px 50px ${career.color || '#6C63FF'}20` } }}>
                <CardActionArea onClick={() => navigate(`/career/${career.slug}`)} sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Icon & Category */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ width: 50, height: 50, borderRadius: '14px', bgcolor: `${career.color || '#6C63FF'}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                        {career.icon || '💼'}
                      </Box>
                      <Chip label={career.category} size="small" sx={{ fontSize: 10, bgcolor: 'rgba(255,255,255,0.06)', color: 'text.secondary' }} />
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.3 }}>{career.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6, flex: 1 }}>{career.shortDescription}</Typography>

                    {/* Salary */}
                    <Typography variant="body2" sx={{ color: '#00D4AA', fontWeight: 700, mb: 2 }}>
                      💰 ₹{career.salaryRange?.min ? `${(career.salaryRange.min/100000).toFixed(1)}L` : 'N/A'} – ₹{career.salaryRange?.max ? `${(career.salaryRange.max/100000).toFixed(1)}L` : 'N/A'} / yr
                    </Typography>

                    {/* Tags */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {career.industryDemand === 'Very High' && (
                        <Chip label="🔥 High Demand" size="small"
                          sx={{ bgcolor: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', fontWeight: 700, fontSize: 10 }} />
                      )}
                      <Chip label={career.difficultyLevel} size="small"
                        sx={{ bgcolor: `${DIFFICULTY_COLORS[career.difficultyLevel]}15`, color: DIFFICULTY_COLORS[career.difficultyLevel], border: `1px solid ${DIFFICULTY_COLORS[career.difficultyLevel]}30`, fontWeight: 600, fontSize: 10 }} />
                      <Chip label={career.industryDemand} size="small" icon={<TrendingUp sx={{ fontSize: '12px !important', color: `${DEMAND_COLORS[career.industryDemand]} !important` }} />}
                        sx={{ bgcolor: `${DEMAND_COLORS[career.industryDemand]}15`, color: DEMAND_COLORS[career.industryDemand], border: `1px solid ${DEMAND_COLORS[career.industryDemand]}30`, fontSize: 10 }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filtered.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" color="text.secondary">No careers match your filters.</Typography>
            <Button onClick={() => { setSearch(''); setCategoryFilter('All'); setDifficultyFilter('All'); }} sx={{ mt: 2 }}>Clear Filters</Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}