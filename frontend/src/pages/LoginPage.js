import React, { useState } from 'react';
import { Box, Container, Card, CardContent, Typography, TextField, Button, Alert, Link, InputAdornment, IconButton, Divider } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff, AutoAwesome } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', display: 'flex', alignItems: 'center', py: 6, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: '20%', left: '30%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <Container maxWidth="sm">
        <Card sx={{ background: 'rgba(17,24,39,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 4 }}>
              <Box sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', borderRadius: '10px', p: 1, display: 'flex' }}>
                <AutoAwesome sx={{ color: 'white', fontSize: 22 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                CareerAI
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, textAlign: 'center' }}>Welcome back</Typography>
            <Typography color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>Sign in to access your career dashboard</Typography>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField fullWidth label="Email Address" type="email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required sx={{ mb: 2.5 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: 'text.secondary', fontSize: 20 }} /></InputAdornment> }} />

              <TextField fullWidth label="Password" type={showPass ? 'text' : 'password'} value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} required sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'text.secondary', fontSize: 20 }} /></InputAdornment>,
                  endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPass(!showPass)} edge="end" size="small">{showPass ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>
                }} />

              <Button fullWidth variant="contained" type="submit" disabled={loading} size="large"
                sx={{ py: 1.5, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', fontSize: '1rem', mb: 3, '&:disabled': { opacity: 0.7 } }}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Box>

            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.08)' }}>
              <Typography variant="caption" color="text.secondary">OR</Typography>
            </Divider>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography color="text.secondary" variant="body2">
                Don't have an account?{' '}
                <Link component="button" onClick={() => navigate('/register')} sx={{ color: 'primary.light', fontWeight: 600, cursor: 'pointer' }}>
                  Create one free
                </Link>
              </Typography>
            </Box>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link component="button" onClick={() => navigate('/quiz')} sx={{ color: 'secondary.main', fontSize: '0.85rem', cursor: 'pointer' }}>
                Take the quiz without an account →
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
