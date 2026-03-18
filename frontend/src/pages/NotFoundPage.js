import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Home, Search, Quiz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontSize: '8rem', lineHeight: 1, mb: 2 }}>🔍</Typography>
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 1, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Page Not Found</Typography>
        <Typography color="text.secondary" sx={{ mb: 5, fontSize: '1.05rem' }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<Home />} onClick={() => navigate('/')}
            sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', px: 3, py: 1.2 }}>
            Go Home
          </Button>
          <Button variant="outlined" startIcon={<Quiz />} onClick={() => navigate('/quiz')}
            sx={{ borderColor: 'rgba(255,255,255,0.2)', px: 3, py: 1.2 }}>
            Take Quiz
          </Button>
          <Button variant="outlined" startIcon={<Search />} onClick={() => navigate('/explore')}
            sx={{ borderColor: 'rgba(255,255,255,0.2)', px: 3, py: 1.2 }}>
            Explore Careers
          </Button>
        </Box>
      </Container>
    </Box>
  );
}