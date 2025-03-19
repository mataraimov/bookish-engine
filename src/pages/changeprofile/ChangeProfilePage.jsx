import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, Typography, TextField, 
  Button, Grid, Link as MuiLink 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useCheckUser } from '../../hooks/useCheckUser.js';
import { updateUserProfileR } from '../../app/tempApi.js';

const ChangeProfilePage = ({ user }) => {
  const [formData, setFormData] = useState({
    username: '',
    photo: null,
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useCheckUser();

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || 'exampleUserName',
        photo: user.photo || 'examplePhoto',
        phone: user.phone || '+996999999999',
        password: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await updateUserProfileR(token, formData);
      if (response.status === 200 || response.status === 201) {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'Ошибка обновления профиля');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: '#FFF8DC' }}>
        <Typography variant="h5" sx={{ mb: 3, fontFamily: 'serif', color: '#8B4513' }}>
          Изменение профиля
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Имя пользователя"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth sx={{ backgroundColor: '#8B4513' }}>
                Загрузить фото профиля
                <input type="file" hidden accept="image/*" name="photo" onChange={handleChange} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Номер телефона"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Пароль (для подтверждения)"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#B22222' }}>
                Сохранить изменения
              </Button>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error">{error}</Typography>
              </Grid>
            )}
          </Grid>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Забыли пароль? <MuiLink component={Link} to="/login/forgot-password">Восстановить</MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ChangeProfilePage;
