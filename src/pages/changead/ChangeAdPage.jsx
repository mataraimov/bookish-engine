import './ChangeAdPageStyle.css'
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getAdById, getAnimalsList, updateAd} from "../../app/api.js";

const ChangeAdPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    useEffect(() => {
        const fetchAdData = async () => {
            try {
                const adData = await getAdById(id);
                let animalsList = await getAnimalsList();
                setFormData({
                    animal: adData.animal,
                    breed: adData.breed,
                    age: adData.age,
                    price: adData.price,
                    description: adData.description,
                    photos: adData.photos,
                });
                setAnimals(animalsList);
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Ошибка загрузки объявления.');
            }
        };
        fetchAdData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + formData.photos.length > 10) {
            setError('Максимум 10 фото!');
            return;
        }
        setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await updateAd(id, formData);
            if (response.status === 200 || response.status === 201) {
                navigate('/ad/my-ads');
            }
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Ошибка обновления объявления.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Редактировать объявление</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Животное:
                    <select name="animal" value={formData.animal} onChange={handleChange} required>
                        {animals.map((animal) => (
                            <option key={animal} value={animal}>{animal}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Порода:
                    <input name="breed" value={formData.breed} onChange={handleChange} required />
                </label>
                <label>
                    Возраст:
                    <input type="date" name="age" value={formData.age} onChange={handleChange} required />
                </label>
                <label>
                    Цена (KGS):
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </label>
                <label>
                    Описание:
                    <textarea name="description" value={formData.description} onChange={handleChange} maxLength="2000" required />
                </label>
                <label>
                    Фото (макс. 10):
                    <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} />
                </label>
                <button type="submit" disabled={loading}>{loading ? 'Загрузка...' : 'Сохранить изменения'}</button>
            </form>
        </div>
    );
};

export default ChangeAdPage;
