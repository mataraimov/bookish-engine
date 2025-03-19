import React, { useContext, useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem, Button, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Notifications, Chat } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../App.jsx";
import { getNewMessagesCountR, getUserNotificationsR } from "../../app/tempApi.js";

const Topbar = () => {
    const [user] = useContext(UserContext);
    const navigate = useNavigate();
    const [newMessages, setNewMessages] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const [msgRes, notifRes] = await Promise.all([getNewMessagesCountR(), getUserNotificationsR()]);
                    setNewMessages(msgRes.status === 200 ? msgRes.data : 0);
                    setNotifications(notifRes.status === 200 ? notifRes.data : []);
                } catch (error) {
                    console.error("Ошибка загрузки данных:", error);
                }
            };
            fetchData();
        }
    }, [user]);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <AppBar position="sticky" color="primary" sx={{ backgroundColor: '#8B4513' }}>
            <Toolbar>
                {/* Бургер-меню для мобильных устройств */}
                <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>MalSat.kg</Typography>
                
                {user ? (
                    <>
                        <IconButton color="inherit" onClick={() => navigate('/chat')}>
                            <Badge badgeContent={newMessages} color="secondary">
                                <Chat />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <Badge badgeContent={notifications.length} color="secondary">
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={() => navigate('/user')}>
                            <AccountCircle />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <Button color="inherit" onClick={() => navigate('/login/sign-in')}>Войти</Button>
                        <Button color="inherit" onClick={() => navigate('/login/register')}>Регистрация</Button>
                    </>
                )}
            </Toolbar>

            {/* Меню уведомлений */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {notifications.length === 0 ? (
                    <MenuItem>Нет новых уведомлений</MenuItem>
                ) : (
                    notifications.map((notif, index) => (
                        <MenuItem key={index} component={Link} to={notif.link} onClick={handleMenuClose}>
                            {notif.message}
                        </MenuItem>
                    ))
                )}
            </Menu>

            {/* Боковое меню */}
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                    <ListItemButton onClick={() => navigate('/about')}>
                        <ListItemText primary="О нас" />
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/sellers')}>
                        <ListItemText primary="Для продавцов" />
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/marketplace')}>
                        <ListItemText primary="Маркетплейс" />
                    </ListItemButton>
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Topbar;