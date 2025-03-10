import './ForgotPageStyle.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {sendPasswordReset} from "../../app/api.js";

const ForgotPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await sendPasswordReset(email);
            if (response.success) {
                setMessage('Ссылка для восстановления пароля отправлена на вашу почту.');
                setTimeout(() => navigate('/'), 3000);
            } else {
                setError(response.message || 'Ошибка при отправке запроса.');
            }
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Нет ответа от сервера.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-page">
            {!message && (
                <form onSubmit={handleSubmit} className="forgot-form">
                    <h2>Восстановление пароля</h2>
                    <label>
                        Введите ваш email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Отправка...' : 'Отправить'}
                    </button>
                </form>
            )}
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default ForgotPage;
