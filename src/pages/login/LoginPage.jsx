import React, { useState, useContext } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getUserR, loginUserR } from '../../app/tempApi.js';
import { UserContext } from '../../App.jsx';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const validateUsername = (username) => {
    return /^[A-Za-zА-Яа-яЁё0-9]{1,20}$/.test(username);
  };

  const validatePassword = (password) => {
    return /^[A-Za-z\d!?*()]{8,20}$/.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    let errorMsg = '';
    if (name === 'username' && !validateUsername(value)) {
      errorMsg = 'Неверный формат имени пользователя';
    }
    if (name === 'password' && !validatePassword(value)) {
      errorMsg = 'Неверный формат пароля';
    }
    setError(errorMsg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await loginUserR(formData);
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('access_token', response.data.token);
        const token = localStorage.getItem('access_token');
        const userResponse = await getUserR(token);
        setUser(userResponse.data);
        navigate('/confirm-mail');
      } else {
        setError(response.message || 'Ошибка входа!');
      }
    } catch (err) {
      setError(err || 'Ошибка сервера! Попробуйте позже.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, backgroundColor: '#FFF8DC' }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, color: '#8B4513', fontFamily: 'serif' }}>
          Вход
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Имя пользователя"
            name="username"
            placeholder="Имя пользователя"
            value={formData.username}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Пароль"
            name="password"
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#B22222', mb: 2 }}>
            Войти
          </Button>
        </Box>
        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box display="flex" justifyContent="space-between">
          <MuiLink component={Link} to="/login/forgot-password" sx={{ textDecoration: 'none', color: '#8B4513' }}>
            Забыли пароль?
          </MuiLink>
          <MuiLink component={Link} to="/login/register" sx={{ textDecoration: 'none', color: '#8B4513' }}>
            Еще нет аккаунта?
          </MuiLink>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
