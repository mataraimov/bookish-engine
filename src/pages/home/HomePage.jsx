import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Container, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
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
            
            {/* Контент */}
            <Container sx={{ marginTop: 4 }}>
                <Grid container spacing={3}>
                    {ads.map(ad => (
                        <Grid item key={ad.id} xs={12} sm={6} md={4}>
                            <Card onClick={() => navigate(`/ad/${ad.id}`)} sx={{ cursor: 'pointer', borderRadius: '10px', border: '2px solid #8B4513' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={ad.photo}
                                    alt={`${ad.animal} ${ad.breed}`}
                                />
                                <CardContent sx={{ backgroundColor: '#FAEBD7' }}>
                                    <Typography variant="h6" sx={{ fontFamily: 'serif', color: '#8B4513' }}>{ad.animal} {ad.breed}</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#B22222' }}>{ad.price} сом</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Подвал */}
            <footer style={{ backgroundColor: '#8B4513', color: '#FFD700', textAlign: 'center', padding: '20px', marginTop: '40px' }}>
                <Typography variant="body1">&copy; 2025 MalSat.kg — Купля-продажа скота</Typography>
            </footer>
        </>
    );
};

export default HomePage;
