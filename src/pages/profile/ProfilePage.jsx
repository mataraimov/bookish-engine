import React, { useState, useEffect, useContext } from 'react';
import { Container, Paper, Typography, Avatar, Button, Grid, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App.jsx';
import { getUserByIdR, getUserR } from '../../app/tempApi.js';

const ProfilePage = () => {
  const { id } = useParams();
  const [userContext] = useContext(UserContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [ads, setAds] = useState([]);
  const [allAds, setAllAds] = useState([]);
  const [hasMoreAds, setHasMoreAds] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetchProfile(id);
    } else {
      fetchOwnProfile();
    }
  }, [id, userContext]);

  const fetchProfile = async (id) => {
    try {
      const response = await getUserByIdR(id, token);
      setProfile(response.data);
      setAllAds(response.data.all_ads);
      setAds(response.data.all_ads.slice(0, 10));
      setHasMoreAds(response.data.all_ads.length > 10);
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOwnProfile = async () => {
    try {
      const ownResponse = await getUserR(token);
      setProfile(ownResponse.data);
      setAllAds(ownResponse.data.all_ads);
      setAds(ownResponse.data.all_ads.slice(0, 10));
      setHasMoreAds(ownResponse.data.all_ads.length > 10);
    } catch (error) {
      console.error('Ошибка загрузки собственного профиля:', error);
    } finally {
      setLoading(false);
    }
  };

  const restoreAllAds = () => {
    setAds(allAds);
    setHasMoreAds(false);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6" align="center">Загрузка...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 4, backgroundColor: '#FFF8DC' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={profile?.photo} alt={profile?.username} sx={{ width: 100, height: 100 }} />
          <Box>
            <Typography variant="h5" sx={{ fontFamily: 'serif', color: '#8B4513' }}>
              {profile?.username}
            </Typography>
            <Typography variant="body1">📞 {profile?.phone}</Typography>
          </Box>
          {!id && (
            <Button variant="contained" onClick={() => navigate('/user/change')} sx={{ ml: 'auto', backgroundColor: '#8B4513' }}>
              Изменить профиль
            </Button>
          )}
        </Box>
      </Paper>
      <Typography variant="h6" sx={{ mb: 2, color: '#8B4513' }}>
        Объявления пользователя
      </Typography>
      <Grid container spacing={2}>
        {ads.map(ad => (
          <Grid item xs={12} sm={6} md={4} key={ad.id}>
            <Paper
              sx={{ p: 2, cursor: 'pointer', border: '2px solid #8B4513', borderRadius: 2 }}
              onClick={() => navigate(`/ad/${ad.id}`)}
            >
              <Box
                component="img"
                src={ad.photo || ad.photoUrl || `https://source.unsplash.com/random/200x300/?${ad.animal}&${new Date().getTime()}`}
                alt={`${ad.animal} ${ad.breed}`}
                sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 1 }}
              />
              <Typography variant="h6" sx={{ mt: 1, fontFamily: 'serif', color: '#8B4513' }}>
                {ad.animal} {ad.breed}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#B22222' }}>
                {ad.price} сом
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {hasMoreAds && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button variant="contained" onClick={restoreAllAds} sx={{ backgroundColor: '#8B4513' }}>
            Показать еще
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ProfilePage;
