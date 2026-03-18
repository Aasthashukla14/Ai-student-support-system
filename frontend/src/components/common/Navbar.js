import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Avatar, Chip, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, AutoAwesome, Dashboard, Explore, Quiz, CompareArrows, Logout } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Take Quiz', path: '/quiz', icon: <Quiz sx={{ fontSize: 16 }} /> },
  { label: 'Explore Careers', path: '/explore', icon: <Explore sx={{ fontSize: 16 }} /> },
  { label: 'Compare', path: '/compare', icon: <CompareArrows sx={{ fontSize: 16 }} /> },
];

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Toolbar sx={{ maxWidth: 1280, mx: 'auto', width: '100%', px: { xs: 2, md: 3 } }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', flexGrow: isMobile ? 1 : 0, mr: { md: 4 } }} onClick={() => navigate('/')}>
            <Box sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', borderRadius: '10px', p: 0.8, display: 'flex' }}>
              <AutoAwesome sx={{ color: 'white', fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              CareerAI
            </Typography>
            <Chip label="Beta" size="small" sx={{ height: 18, fontSize: 10, background: 'rgba(108,99,255,0.2)', color: '#6C63FF', border: '1px solid rgba(108,99,255,0.3)' }} />
          </Box>

          {/* Desktop nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexGrow: 1 }}>
              {navLinks.map(link => (
                <Button key={link.path} onClick={() => navigate(link.path)} startIcon={link.icon}
                  sx={{ color: isActive(link.path) ? 'primary.main' : 'text.secondary', bgcolor: isActive(link.path) ? 'rgba(108,99,255,0.1)' : 'transparent', '&:hover': { color: 'text.primary', bgcolor: 'rgba(255,255,255,0.05)' }, borderRadius: 2, px: 2 }}>
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Auth buttons */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isAuthenticated ? (
                <>
                  <Button startIcon={<Dashboard />} onClick={() => navigate('/dashboard')} variant={isActive('/dashboard') ? 'contained' : 'text'}
                    sx={{ color: isActive('/dashboard') ? 'white' : 'text.secondary' }}>
                    Dashboard
                  </Button>
                  <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 14, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <IconButton onClick={handleLogout} size="small" sx={{ color: 'text.secondary' }}>
                    <Logout fontSize="small" />
                  </IconButton>
                </>
              ) : (
                <>
                  <Button onClick={() => navigate('/login')} sx={{ color: 'text.secondary' }}>Sign In</Button>
                  <Button onClick={() => navigate('/register')} variant="contained" sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', '&:hover': { background: 'linear-gradient(135deg, #4B43CC, #00A880)' } }}>
                    Get Started
                  </Button>
                </>
              )}
            </Box>
          )}

          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'text.primary' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, bgcolor: '#111827', pt: 2 } }}>
        <List>
          {navLinks.map(link => (
            <ListItem key={link.path} button onClick={() => { navigate(link.path); setDrawerOpen(false); }}
              sx={{ borderRadius: 2, mx: 1, mb: 0.5, bgcolor: isActive(link.path) ? 'rgba(108,99,255,0.1)' : 'transparent' }}>
              <ListItemText primary={link.label} primaryTypographyProps={{ color: isActive(link.path) ? 'primary.main' : 'text.primary' }} />
            </ListItem>
          ))}
          {isAuthenticated ? (
            <>
              <ListItem button onClick={() => { navigate('/dashboard'); setDrawerOpen(false); }} sx={{ borderRadius: 2, mx: 1 }}>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button onClick={() => { handleLogout(); setDrawerOpen(false); }} sx={{ borderRadius: 2, mx: 1 }}>
                <ListItemText primary="Logout" primaryTypographyProps={{ color: 'error.main' }} />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={() => { navigate('/login'); setDrawerOpen(false); }} sx={{ borderRadius: 2, mx: 1 }}>
                <ListItemText primary="Sign In" />
              </ListItem>
              <ListItem button onClick={() => { navigate('/register'); setDrawerOpen(false); }} sx={{ borderRadius: 2, mx: 1 }}>
                <ListItemText primary="Get Started" primaryTypographyProps={{ color: 'primary.main' }} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}
