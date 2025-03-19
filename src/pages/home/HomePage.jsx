import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardMedia,
  Typography,
  Grid,
  Box
} from '@mui/material';
import { fetchTopAdsR } from '../../app/tempApi.js';
import './HomePageStyle.css';

const HomePage = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAds = async () => {
      try {
        const response = await fetchTopAdsR();
        if (response.status === 200 || response.status === 201) {
          setAds(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAds();
  }, []);

  return (
    <>
      {/* Основной контент */}
      <Box
        sx={{
          minHeight: 'calc(100vh - 300px)',
          py: 4,
        }}
      >
        <Container>
          <Grid container spacing={3}>
            {ads.map(ad => (
              <Grid item key={ad.id} xs={12} sm={6} md={4}>
                
                <Card
                  onClick={() => navigate(`/ad/${ad.id}`)}
                  sx={{
                    cursor: 'pointer',
                    border: '3px solid #857555',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 12px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={ad.photo}
                    alt={`${ad.animal} ${ad.breed}`}
                  />
                  {/* Блок с тёмно-синим фоном */}
                  <Box
                    sx={{
                      backgroundColor: '#0C2960', // тёмно-синий
                      color: '#D0A616', // общий цвет текста — белый
                      p: 2
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 'bold', mb: 1 }}
                    >
                      {ad.animal} {ad.breed}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: '#FFEFCA' }} // жёлтый для цены
                    >
                      {ad.price} сом
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Подвал (footer) */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#4B1B1B', // темно-бордовый
          color: '#FFD700',
          mt: 4,
          pt: 4,
          pb: 2
        }}
      >
        <Container>
          {/* Здесь пример «многосекционного» футера */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                О компании
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                MalSat.kg — онлайн-маркетплейс для покупки и продажи скота. 
                Мы стремимся обеспечить удобство и безопасность для всех 
                участников рынка.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Разделы
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Маркетплейс
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Для продавцов
              </Typography>
              <Typography variant="body2">
                О нас
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Помощь
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                FAQ
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Поддержка
              </Typography>
              <Typography variant="body2">
                Контакты
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Мы в соцсетях
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Facebook
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Instagram
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Twitter
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              &copy; 2025 MalSat.kg — Купля-продажа скота. Все права защищены.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
