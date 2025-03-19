import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserR } from '../../app/tempApi.js';
import countryPhoneCodes from '../../app/countryPhoneCodes.jsx';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneCode: '+996',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [selectedCode, setSelectedCode] = useState("+996");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e) => {
    const number = e.target.value;
    setFormData(prev => ({ ...prev, phoneNumber: number }));
    setPhoneError(validatePhoneNumber(selectedCode, number));
  };

  const validateUsername = (username) => {
    return /^[A-Za-zА-Яа-яЁё0-9]{1,20}$/.test(username);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhoneNumber = (selectedCode, phoneNumber) => {
    const country = countryPhoneCodes.find(c => c.code === selectedCode);
    if (!country) {
      return "Выберите страну";
    }
    const cleanedNumber = phoneNumber.replace(/\D/g, "");
    if (cleanedNumber.length !== country.length) {
      return `Номер должен содержать ${country.length} цифр`;
    }
    return "";
  };

  const validatePassword = (password) => {
    return /^[A-Za-z\d!?*()]{8,20}$/.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = '';
    if (name === 'username' && !validateUsername(value)) {
      error = 'Только латинские, кириллические буквы и цифры, без пробелов, до 20 символов';
    }
    if (name === 'email' && !validateEmail(value)) {
      error = 'Недействительный адрес электронной почты';
    }
    if (name === 'password' && !validatePassword(value)) {
      error = 'Пароль должен быть 8-20 символов, написан на латинском, может содержать спецсимволы (!?*())';
    }
    if (name === 'confirmPassword' && value !== formData.password) {
      error = 'Пароли не совпадают';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (Object.values(errors).some(err => err) || Object.values(formData).some(value => !value)) {
      setErrorMessage('Пожалуйста, исправьте ошибки в форме');
      return;
    }
    try {
      const response = await registerUserR(formData);
      if (response.status === 200 || response.status === 201) {
        navigate('/confirm-email');
      } else {
        setErrorMessage('Ошибка Сервера, Попробуйте Позже!');
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Ошибка Сервера, Попробуйте Позже!');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, backgroundColor: '#FFF8DC' }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, color: '#8B4513', fontFamily: 'serif' }}>
          Регистрация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Имя пользователя"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Код страны</InputLabel>
                <Select
                  value={selectedCode}
                  label="Код страны"
                  onChange={(e) => {
                    setSelectedCode(e.target.value);
                    setFormData(prev => ({ ...prev, phoneCode: e.target.value }));
                  }}
                >
                  {countryPhoneCodes.map(({ id, country, code }) => (
                    <MenuItem key={id} value={code}>
                      {country} ({code})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Номер телефона"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                required
                error={!!phoneError}
                helperText={phoneError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Пароль"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Подтвердите пароль"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#B22222' }}>
                Зарегистрироваться
              </Button>
            </Grid>
          </Grid>
        </Box>
        {errorMessage && (
          <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <MuiLink component={Link} to="/login/sign-in" sx={{ textDecoration: 'none', color: '#8B4513' }}>
            Уже Есть Аккаунт?
          </MuiLink>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
