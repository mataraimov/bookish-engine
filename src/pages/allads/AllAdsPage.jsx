import React, { useState, useEffect } from 'react';
import { 
  Container, Box, Grid, Paper, Typography, 
  FormControl, InputLabel, Select, MenuItem, 
  TextField, Button 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllAdsR } from '../../app/tempApi.js';

const AllAdsPage = () => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState({
    animal: '',
    breed: '',
    minAge: '',
    maxAge: '',
    region: '',
    minPrice: '',
    maxPrice: ''
  });
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const navigate = useNavigate();

  // Получение данных
  useEffect(() => {
    const fetchAds = async () => {
      const allAds = await getAllAdsR();
      setAds(allAds);
      setFilteredAds(allAds.slice(0, itemsPerPage));
      setTotalItems(allAds.length);
    };
    fetchAds();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filter, page, ads]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  // Вспомогательные функции
  const calculateAgeInMonths = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    return (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
  };

  const calculateAgeInYears = (months) => {
    return Math.floor(months / 12);
  };

  const uniqueAges = (ads) => {
    return [...new Set(ads.map(ad => calculateAgeInMonths(ad.birthDate)))].sort((a, b) => a - b);
  };

  const uniqueValues = (key) => {
    return [...new Set(ads.map(ad => ad[key]))];
  };

  const checkMinAge = (adAge, minAge, ads) => {
    const ageOrder = uniqueAges(ads);
    return ageOrder.indexOf(adAge) >= ageOrder.indexOf(Number(minAge));
  };

  const checkMaxAge = (adAge, maxAge, ads) => {
    const ageOrder = uniqueAges(ads);
    return ageOrder.indexOf(adAge) <= ageOrder.indexOf(Number(maxAge));
  };

  const applyFilters = () => {
    let filtered = ads.filter(ad =>
      (filter.animal ? ad.animal.toLowerCase() === filter.animal.toLowerCase() : true) &&
      (filter.breed ? ad.breed.toLowerCase() === filter.breed.toLowerCase() : true) &&
      (filter.minAge ? checkMinAge(calculateAgeInMonths(ad.birthDate), filter.minAge, ads) : true) &&
      (filter.maxAge ? checkMaxAge(calculateAgeInMonths(ad.birthDate), filter.maxAge, ads) : true) &&
      (filter.region ? ad.region.toLowerCase() === filter.region.toLowerCase() : true) &&
      (filter.minPrice ? ad.price >= parseInt(filter.minPrice) : true) &&
      (filter.maxPrice ? ad.price <= parseInt(filter.maxPrice) : true)
    );
    setTotalItems(filtered.length);
    const startIndex = (page - 1) * itemsPerPage;
    setFilteredAds(filtered.slice(startIndex, startIndex + itemsPerPage));
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
        Все Объявления
      </Typography>
      {/* Фильтры */}
      <Box sx={{ mb: 4, p: 2, backgroundColor: '#FAEBD7', borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Животное</InputLabel>
              <Select
                label="Животное"
                value={filter.animal}
                onChange={(e) => setFilter({ ...filter, animal: e.target.value, breed: '' })}
              >
                <MenuItem value="">Любое</MenuItem>
                {uniqueValues("animal").map(animal => (
                  <MenuItem key={animal} value={animal}>{animal}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth variant="outlined" size="small" disabled={!filter.animal}>
              <InputLabel>Порода</InputLabel>
              <Select
                label="Порода"
                value={filter.breed}
                onChange={(e) => setFilter({ ...filter, breed: e.target.value })}
              >
                <MenuItem value="">Любая</MenuItem>
                {uniqueValues("breed")
                  .filter(breed => ads.find(ad => ad.animal === filter.animal && ad.breed === breed))
                  .map(breed => (
                    <MenuItem key={breed} value={breed}>{breed}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Возраст от</InputLabel>
              <Select
                label="Возраст от"
                value={filter.minAge}
                onChange={(e) => setFilter({ ...filter, minAge: e.target.value })}
              >
                <MenuItem value="">-</MenuItem>
                {uniqueAges(ads).map(age => (
                  <MenuItem key={age} value={age}>{age} мес</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Возраст до</InputLabel>
              <Select
                label="Возраст до"
                value={filter.maxAge}
                onChange={(e) => setFilter({ ...filter, maxAge: e.target.value })}
              >
                <MenuItem value="">-</MenuItem>
                {uniqueAges(ads).map(age => (
                  <MenuItem key={age} value={age}>{age} мес</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Регион</InputLabel>
              <Select
                label="Регион"
                value={filter.region}
                onChange={(e) => setFilter({ ...filter, region: e.target.value })}
              >
                <MenuItem value="">Все</MenuItem>
                {uniqueValues("region").map(region => (
                  <MenuItem key={region} value={region}>{region}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4} md={1}>
            <TextField
              label="Цена от"
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              value={filter.minPrice}
              onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={1}>
            <TextField
              label="Цена до"
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              value={filter.maxPrice}
              onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
            />
          </Grid>
        </Grid>
      </Box>
      
      {/* Список объявлений */}
      <Grid container spacing={4}>
        {filteredAds.map((ad) => (
          <Grid item xs={12} sm={6} md={4} key={ad.id}>
            <Paper 
              elevation={3} 
              sx={{ p: 2, cursor: 'pointer', border: '2px solid #8B4513', borderRadius: 2 }} 
              onClick={() => navigate(`/ad/${ad.id}`)}
            >
              {/* Если нужно временно генерировать фото с Unsplash, замените ad.photoUrl ниже */}
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
              <Typography variant="body2">Регион: {ad.region}</Typography>
              <Typography variant="body2">Цена: {ad.price} сом</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Пагинация */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
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

export default AllAdsPage;
