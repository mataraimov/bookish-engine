import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../app/api.js';
import {UserContext} from "../../App.jsx";
import './LoginPageStyle.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const validateUsername = (username) => {
        return /^[A-Za-zА-Яа-яЁё0-9]{1,20}$/.test(username);
    };

    const validatePassword = (password) => {
        return /^[A-Za-z\d!?*()]{8,20}$/.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        let error = '';
        switch (name) {
            case 'username':
                if (!validateUsername(value)) error = 'Неверный формат имени пользователя';
                break;
            case 'password':
                if (!validatePassword(value)) error = 'Неверный формат пароля';
                break;
            default:
                break;
        }
        setError(error)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await loginUser(formData);
            if (response.status === 200 && response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
                setUser(true);
                navigate('/confirm-mail');
            } else {
                setError(response.message || 'Ошибка входа!');
            }
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Ошибка сервера! Попробуйте позже.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Вход</h2>
                <input type="text" name="username" placeholder="Имя пользователя" value={formData.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required />
                <button type="submit">Войти</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <div className="login-links">
                <Link to='login/forgot-password'>Забыли пароль?</Link>
                <Link to='/login/register'>Еще нет аккаунта?</Link>
            </div>
        </div>
    );
};

export default LoginPage;
