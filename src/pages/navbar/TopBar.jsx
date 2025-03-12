import React, { useContext, useState, useEffect } from 'react';
import './TopBarStyle.css';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from "../../App.jsx";
import {getNewMessagesCountR, getUserNotificationsR} from "../../app/tempApi.js";

const Topbar = () => {
    const [user,setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [newMessages, setNewMessages] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchNewMessages = async () => {
                try {
                    const response = await getNewMessagesCountR();
                    if (response.status === 200||response.status === 201) {
                        setNewMessages(response.data);
                    } else {
                        setNewMessages(0);
                    }
                } catch (error) {
                    console.error("Ошибка при загрузке сообщений:", error);
                }
            };
            const fetchNotifications = async () => {
                try {
                    const data = await getUserNotificationsR();
                    if (data.status === 200||data.status === 201) {
                        setNotifications(data.data);
                    } else {
                        setNotifications([])
                    }
                } catch (error) {
                    console.error("Ошибка при загрузке уведомлений:", error);
                }
            };
            fetchNewMessages();
            fetchNotifications();
        }
    }, [user]);

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
                                                        <Link to={notification.link}>
                                                            {notification.ad}
                                                        </Link>
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
