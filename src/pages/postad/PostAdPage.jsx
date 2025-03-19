import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAnimalsListR, postAdR } from '../../app/tempApi.js';
import { useCheckUser } from '../../hooks/useCheckUser.js';

const PostAdPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [formData, setFormData] = useState({
    animal: '',
    breed: '',
    age: '',
    price: '',
    description: '',
    photos: [],
  });
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useCheckUser();

  useEffect(() => {
    const fetchAdEssentials = async () => {
      try {
        const animalsList = await getAnimalsListR(token);
        setAnimals(animalsList.data || animalsList);
      } catch (err) {
        setError(err || 'Ошибка загрузки объявления.');
      }
    };
    fetchAdEssentials();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.photos.length > 10) {
      setError('Максимум 10 фото!');
      return;
    }
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await postAdR(token, formData);
      if (response.status === 200 || response.status === 201) {
        navigate('/ad/my-ads');
      }
    } catch (err) {
      setError(err || 'Ошибка обновления объявления.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, backgroundColor: '#FFF8DC' }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, color: '#8B4513', fontFamily: 'serif' }}>
          Подать объявление
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" size="small" required>
                <InputLabel>Животное</InputLabel>
                <Select
                  label="Животное"
                  name="animal"
                  value={formData.animal}
                  onChange={handleChange}
                >
                  {animals.map(animal => (
                    <MenuItem key={animal} value={animal}>{animal}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Порода"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Возраст"
                name="age"
                type="date"
                value={formData.age}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Цена (KGS)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Описание"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                inputProps={{ maxLength: 2000 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth sx={{ backgroundColor: '#8B4513' }}>
                Загрузить фото (макс. 10)
                <input type="file" hidden multiple accept="image/*" onChange={handlePhotoUpload} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ backgroundColor: '#B22222' }}>
                {loading ? 'Загрузка...' : 'Сохранить изменения'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostAdPage;
