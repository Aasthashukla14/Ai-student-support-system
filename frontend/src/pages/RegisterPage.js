import React, { useState } from 'react';
import { Box, Container, Card, CardContent, Typography, TextField, Button, Alert, Link, Grid, MenuItem, Chip, InputAdornment, IconButton } from '@mui/material';
import { Person, Email, Lock, Visibility, VisibilityOff, AutoAwesome, Add, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DEPARTMENTS = ['Computer Science (CS)', 'Information Technology (IT)', 'Computer Engineering'];
const COMMON_SKILLS = ['Python', 'JavaScript', 'Java', 'C++', 'HTML/CSS', 'SQL', 'React', 'Node.js', 'Git', 'Linux'];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '', semester: '', skills: [], interests: [] });
  const [showPass, setShowPass] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addSkill = (skill) => {
    if (skill && !form.skills.includes(skill)) {
      setForm({ ...form, skills: [...form.skills, skill] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => setForm({ ...form, skills: form.skills.filter(s => s !== skill) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', py: 6, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: '10%', right: '20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <Container maxWidth="sm">
        <Card sx={{ background: 'rgba(17,24,39,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 4 }}>
              <Box sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', borderRadius: '10px', p: 1 }}>
                <AutoAwesome sx={{ color: 'white', fontSize: 22 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                CareerAI
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, textAlign: 'center' }}>Create Account</Typography>
            <Typography color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>Start your personalized career journey</Typography>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                    InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: 'text.secondary', fontSize: 20 }} /></InputAdornment> }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                    InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: 'text.secondary', fontSize: 20 }} /></InputAdornment> }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Password (min 6 chars)" type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'text.secondary', fontSize: 20 }} /></InputAdornment>,
                      endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPass(!showPass)} size="small">{showPass ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>
                    }} />
                </Grid>
                <Grid item xs={8}>
                  <TextField fullWidth select label="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
                    {DEPARTMENTS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth select label="Semester" value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })}>
                    {[1,2,3,4,5,6,7,8].map(s => <MenuItem key={s} value={s}>Sem {s}</MenuItem>)}
                  </TextField>
                </Grid>

                {/* Skills */}
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>Your Current Skills (optional)</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                    <TextField size="small" placeholder="Add a skill..." value={skillInput} onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(skillInput); } }}
                      sx={{ flex: 1 }} />
                    <Button variant="outlined" onClick={() => addSkill(skillInput)} sx={{ minWidth: 44, px: 1 }}><Add /></Button>
                  </Box>
                  {/* Quick add common skills */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 1.5 }}>
                    {COMMON_SKILLS.filter(s => !form.skills.includes(s)).slice(0, 6).map(s => (
                      <Chip key={s} label={`+ ${s}`} size="small" onClick={() => addSkill(s)} sx={{ cursor: 'pointer', bgcolor: 'rgba(108,99,255,0.1)', color: '#9C94FF', border: '1px solid rgba(108,99,255,0.2)', fontSize: 11 }} />
                    ))}
                  </Box>
                  {form.skills.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                      {form.skills.map(skill => (
                        <Chip key={skill} label={skill} size="small" onDelete={() => removeSkill(skill)}
                          deleteIcon={<Close sx={{ fontSize: '14px !important' }} />}
                          sx={{ bgcolor: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)' }} />
                      ))}
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button fullWidth variant="contained" type="submit" disabled={loading} size="large"
                    sx={{ py: 1.5, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', fontSize: '1rem' }}>
                    {loading ? 'Creating account...' : 'Create My Account'}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography color="text.secondary" variant="body2">
                Already have an account?{' '}
                <Link component="button" onClick={() => navigate('/login')} sx={{ color: 'primary.light', fontWeight: 600, cursor: 'pointer' }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
