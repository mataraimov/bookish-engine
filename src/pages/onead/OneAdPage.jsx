import React from 'react';
import './OneAdPageStyle.css'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getAdR,getChatIdR} from "../../app/tempApi.js";
import {useCheckUser} from "../../hooks/useCheckUser.js";

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
    const token = localStorage.getItem("access_token")

    useCheckUser()

    useEffect(() => {
        fetchAd();
    }, []);

    const fetchAd = async () => {
        try{
            const response = await getAdR(id,token);
            setAd(response.data);
        } catch (error){
            console.log(error);
        } finally {
            console.log(ad)
        }
    };
    const handleChat = async () => {
        setLoadingChat(true);
        try {
            const chatId = await getChatIdR(id,token);
            navigate(`/chat/${chatId.data.chat_id}`);
        } catch (error) {
            console.error('Error fetching chat:', error);
        } finally {
            setLoadingChat(false);
        }
    };

    const calculateAgeInMonths = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        return (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    };

    const calculateAgeInYears = (months) => {
        switch (Math.floor(months/12)){
            case 0:
                return (Math.floor(months/12)+' лет');
            case 1:
                return (Math.floor(months/12)+' год')
            case 2:
                return (Math.floor(months/12)+' года')
            case 3:
                return (Math.floor(months/12)+' года')
            case 4:
                return (Math.floor(months/12)+' года')
            default:
                return (Math.floor(months/12)+' лет')
        }
    }

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
                {ad.region && <li>Регион Продажи: {ad.region}</li>}
                {ad.breed && <li>Порода: {ad.breed}</li>}
                {ad.age && <li>Возраст: {calculateAgeInMonths(ad.age)} месяцев ({calculateAgeInYears(calculateAgeInMonths(ad.age))} лет)</li>}
                {ad.description && <li>Описание: {ad.description}</li>}
            </ul>
            {ad.seller.id && (
                <div>
                    <h2>Seller Information</h2>
                    <div onClick={() => navigate(`/user/${ad.seller.id}`)} style={{cursor: "pointer"}}>
                        {ad.seller.profilePic && <img src={ad.seller.profilePic} alt={ad.seller.name} style={{width: "50px", borderRadius: "50%"}}/>}
                        <p>{ad.seller.name}</p>
                    </div>
                    {ad.seller.phone && <p>Номер Телефона: {ad.seller.phone}</p>}
                </div>
            )}
            <button onClick={handleChat} disabled={loadingChat}>
                {loadingChat ? 'Загрузка...' : 'Чат с продавцом'}
            </button>
        </div>
    );
};

export default OneAdPage;
