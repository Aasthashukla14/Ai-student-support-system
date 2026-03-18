import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip, LinearProgress, Avatar, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, Autocomplete } from '@mui/material';
import { School, TrendingUp, Code, Quiz, ArrowForward, Edit, EmojiEvents, Close, Save } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const CAREER_ICONS = { 'Data Analyst':'📊','Data Scientist':'🔬','Machine Learning Engineer':'🤖','AI Engineer':'🧠','Data Engineer':'⚙️','Software Engineer':'💻','Full Stack Developer':'🌐','Frontend Developer':'🎨','Backend Developer':'⚡','Mobile App Developer':'📱','Game Developer':'🎮','Cloud Engineer':'☁️','DevOps Engineer':'🔄','Cybersecurity Analyst':'🛡️','Ethical Hacker':'🔓','UI Designer':'🖌️','UX Designer':'🧩','default':'💼' };

const DEPARTMENTS = ['Computer Science (CS)', 'Information Technology (IT)', 'Computer Engineering'];

const ALL_SKILLS = [
  'Python', 'JavaScript', 'Java', 'C#/C++', 'HTML/CSS', 'HTML5', 'CSS3', 'TypeScript',
  'React.js', 'Node.js', 'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Git',
  'Linux', 'Linux Administration', 'Windows Server', 'Bash Scripting', 'Shell Scripting',
  'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'CI/CD (Jenkins/GitHub Actions)',
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision',
  'MLOps', 'LLMs/GenAI', 'Data Analysis', 'Data Visualization', 'Statistics', 'Pandas', 'NumPy',
  'Tableau/Power BI', 'Excel', 'ETL Pipelines', 'Apache Spark', 'Kafka', 'Hadoop', 'Data Warehousing',
  'REST APIs', 'API Integration', 'System Design', 'Algorithms', 'Data Structures',
  'Object-Oriented Programming', 'Problem Solving', 'AWS/Azure/GCP', 'Cloud Platforms',
  'Infrastructure as Code', 'Monitoring & Observability',
  'Networking', 'Network Security', 'Cybersecurity', 'Penetration Testing',
  'SIEM Tools', 'Incident Response', 'Cryptography', 'Secure Coding Practices',
  'Vulnerability Assessment', 'Security Architecture',
  'Figma', 'Adobe XD', 'UI/UX Principles', 'Responsive Design', 'Prototyping',
  'User Research', 'Wireframing', 'Information Architecture', 'Usability Testing', 'Design Systems',
  'Agile/Scrum', 'Project Management', 'Communication', 'Stakeholder Management',
  'Requirements Gathering', 'Business Analysis',
  'Solidity', 'Smart Contracts', 'Web3.js/Ethers.js',
  'Unity/Unreal Engine', 'Game Design', '3D Modeling', 'OpenXR/ARKit/ARCore', 'Spatial Computing',
  'React Native/Flutter', 'App Store Deployment', 'Mobile Development',
  'Embedded C/C++', 'Arduino/Raspberry Pi', 'ROS (Robot Operating System)',
  'Database Design', 'Performance Tuning', 'Virtualization', 'Troubleshooting',
  'Selenium/Playwright', 'Manual Testing', 'Performance Testing', 'API Testing (Postman)',
  'Agile/Scrum', 'TypeScript', 'GraphQL', 'Microservices', 'Serverless'
].filter((v, i, a) => a.indexOf(v) === i).sort();

const ALL_INTERESTS = [
  'Web Development', 'Frontend Development', 'Backend Development', 'Full Stack Development',
  'Data Science', 'Data Analysis', 'Data Engineering', 'Big Data',
  'Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Natural Language Processing',
  'Computer Vision', 'Generative AI',
  'Cybersecurity', 'Ethical Hacking', 'Network Security', 'Cloud Security',
  'Cloud Computing', 'DevOps', 'Site Reliability Engineering', 'Infrastructure',
  'Mobile App Development', 'Android Development', 'iOS Development',
  'Game Development', 'AR/VR Development',
  'UI Design', 'UX Design', 'Product Design', 'Graphic Design',
  'Blockchain', 'Web3', 'Cryptocurrency', 'DeFi',
  'IoT', 'Embedded Systems', 'Robotics',
  'Networking', 'System Administration', 'Database Administration',
  'Product Management', 'Business Analysis', 'Technical Consulting',
  'Open Source', 'Competitive Programming', 'System Design',
  'Automation Testing', 'QA Engineering'
].sort();

