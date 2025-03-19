import React, { useState, useEffect } from 'react';
import { 
  Container, Box, Grid, Typography, Button, Card, CardMedia, Paper, IconButton 
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdR, getChatIdR } from '../../app/tempApi.js';

const OneAdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const [ad, setAd] = useState({
    id: '',
    animal: '',
    breed: '',
    age: '',
    region: '',
    description: '',
    seller: {
      id: '',
      name: '',
      phone: '',
      profilePic: '',
    },
    photos: [],
  });
  const [loadingChat, setLoadingChat] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await getAdR(id, token);
        setAd(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAd();
  }, [id, token]);

  const handleChat = async () => {
    setLoadingChat(true);
    try {
      const response = await getChatIdR(id, token);
      console.log(response);
      navigate(`/chat/${response.data.chat_id}`);
    } catch (error) {
      console.error('Error fetching chat:', error);
    } finally {
      setLoadingChat(false);
    }
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev > 0 ? prev - 1 : ad.photos.length - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev < ad.photos.length - 1 ? prev + 1 : 0
    );
  };

  const calculateAgeInMonths = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    return (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
  };

  const calculateAgeInYears = (months) => {
    return Math.floor(months / 12);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBackIos />
      </IconButton>
      
      {ad.breed && ad.animal && (
        <Typography variant="h4" align="center" sx={{ fontFamily: 'serif', color: '#8B4513', mb: 3 }}>
          Купить {ad.breed} ({ad.animal})
        </Typography>
      )}
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ position: 'relative', height: '100%', p: 2, backgroundColor: '#FAEBD7' }}>
            {ad.photos.length >= 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <IconButton onClick={handlePrevPhoto} sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: '#8B4513' }}>
                  <ArrowBackIos />
                </IconButton>
                <Card sx={{ maxWidth: '100%' }}>
                  <CardMedia
                    component="img"
                    image={ "https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg"}
                    alt="Ad Photo"
                    sx={{ objectFit: 'cover', maxHeight: 400 }}
                  />
                </Card>
                <IconButton onClick={handleNextPhoto} sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: '#8B4513' }}>
                  <ArrowForwardIos />
                </IconButton>
              </Box>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: '#FFF8DC' }}>
            <Typography variant="h5" sx={{ fontFamily: 'serif', color: '#8B4513', mb: 2 }}>
              Детали объявления
            </Typography>
            <Box sx={{ mb: 2 }}>
              {ad.region && (
                <Typography variant="body1"><strong>Регион продажи:</strong> {ad.region}</Typography>
              )}
              {ad.breed && (
                <Typography variant="body1"><strong>Порода:</strong> {ad.breed}</Typography>
              )}
              {ad.age && (
                <Typography variant="body1">
                  <strong>Возраст:</strong> {calculateAgeInMonths(ad.age)} месяцев (~{calculateAgeInYears(calculateAgeInMonths(ad.age))} лет)
                </Typography>
              )}
              {ad.description && (
                <Typography variant="body1" sx={{ mt: 2 }}><strong>Описание:</strong> {ad.description}</Typography>
              )}
            </Box>
            
            {ad.seller.id && (
              <Box sx={{ mt: 3, p: 2, backgroundColor: '#FAEBD7', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontFamily: 'serif', color: '#8B4513', mb: 1 }}>
                  Информация о продавце
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate(`/user/${ad.seller.id}`)}>
                  {ad.seller.profilePic && (
                    <Box component="img" src={ad.seller.profilePic} alt={ad.seller.name} sx={{ width: 60, height: 60, borderRadius: '50%', mr: 2 }} />
                  )}
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#8B4513' }}>
                    {ad.seller.name}
                  </Typography>
                </Box>
                {ad.seller.phone && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Номер телефона: {ad.seller.phone}
                  </Typography>
                )}
              </Box>
            )}
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                onClick={handleChat}
                disabled={loadingChat}
                sx={{ backgroundColor: '#B22222', '&:hover': { backgroundColor: '#8B0000' } }}
              >
                {loadingChat ? 'Загрузка...' : 'Чат с продавцом'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OneAdPage;
