import React from 'react';
import './ChatPageStyle.css'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChatPage = () => {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [messageLimitExceeded, setMessageLimitExceeded] = useState(false);

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        if (chatId) {
            setSelectedChat(chatId);
        }
    }, [chatId]);

    useEffect(()=>{
        if (selectedChat) {
            fetchMessages(chatId);
        }
    },[selectedChat]);

    const fetchChats = () => {
        const dummyChats = [
            {
                id: "1",
                user: { name: "User1", profilePic: "https://example.com/user1.jpg", id: "101" },
                ad: { animal: "Корова", breed: "Ангус", price: 40000, id: "201" },
            },
            {
                id: "2",
                user: { name: "User2", profilePic: "https://example.com/user2.jpg", id: "102" },
                ad: { animal: "Лошадь", breed: "Арабская", price: 70000, id: "202" },
            },
        ];
        setChats(dummyChats);
    };

    const fetchMessages = (id) => {
        console.log(id)
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
        <div style={{ display: "flex" }}>
            <div style={{ width: "30%", borderRight: "1px solid gray" }}>
                <h3>Чаты</h3>
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        style={{ padding: "10px", cursor: selectedChat === chat.id ? "default" : "pointer", background: selectedChat === chat.id ? "#ddd" : "" }}
                        onClick={() => {
                            if (selectedChat !== chat.id) {
                                navigate(`/chat/${chat.id}`);
                                setSelectedChat(chat.id);
                            }
                        }}
                    >
                        <p>
                            {chat.ad.animal} {chat.ad.breed} {chat.ad.price} сом
                        </p>
                        <img src={chat.user.profilePic} alt={chat.user.name} style={{ width: "30px", borderRadius: "50%" }} />
                        <span>{chat.user.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ width: "70%", padding: "10px" }}>
                {selectedChatData ? (
                    <>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <img src={selectedChatData.user.profilePic} alt={selectedChatData.user.name} style={{ width: "40px", borderRadius: "50%" }} />
                            <h3>
                                <a href={`/profile/${selectedChatData.user.id}`} style={{ textDecoration: "none", color: "black" }}>
                                    Чат с {selectedChatData.user.name}
                                </a>
                            </h3>
                        </div>
                        <div>
                            <p>
                                <a href={`/ad/${selectedChatData.ad.id}`} style={{ textDecoration: "none", color: "black" }}>
                                    {selectedChatData.ad.animal} {selectedChatData.ad.breed} - {selectedChatData.ad.price} сом
                                </a>
                            </p>
                        </div>
                        <div>
                            {messages.map((msg) => (
                                <p key={msg.id} style={{ textAlign: msg.sender === "me" ? "right" : "left" }}>
                                    {msg.text}
                                </p>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={handleMessageChange}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            maxLength={300}
                        />
                        {messageLimitExceeded && <p style={{ color: "red" }}>Максимум 300 символов, осталось {300 - newMessage.length}</p>}
                        {newMessage.length === 300 && <p style={{ color: "red" }}>Укоротите сообщение</p>}
                        <button onClick={sendMessage}>Отправить</button>
                    </>
                ) : (
                    <p>Выберите чат</p>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
