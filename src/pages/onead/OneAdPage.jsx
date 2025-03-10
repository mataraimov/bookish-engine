import React from 'react';
import './OneAdPageStyle.css'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getChatId} from "../../app/api.js";

const OneAdPage = () => {


    const { id } = useParams();
    const navigate = useNavigate();
    const [ad, setAd] = useState({
        id: "",
        animal: "",
        breed: "",
        age: "",
        region: "",
        description: "",
        seller: {
            id: "",
            name: "",
            phone: "",
            profilePic: "",
        },
        photos: [],
    });

    const [loadingChat, setLoadingChat] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    useEffect(() => {
        fetchAd();
    }, []);

    const fetchAd = async () => {
        try{
            const dummyAd = {
                id,
                animal: "Horse",
                breed: "Arabian",
                age: "4 years",
                region: "Osh",
                description: "A strong and well-trained Arabian horse, perfect for riding.",
                seller: {
                    id: 22,
                    name: "John Doe",
                    phone: "+996 555 123 456",
                    profilePic: "https://example.com/photos/profile22.jpg",
                },
                photos: [
                    "https://example.com/photos/horse1.jpg",
                    "https://example.com/photos/horse2.jpg",
                    "https://example.com/photos/horse3.jpg",
                ],
            };
            setAd(dummyAd);
        } catch (error){
            console.log(error);
        }
    };
    const handleChat = async () => {
        setLoadingChat(true);
        try {
            const chatId = await getChatId(id, localStorage.getItem('token'));
            navigate(`/chat/${chatId}`);
        } catch (error) {
            console.error('Error fetching chat:', error);
        } finally {
            setLoadingChat(false);
        }
    };
    return (
        <div>
            {ad.breed && ad.animal && <h1>Купить {ad.breed} ({ad.animal})</h1>}
            {ad.photos.length > 0 && (
                <div>
                    <button
                        onClick={() => setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : ad.photos.length - 1))}>
                        ◀
                    </button>
                    <img src={ad.photos[currentPhotoIndex]} alt="Ad" style={{maxWidth: "300px"}}/>
                    <button
                        onClick={() => setCurrentPhotoIndex((prev) => (prev < ad.photos.length - 1 ? prev + 1 : 0))}>
                        ▶
                    </button>
                </div>
            )}
            <ul>
                {ad.region && <li>Region: {ad.region}</li>}
                {ad.breed && <li>Breed: {ad.breed}</li>}
                {ad.age && <li>Age: {ad.age}</li>}
                {ad.description && <li>Description: {ad.description}</li>}
            </ul>
            {ad.seller.id && (
                <div>
                    <h2>Seller Information</h2>
                    <div onClick={() => navigate(`/user/${ad.seller.id}`)} style={{cursor: "pointer"}}>
                        {ad.seller.profilePic && <img src={ad.seller.profilePic} alt={ad.seller.name}
                                                      style={{width: "50px", borderRadius: "50%"}}/>}
                        <p>{ad.seller.name}</p>
                    </div>
                    {ad.seller.phone && <p>Phone: {ad.seller.phone}</p>}
                </div>
            )}
            <button onClick={handleChat} disabled={loadingChat}>
                {loadingChat ? 'Загрузка...' : 'Чат с продавцом'}
            </button>
        </div>
    );
};

export default OneAdPage;
