import './RegisterPageStyle.css';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {registerUserR} from '../../app/tempApi.js';
import countryPhoneCodes from '../../app/countryPhoneCodes.jsx';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneCode: '+996',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [selectedCode, setSelectedCode] = useState("+996");
    const [phoneError, setPhoneError] = useState("");

    const handlePhoneChange = (e) => {
        const number = e.target.value;
        setFormData(prevFormData => ({
            ...prevFormData,
            phoneNumber: number
        }));
        setPhoneError(validatePhoneNumber(selectedCode, number));
    };

    const validateUsername = (username) => {
        return /^[A-Za-zА-Яа-яЁё0-9]{1,20}$/.test(username);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const validatePhoneNumber = (selectedCode, phoneNumber) => {
        const country = countryPhoneCodes.find(c => c.code === selectedCode);
        if (!country) {
            return "Выберите страну";
        }
        const cleanedNumber = phoneNumber.replace(/\D/g, "");
        if (cleanedNumber.length !== country.length) {
            return `Номер должен содержать ${country.length} цифр`;
        }
        return "";
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
                if (!validateUsername(value)) error = 'Только латинские, кириллические буквы и цифры, без пробелов, до 20 символов';
                break;
            case 'email':
                if (!validateEmail(value)) error = 'Недействительный адрес электронной почты';
                break;
            case 'password':
                if (!validatePassword(value)) error = 'Пароль должен быть 8-20 символов, написан на латинском алфавите (английском), может содержать заглавные, строчные буквы, цифры и спецсимволы (!?*())';
                break;
            case 'confirmPassword':
                if (value !== formData.password) error = 'Пароли не совпадают';
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (Object.values(errors).some(error => error) || Object.values(formData).some(value => !value)) {
            setErrorMessage('Пожалуйста, исправьте ошибки в форме');
            return;
        }

        try {
            const response = await registerUserR(formData);
            if (response.status === 200 || response.status === 201) {
                navigate('/confirm-email');
            } else {
                setErrorMessage('Ошибка Сервера, Попробуйте Позже!')
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Имя пользователя" value={formData.username} onChange={handleChange} required />
                <p>{errors.username}</p>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <p>{errors.email}</p>
                <select onChange={(e) => setSelectedCode(e.target.value)}>
                    {countryPhoneCodes.map(({id, country, code}) => (
                        <option key={id} value={code}>
                            {country} ({code})
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Введите номер"
                />
                {phoneError && <p className="error">{phoneError}</p>}
                <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required />
                <p>{errors.password}</p>
                <input type="password" name="confirmPassword" placeholder="Подтвердите пароль" value={formData.confirmPassword} onChange={handleChange} required />
                <p>{errors.confirmPassword}</p>
                <button type="submit">Зарегистрироваться</button>
            </form>
            {errorMessage && <div>{errorMessage}</div>}
            <Link to="/login/sign-in">Уже Есть Аккаунт?</Link>
        </div>
    );
};

export default RegisterPage;
