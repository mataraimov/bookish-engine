import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const EmailPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, backgroundColor: '#FFF8DC' }}>
        <Typography variant="h5" align="center" sx={{ mb: 2, fontFamily: 'serif', color: '#8B4513' }}>
          Сообщение с подтверждением отправлено!
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Проверьте вашу электронную почту для подтверждения.
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button variant="contained" component={Link} to="/" sx={{ backgroundColor: '#B22222' }}>
            Вернуться на Главную Страницу
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EmailPage;
