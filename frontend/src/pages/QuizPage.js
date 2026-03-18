import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, LinearProgress, Chip, CircularProgress, Alert, Radio, RadioGroup, FormControlLabel, Stepper, Step, StepLabel } from '@mui/material';
import { ArrowForward, ArrowBack, Quiz, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ANSWER_OPTIONS = [
  { label: 'Strongly Agree', value: 4, color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  { label: 'Agree', value: 3, color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  { label: 'Neutral', value: 2, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  { label: 'Disagree', value: 1, color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
];

const CATEGORY_LABELS = {
  programming: 'Programming', dataAnalysis: 'Data Analysis', aiMl: 'AI / Machine Learning',
  cloud: 'Cloud Computing', networking: 'Networking', cybersecurity: 'Cybersecurity',
  uiux: 'UI/UX Design', gameDev: 'Game Development', mobileDev: 'Mobile Development',
  problemSolving: 'Problem Solving', mathematics: 'Mathematics', logicalThinking: 'Logical Thinking'
};

const CATEGORY_COLORS = {
  programming: '#6C63FF', dataAnalysis: '#3B82F6', aiMl: '#EC4899',
  cloud: '#38BDF8', networking: '#0891B2', cybersecurity: '#EF4444',
  uiux: '#F97316', gameDev: '#A855F7', mobileDev: '#14B8A6',
  problemSolving: '#10B981', mathematics: '#F59E0B', logicalThinking: '#84CC16'
};

export default function QuizPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get('/quiz/questions');
        setQuestions(res.data.questions);
      } catch (err) {
        // Use fallback local questions if API fails
        setError('Could not load questions from server. Using offline mode.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentIdx];
  const progress = questions.length > 0 ? ((Object.keys(answers).length) / questions.length) * 100 : 0;
  const isAnswered = currentQuestion && answers[currentQuestion._id] !== undefined;
  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: parseInt(value) }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
  };

  const handleBack = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const handleSubmit = async () => {
    if (!allAnswered) { setError('Please answer all questions before submitting.'); return; }
    setSubmitting(true);
    setError('');
    try {
      const responses = questions.map(q => ({
        questionId: q._id,
        questionText: q.question,
        category: q.category,
        answer: answers[q._id],
        weight: q.weight || 1
      }));
      const res = await api.post('/quiz/submit', { responses });
      // Store results in sessionStorage to pass to recommendations page
sessionStorage.setItem('quizResults', JSON.stringify(res.data));
localStorage.setItem('quizResults', JSON.stringify(res.data));      navigate('/recommendations');
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress sx={{ color: 'primary.main' }} />
    </Box>
  );

  if (!quizStarted) return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', display: 'flex', alignItems: 'center', py: 8 }}>
      <Container maxWidth="md">
        <Card sx={{ background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.08)', p: 2 }}>
          <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
            <Box sx={{ width: 80, height: 80, borderRadius: '20px', background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
              <Quiz sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Career Interest Quiz</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', mb: 4, fontSize: '1.05rem', lineHeight: 1.7 }}>
              Answer {questions.length} questions about your interests and strengths. Our AI will analyze your responses and recommend the best tech career paths for you.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center', mb: 4 }}>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <Chip key={key} label={label} size="small"
                  sx={{ bgcolor: `${CATEGORY_COLORS[key]}15`, color: CATEGORY_COLORS[key], border: `1px solid ${CATEGORY_COLORS[key]}30`, fontWeight: 500 }} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mb: 4 }}>
              {[{v:'📝', l: `${questions.length} Questions`}, {v:'⏱️', l:'10-15 minutes'}, {v:'🎯', l:'Top 5 Careers'}].map(i => (
                <Box key={i.l} sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{i.v}</Typography>
                  <Typography variant="caption" color="text.secondary">{i.l}</Typography>
                </Box>
              ))}
            </Box>
            {error && <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
            <Button variant="contained" size="large" onClick={() => setQuizStarted(true)} endIcon={<ArrowForward />} disabled={questions.length === 0}
              sx={{ px: 6, py: 1.5, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', fontSize: '1rem' }}>
              {questions.length === 0 ? 'Loading questions...' : 'Start Quiz'}
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A0E1A', py: 6 }}>
      <Container maxWidth="md">
        {/* Progress header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
              Question {currentIdx + 1} of {questions.length}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {Math.round(progress)}% Complete
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress}
            sx={{ height: 8, borderRadius: 10, bgcolor: 'rgba(255,255,255,0.06)', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #6C63FF, #00D4AA)', borderRadius: 10 } }} />
          {/* Answered dots */}
          <Box sx={{ display: 'flex', gap: 0.5, mt: 1.5, flexWrap: 'wrap' }}>
            {questions.map((q, i) => (
              <Box key={i} onClick={() => setCurrentIdx(i)} sx={{
                width: 8, height: 8, borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s',
                bgcolor: i === currentIdx ? 'primary.main' : answers[q._id] !== undefined ? '#00D4AA' : 'rgba(255,255,255,0.15)',
                transform: i === currentIdx ? 'scale(1.4)' : 'scale(1)'
              }} />
            ))}
          </Box>
        </Box>

        {/* Question Card */}
        {currentQuestion && (
          <Card sx={{ background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.08)', mb: 3 }}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              {/* Category badge */}
              <Chip label={CATEGORY_LABELS[currentQuestion.category] || currentQuestion.category} size="small"
                sx={{ mb: 3, bgcolor: `${CATEGORY_COLORS[currentQuestion.category] || '#6C63FF'}20`, color: CATEGORY_COLORS[currentQuestion.category] || '#6C63FF', border: `1px solid ${CATEGORY_COLORS[currentQuestion.category] || '#6C63FF'}40`, fontWeight: 600 }} />

              <Typography variant="h5" sx={{ fontWeight: 700, mb: 5, lineHeight: 1.5 }}>
                {currentQuestion.question}
              </Typography>

              <RadioGroup value={answers[currentQuestion._id] ?? ''} onChange={e => handleAnswer(currentQuestion._id, e.target.value)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {ANSWER_OPTIONS.map(opt => {
                    const isSelected = answers[currentQuestion._id] === opt.value;
                    return (
                      <Box key={opt.value} onClick={() => handleAnswer(currentQuestion._id, opt.value)}
                        sx={{ p: 2.5, borderRadius: 3, border: `2px solid ${isSelected ? opt.color : 'rgba(255,255,255,0.08)'}`, bgcolor: isSelected ? opt.bg : 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 2, '&:hover': { borderColor: opt.color, bgcolor: opt.bg } }}>
                        <Radio value={opt.value} sx={{ p: 0, color: opt.color, '&.Mui-checked': { color: opt.color } }} checked={isSelected} />
                        <Typography sx={{ fontWeight: isSelected ? 700 : 500, color: isSelected ? opt.color : 'text.primary', flex: 1 }}>
                          {opt.label}
                        </Typography>
                        {isSelected && <CheckCircle sx={{ color: opt.color, fontSize: 20 }} />}
                      </Box>
                    );
                  })}
                </Box>
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="outlined" onClick={handleBack} disabled={currentIdx === 0} startIcon={<ArrowBack />}
            sx={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            Previous
          </Button>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              {Object.keys(answers).length}/{questions.length} answered
            </Typography>
          </Box>

          {currentIdx < questions.length - 1 ? (
            <Button variant="contained" onClick={handleNext} endIcon={<ArrowForward />}
              sx={{ background: isAnswered ? 'linear-gradient(135deg, #6C63FF, #00D4AA)' : undefined }}>
              Next
            </Button>
          ) : (
            <Button variant="contained" onClick={handleSubmit} disabled={!allAnswered || submitting}
              endIcon={submitting ? <CircularProgress size={16} /> : <CheckCircle />}
              sx={{ background: allAnswered ? 'linear-gradient(135deg, #6C63FF, #00D4AA)' : undefined, px: 3 }}>
              {submitting ? 'Analyzing...' : 'Get My Results'}
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}