function ProfileEditModal({ open, onClose, user, onSave }) {
  const [form, setForm] = useState({ name: '', department: '', semester: 1, skills: [], interests: [] });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && open) {
      setForm({ name: user.name || '', department: user.department || '', semester: user.semester || 1, skills: [...(user.skills || [])], interests: [...(user.interests || [])] });
      setError('');
    }
  }, [user, open]);

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Name is required'); return; }
    setSaving(true); setError('');
    try {
      const res = await api.put('/auth/profile', form);
      onSave(res.data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally { setSaving(false); }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{ sx: { bgcolor: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3 } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>✏️ Edit Profile</Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}><Close /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
        <Grid container spacing={2.5}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField fullWidth label="Full Name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          </Grid>

          {/* Department */}
          <Grid item xs={8}>
            <TextField fullWidth select label="Department" value={form.department}
              onChange={e => setForm({ ...form, department: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
              {DEPARTMENTS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </TextField>
          </Grid>

          {/* Semester */}
          <Grid item xs={4}>
            <TextField fullWidth select label="Semester" value={form.semester}
              onChange={e => setForm({ ...form, semester: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
              {[1,2,3,4,5,6,7,8].map(s => <MenuItem key={s} value={s}>Sem {s}</MenuItem>)}
            </TextField>
          </Grid>

          {/* Skills - Autocomplete multiselect */}
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={ALL_SKILLS}
              value={form.skills}
              onChange={(_, newValue) => setForm({ ...form, skills: newValue })}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Skills" placeholder="Search and select skills..."
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} size="small" {...getTagProps({ index })}
                    sx={{ bgcolor: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)', '& .MuiChip-deleteIcon': { color: '#00D4AA' } }} />
                ))
              }
              sx={{ '& .MuiAutocomplete-tag': { maxWidth: 150 } }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Type to search from {ALL_SKILLS.length} available skills
            </Typography>
          </Grid>

          {/* Interests - Autocomplete multiselect */}
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={ALL_INTERESTS}
              value={form.interests}
              onChange={(_, newValue) => setForm({ ...form, interests: newValue })}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Interests" placeholder="Search and select interests..."
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} size="small" {...getTagProps({ index })}
                    sx={{ bgcolor: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)', '& .MuiChip-deleteIcon': { color: '#F59E0B' } }} />
                ))
              }
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Type to search from {ALL_INTERESTS.length} available interests
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1.5, gap: 1 }}>
        <Button onClick={onClose} sx={{ color: 'text.secondary', borderRadius: 2 }}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={saving} startIcon={<Save />}
          sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', borderRadius: 2, px: 3 }}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function DashboardPage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/dashboard');
        setDashboard(res.data);
      } catch (e) { setError('Failed to load dashboard.'); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleProfileSave = (updatedUser) => {
    updateUser(updatedUser);
    setDashboard(prev => prev ? { ...prev, user: updatedUser } : prev);
  };

  if (loading) return <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', p: 4 }}><Alert severity="error">{error}</Alert></Box>;

  const { latestQuiz, totalRoadmapsStarted } = dashboard || {};
  const recommendations = latestQuiz?.recommendations || [];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', py: 5 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 1 }}>
            <Avatar sx={{ width: 56, height: 56, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', fontSize: '1.4rem', fontWeight: 800 }}>
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.2 }}>Welcome back, {user?.name?.split(' ')[0]}! 👋</Typography>
              <Typography color="text.secondary">{user?.department} • Semester {user?.semester}</Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { icon: '🎯', label: 'Quiz Completed', value: user?.quizCompleted ? 'Yes' : 'Pending', color: user?.quizCompleted ? '#10B981' : '#F59E0B', action: !user?.quizCompleted ? () => navigate('/quiz') : null, actionLabel: 'Take Quiz' },
            { icon: '🗺️', label: 'Roadmaps Started', value: totalRoadmapsStarted || 0, color: '#6C63FF' },
            { icon: '💪', label: 'Skills Added', value: user?.skills?.length || 0, color: '#3B82F6' },
            { icon: '🏆', label: 'Career Selected', value: user?.selectedCareer || 'None', color: '#F59E0B', truncate: true }
          ].map(stat => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <Card sx={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)', height: '100%' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontSize: '1.8rem', mb: 1 }}>{stat.icon}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: stat.color, mt: 0.5, overflow: stat.truncate ? 'hidden' : 'visible', textOverflow: 'ellipsis', whiteSpace: stat.truncate ? 'nowrap' : 'normal', fontSize: stat.truncate && user?.selectedCareer ? '1rem' : undefined }}>
                    {stat.value}
                  </Typography>
                  {stat.action && <Button size="small" onClick={stat.action} sx={{ mt: 1, color: stat.color, p: 0 }} endIcon={<ArrowForward sx={{ fontSize: 14 }} />}>{stat.actionLabel}</Button>}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            {recommendations.length > 0 ? (
              <Card sx={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)', mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>🎯 Your Top Career Matches</Typography>
                    <Button size="small" onClick={() => navigate('/quiz')} startIcon={<Quiz />} sx={{ color: 'text.secondary', fontSize: 12 }}>Retake</Button>
                  </Box>
                  {recommendations.slice(0, 5).map((rec, i) => (
                    <Box key={rec.career} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: i === 0 ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                        {CAREER_ICONS[rec.career] || CAREER_ICONS.default}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{rec.career}</Typography>
                          {i === 0 && <Chip label="Top Match" size="small" sx={{ height: 18, fontSize: 10, bgcolor: 'rgba(108,99,255,0.2)', color: '#9C94FF' }} />}
                        </Box>
                        <LinearProgress variant="determinate" value={rec.score || 0}
                          sx={{ height: 6, borderRadius: 10, bgcolor: 'rgba(255,255,255,0.06)', '& .MuiLinearProgress-bar': { bgcolor: i === 0 ? '#6C63FF' : '#3B82F6', borderRadius: 10 } }} />
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: i === 0 ? '#6C63FF' : 'text.secondary', minWidth: 40, textAlign: 'right' }}>
                        {Math.round(rec.score || 0)}%
                      </Typography>
                      <Button size="small" variant="outlined" onClick={() => navigate(`/roadmap/${rec.career.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`)}
                        sx={{ borderColor: 'rgba(255,255,255,0.1)', fontSize: 11, px: 1.5, py: 0.3, flexShrink: 0 }}>Roadmap</Button>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card sx={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.25)', mb: 3, textAlign: 'center', py: 2 }}>
                <CardContent>
                  <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>🎯</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Discover Your Career Path</Typography>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>Take our AI quiz to get personalized career recommendations.</Typography>
                  <Button variant="contained" onClick={() => navigate('/quiz')} endIcon={<ArrowForward />} sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D4AA)' }}>Take Career Quiz</Button>
                </CardContent>
              </Card>
            )}

            {user?.roadmapProgress?.length > 0 && (
              <Card sx={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)', mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>📚 Active Learning Roadmaps</Typography>
                  {user.roadmapProgress.map(prog => {
                    const slug = prog.careerField;
                    const pct = prog.completedSteps?.length ? Math.min(Math.round((prog.completedSteps.length / 7) * 100), 100) : 0;
                    return (
                      <Box key={slug} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</Typography>
                          <Typography variant="caption" sx={{ color: '#00D4AA', fontWeight: 700 }}>{pct}%</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={pct}
                          sx={{ height: 8, borderRadius: 10, bgcolor: 'rgba(255,255,255,0.06)', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #6C63FF, #00D4AA)', borderRadius: 10 } }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">{prog.completedSteps?.length || 0} steps completed</Typography>
                          <Button size="small" onClick={() => navigate(`/roadmap/${slug}`)} sx={{ fontSize: 11, color: 'primary.main', p: 0, minWidth: 0 }} endIcon={<ArrowForward sx={{ fontSize: 12 }} />}>Continue</Button>
                        </Box>
                      </Box>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)', mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>👤 Profile</Typography>
                  <Button size="small" startIcon={<Edit sx={{ fontSize: 14 }} />} onClick={() => setEditModalOpen(true)}
                    variant="outlined" sx={{ fontSize: 11, borderColor: 'rgba(108,99,255,0.4)', color: '#9C94FF', borderRadius: 2, '&:hover': { bgcolor: 'rgba(108,99,255,0.1)' } }}>
                    Edit Profile
                  </Button>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Name</Typography>
                  <Typography variant="body2" sx={{ mt: 0.3, fontWeight: 600 }}>{user?.name}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Email</Typography>
                  <Typography variant="body2" sx={{ mt: 0.3 }}>{user?.email}</Typography>
                </Box>
                {user?.department && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Department</Typography>
                    <Typography variant="body2" sx={{ mt: 0.3 }}>{user?.department} • Semester {user?.semester}</Typography>
                  </Box>
                )}
                {user?.skills?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Skills ({user.skills.length})</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mt: 1 }}>
                      {user.skills.slice(0, 10).map(s => <Chip key={s} label={s} size="small" sx={{ bgcolor: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)', fontSize: 10 }} />)}
                      {user.skills.length > 10 && <Chip label={`+${user.skills.length - 10}`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: 'text.secondary', fontSize: 10 }} />}
                    </Box>
                  </Box>
                )}
                {user?.interests?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Interests ({user.interests.length})</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mt: 1 }}>
                      {user.interests.slice(0, 6).map(i => <Chip key={i} label={i} size="small" sx={{ bgcolor: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)', fontSize: 10 }} />)}
                      {user.interests.length > 6 && <Chip label={`+${user.interests.length - 6}`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: 'text.secondary', fontSize: 10 }} />}
                    </Box>
                  </Box>
                )}
                {(!user?.skills?.length && !user?.interests?.length) && (
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>Add your skills and interests to get better recommendations!</Typography>
                    <Button size="small" variant="outlined" onClick={() => setEditModalOpen(true)} startIcon={<Edit />} sx={{ borderColor: 'rgba(108,99,255,0.4)', color: '#9C94FF', borderRadius: 2 }}>Add Now</Button>
                  </Box>
                )}
              </CardContent>
            </Card>

            <Card sx={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.06)', mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>⚡ Quick Actions</Typography>
                {[
                  { icon: <Quiz />, label: 'Retake Career Quiz', path: '/quiz', color: '#6C63FF' },
                  { icon: <School />, label: 'Browse Roadmaps', path: '/explore', color: '#00D4AA' },
                  { icon: <TrendingUp />, label: 'Compare Careers', path: '/compare', color: '#F59E0B' },
                  { icon: <Code />, label: 'Find Projects', path: '/explore', color: '#3B82F6' },
                ].map(a => (
                  <Button key={a.label} fullWidth startIcon={React.cloneElement(a.icon, { sx: { color: a.color } })} onClick={() => navigate(a.path)}
                    sx={{ justifyContent: 'flex-start', color: 'text.secondary', py: 1.2, borderRadius: 2, mb: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.04)', color: 'text.primary' } }}>
                    {a.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card sx={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmojiEvents sx={{ color: '#F59E0B' }} /> Achievements
                </Typography>
                {[
                  { emoji: '🎯', label: 'Quiz Taker', done: user?.quizCompleted },
                  { emoji: '🗺️', label: 'Roadmap Starter', done: (user?.roadmapProgress?.length || 0) > 0 },
                  { emoji: '💪', label: 'Skill Builder', done: (user?.skills?.length || 0) >= 3 },
                  { emoji: '✏️', label: 'Profile Complete', done: !!(user?.department && user?.skills?.length > 0) },
                  { emoji: '🔍', label: 'Career Explorer', done: true },
                ].map(ach => (
                  <Box key={ach.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, opacity: ach.done ? 1 : 0.4 }}>
                    <Typography sx={{ fontSize: '1.2rem' }}>{ach.emoji}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{ach.label}</Typography>
                    {ach.done && <Chip label="Earned" size="small" sx={{ ml: 'auto', bgcolor: 'rgba(16,185,129,0.15)', color: '#10B981', height: 20, fontSize: 10 }} />}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <ProfileEditModal open={editModalOpen} onClose={() => setEditModalOpen(false)} user={user} onSave={handleProfileSave} />
    </Box>
  );
}