import './PostAdPageStyle.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnimalsListR, postAdR} from "../../app/tempApi.js";
import {useCheckUser} from "../../hooks/useCheckUser.js";


const PostAdPage = () => {
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
    const token = localStorage.getItem("access_token")

    useCheckUser()

    useEffect(() => {
        const fetchAdEssentials = async () => {
            try {
                let animalsList = await getAnimalsListR(token);
                setAnimals(animalsList);
            } catch (err) {
                setError(err||'Ошибка загрузки объявления.');
            }
        };
        fetchAdEssentials();
    }, []);

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
            const response = await postAdR(token, formData);
            if (response.status === 200 || response.status === 201) {
                navigate('/ad/my-ads');
            }
        } catch (err) {
            setError(err||'Ошибка обновления объявления.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <h2>Подать объявление</h2>
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


export default PostAdPage;
