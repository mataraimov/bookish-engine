import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetR } from '../../app/tempApi.js';

const ForgotPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const response = await sendPasswordResetR(email);
      if (response.status === 200 || response.status === 201) {
        setMessage('Ссылка для восстановления пароля отправлена на вашу почту.');
        setTimeout(() => navigate('/'), 3000);
      } else {
        setError(response.message || 'Ошибка при отправке запроса.');
      }
    } catch (err) {
      setError('Нет ответа от сервера.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, backgroundColor: '#FFF8DC' }}>
        {!message ? (
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h5" align="center" sx={{ mb: 2, color: '#8B4513', fontFamily: 'serif' }}>
              Восстановление пароля
            </Typography>
            <TextField
              fullWidth
              label="Введите ваш email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ backgroundColor: '#B22222' }}>
              {loading ? 'Отправка...' : 'Отправить'}
            </Button>
          </Box>
        ) : (
          <Typography variant="h6" align="center" sx={{ color: '#8B4513' }}>
            {message}
          </Typography>
        )}
        {error && (
          <Typography variant="body2" align="center" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPage;
