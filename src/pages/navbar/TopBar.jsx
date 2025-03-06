import React, { useContext, useState, useEffect } from 'react';
import './TopBarStyle.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../App.jsx";
import {getNewMessagesCount, getUserNotifications} from "../../app/api.js";

const Topbar = () => {
    const [user,setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [newMessages, setNewMessages] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    useEffect(() => {
        if (user) {
            fetchNewMessages();
            fetchNotifications();
        }
    }, [user]);

    const fetchNewMessages = async () => {
        try {
            const count = await getNewMessagesCount();
            setNewMessages(count);
        } catch (error) {
            console.error("Ошибка при загрузке сообщений:", error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const data = await getUserNotifications();
            setNotifications(data);
        } catch (error) {
            console.error("Ошибка при загрузке уведомлений:", error);
        }
    };

    const userChecker = ()=>{
        if (user){
            setUser(false)
        }else{
            setUser(true)}
    }

    return (
        <nav>
            <h1 onClick={() => navigate('/')}>MalSat.kg</h1>
            <ul>
                {user ? (
                    <>
                        <li>
                            <button onClick={() => navigate('/chat')}>
                                Сообщения {newMessages > 0 && `(${newMessages > 99 ? '99+' : newMessages})`}
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                                Уведомления
                            </button>
                            {isNotificationOpen && (
                                <div className="notifications-window">
                                    {notifications.length === 0 ? (
                                        <p>Нет новых уведомлений.</p>
                                    ) : (
                                        <ul>
                                            {notifications.map((notification, index) => (
                                                <li key={index}>
                                                    {notification.message}{' '}
                                                    {notification.ad && (
                                                        <a href={notification.ad.link}>Перейти к объявлению</a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </li>
                        <li>
                            <button onClick={() => navigate('/ad/favorites')}>Избранное</button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/ad/my-ads')}>Мои объявления</button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/user')}>Профиль</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <button onClick={() => navigate('/login/sign-in')}>Войти</button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/login/register')}>Регистрация</button>
                        </li>
                    </>
                )}
            </ul>


            <div onClick={userChecker}
                // style={{background:"red", width:"200px",height:"200px"}}
            >
                USERCHECKER
            </div>

        </nav>
    );
};

export default Topbar;
