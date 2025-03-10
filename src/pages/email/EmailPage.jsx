import React from 'react';
import './EmailPageStyle.css'
import {Link} from "react-router-dom";

const EmailPage = () => {
    return (
        <div>
            Сообщение с подтверждением было отправлено на вашу электронную почту!
            <br/>
            <Link to={'/'}>Вернуться на Главную Страницу</Link>
        </div>
    );
};

export default EmailPage;
