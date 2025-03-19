import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCheckUser } from '../../hooks/useCheckUser.js';
import { getUserAdsR } from '../../app/tempApi.js';

const UserAdsPage = () => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 7;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useCheckUser();

  useEffect(() => {
    getThisUserAds();
  }, []);

  useEffect(() => {
    checkAds();
  }, [page, ads]);

  const checkAds = () => {
    const startIndex = (page - 1) * itemsPerPage;
    setFilteredAds(ads.slice(startIndex, startIndex + itemsPerPage));
  };

  const getThisUserAds = async () => {
    const response = await getUserAdsR();
    setAds(response.data);
    setFilteredAds(response.data.slice(0, itemsPerPage));
    setTotalItems(response.data.length);
  };

  const calculateAgeInMonths = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    return (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
  };

  const calculateAgeInYears = (months) => {
    return Math.floor(months / 12);
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if ((nextPage - 1) * itemsPerPage < totalItems) {
      setPage(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3, color: '#8B4513', fontFamily: 'serif' }}>
        Мои Объявления
      </Typography>
      <Grid container spacing={2}>
        {filteredAds.map(ad => (
          <Grid item xs={12} sm={6} md={4} key={ad.id}>
            <Paper 
              sx={{ p: 2, cursor: 'pointer', border: '2px solid #8B4513', borderRadius: 2 }}
              onClick={() => navigate(`/ad/${ad.id}`)}
            >
              <Box
                component="img"
                src={ad.photoUrl || `https://source.unsplash.com/random/200x300/?${ad.animal}&${new Date().getTime()}`}
                alt={ad.breed}
                sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 1 }}
              />
              <Typography variant="h6" sx={{ mt: 1, fontFamily: 'serif', color: '#8B4513' }}>
                {ad.breed} ({ad.animal})
              </Typography>
              <Typography variant="body2">
                Возраст: {calculateAgeInMonths(ad.birthDate)} мес (~{calculateAgeInYears(calculateAgeInMonths(ad.birthDate))} лет)
              </Typography>
              <Typography variant="body2">Регион Продажи: {ad.region}</Typography>
              <Typography variant="body2">Цена: {ad.price} som</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
        <Button variant="contained" onClick={handlePrevPage} disabled={page === 1} sx={{ mr: 2, backgroundColor: '#8B4513' }}>
          Назад
        </Button>
        <Typography>{page} / {totalPages}</Typography>
        <Button variant="contained" onClick={handleNextPage} disabled={page * itemsPerPage >= totalItems} sx={{ ml: 2, backgroundColor: '#8B4513' }}>
          Вперед
        </Button>
      </Box>
    </Container>
  );
};

export default UserAdsPage;
