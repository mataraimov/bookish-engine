import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Paper, Box, Typography, List, 
  ListItemButton, ListItemAvatar, ListItemText, Avatar, Divider, TextField, Button 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useCheckUser } from '../../hooks/useCheckUser.js';

const ChatPage = () => {
  const { id: chatId } = useParams();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageLimitExceeded, setMessageLimitExceeded] = useState(false);

  useCheckUser();

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (chatId) {
      setSelectedChat(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat);
    }
  }, [selectedChat]);

  const fetchChats = () => {
    // Dummy данные чатов
    const dummyChats = [
      {
        id: "1",
        user: { name: "User1", profilePic: "https://picsum.photos/536/354", id: "101" },
        ad: { animal: "Корова", breed: "Ангус", price: 40000, id: "201" },
      },
      {
        id: "2",
        user: { name: "User2", profilePic: "https://picsum.photos/536/354", id: "102" },
        ad: { animal: "Лошадь", breed: "Арабская", price: 70000, id: "202" },
      },
    ];
    setChats(dummyChats);
  };

  const fetchMessages = (chatId) => {
    // Dummy сообщения
    const dummyMessages = [
      { id: 1, text: "Hello!", sender: "me" },
      { id: 2, text: "Hi there!", sender: "them" },
    ];
    setMessages(dummyMessages);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || newMessage.length > 300) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me" }]);
    setNewMessage("");
    setMessageLimitExceeded(false);
  };

  const handleMessageChange = (e) => {
    const text = e.target.value;
    if (text.length <= 300) {
      setNewMessage(text);
      setMessageLimitExceeded(text.length > 200);
    }
  };

  const selectedChatData = chats.find((c) => c.id === selectedChat);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        {/* Список чатов */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, backgroundColor: '#FAEBD7' }}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'serif', color: '#8B4513' }}>
              Чаты
            </Typography>
            <List>
              {chats.map((chat) => (
                <ListItemButton 
                  key={chat.id}
                  selected={selectedChat === chat.id}
                  onClick={() => {
                    if (selectedChat !== chat.id) {
                      navigate(`/chat/${chat.id}`);
                      setSelectedChat(chat.id);
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={chat.user.profilePic} alt={chat.user.name} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={`${chat.ad.animal} ${chat.ad.breed} - ${chat.ad.price} сом`} 
                    secondary={chat.user.name}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Grid>
        {/* Окно чата */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, backgroundColor: '#FFF8DC', display: 'flex', flexDirection: 'column', height: '70vh' }}>
            {selectedChatData ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={selectedChatData.user.profilePic} 
                    alt={selectedChatData.user.name} 
                    sx={{ width: 56, height: 56, mr: 2 }} 
                  />
                  <Typography 
                    variant="h6" 
                    component="a" 
                    href={`/profile/${selectedChatData.user.id}`} 
                    sx={{ textDecoration: 'none', color: '#8B4513' }}
                  >
                    Чат с {selectedChatData.user.name}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    component="a" 
                    href={`/ad/${selectedChatData.ad.id}`} 
                    sx={{ textDecoration: 'none', color: '#8B4513' }}
                  >
                    {selectedChatData.ad.animal} {selectedChatData.ad.breed} - {selectedChatData.ad.price} сом
                  </Typography>
                </Box>
                <Divider />
                <Box 
                  sx={{ flexGrow: 1, mt: 2, overflowY: 'auto', p: 1, backgroundColor: '#FAEBD7', borderRadius: 1 }}
                >
                  {messages.map((msg) => (
                    <Box key={msg.id} sx={{ textAlign: msg.sender === "me" ? "right" : "left", mb: 1 }}>
                      <Typography 
                        variant="body1" 
                        sx={{ display: 'inline-block', p: 1, borderRadius: 1, backgroundColor: msg.sender === "me" ? '#B22222' : '#8B4513', color: '#fff' }}
                      >
                        {msg.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField 
                    fullWidth 
                    variant="outlined" 
                    placeholder="Напишите сообщение..." 
                    value={newMessage} 
                    onChange={handleMessageChange}
                    onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); sendMessage(); } }} 
                  />
                  <Button variant="contained" onClick={sendMessage} sx={{ backgroundColor: '#B22222' }}>
                    Отправить
                  </Button>
                </Box>
                {messageLimitExceeded && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    Максимум 300 символов, осталось {300 - newMessage.length}
                  </Typography>
                )}
              </>
            ) : (
              <Typography variant="h6" align="center" sx={{ mt: 4, color: '#8B4513' }}>
                Выберите чат для начала общения
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatPage;
