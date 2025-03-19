import React, { useContext, useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem, Button, Drawer, List, ListItemButton, ListItemText, Box, Divider } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Notifications, Chat } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../App.jsx";
import { getNewMessagesCountR, getUserNotificationsR } from "../../app/tempApi.js";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Topbar = () => {
  const [user] = useContext(UserContext);
  const navigate = useNavigate();
  const [newMessages, setNewMessages] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Определённые категории для переходов
  const categories = [
    { label: 'КРС', path: '/marketplace?cat=КРС' },
    { label: 'МРС', path: '/marketplace?cat=МРС' },
    { label: 'Лошади', path: '/marketplace?cat=Лошади' },
    { label: 'Птица', path: '/marketplace?cat=Птица' }
  ];

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
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(to right, #8B4513, #A0522D)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px #000'
          }}
          onClick={() => navigate('/')}
        >
          MalSat.kg
        </Typography>

        {/* Если экран достаточно широкий – выводим категории в виде горизонтального ряда */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
            {categories.map((cat, index) => (
              <Button
                key={index}
                color="inherit"
                onClick={() => navigate(cat.path)}
                sx={{ fontWeight: 'bold' }}
              >
                {cat.label}
              </Button>
            ))}
          </Box>
        )}

        {user ? (
          <>
            <IconButton color="inherit" onClick={() => navigate('/chat')}>
              <Badge badgeContent={newMessages} color="secondary">
                <Chat />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <Badge badgeContent={notifications.length} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/user')}>
              <AccountCircle />
            </IconButton>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => navigate('/login/sign-in')}
              sx={{ fontWeight: 'bold' }}
            >
              Войти
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/login/register')}
              sx={{ fontWeight: 'bold' }}
            >
              Регистрация
            </Button>
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

      {/* Боковое меню для мобильных устройств */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            <ListItemButton onClick={() => { setDrawerOpen(false); navigate('/marketplace'); }}>
              <ListItemText primary="Маркетплейс" />
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => { setDrawerOpen(false); navigate('/about'); }}>
              <ListItemText primary="О нас" />
            </ListItemButton>
            <ListItemButton onClick={() => { setDrawerOpen(false); navigate('/sellers'); }}>
              <ListItemText primary="Для продавцов" />
            </ListItemButton>
            <ListItemButton onClick={() => { setDrawerOpen(false); navigate('/support'); }}>
              <ListItemText primary="Поддержка" />
            </ListItemButton>
            <ListItemButton onClick={() => { setDrawerOpen(false); navigate('/contact'); }}>
              <ListItemText primary="Контакты" />
            </ListItemButton>

            {/* Если мобильное устройство – выводим категории в Drawer */}
            {isMobile && (
              <>
                <Divider />
                {categories.map((cat, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => { setDrawerOpen(false); navigate(cat.path); }}
                  >
                    <ListItemText primary={cat.label} />
                  </ListItemButton>
                ))}
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Topbar;
