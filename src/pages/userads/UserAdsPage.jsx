import React, {useState} from 'react';
import './UserAdsPageStyle.css'
import { useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useCheckUser} from "../../hooks/useCheckUser.js";
import {getUserAdsR} from "../../app/tempApi.js";

const UserAdsPage = () => {
    const [ads, setAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();
    const itemsPerPage = 7;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useCheckUser()

    useEffect(() => {
        getThisUserAds();
    }, []);
    useEffect(() => {
        checkAds();
    }, [page, ads]);

    const checkAds = () => {
        const startIndex = (page - 1) * itemsPerPage;
        setFilteredAds(ads.slice(startIndex, startIndex + itemsPerPage));
    }

    const getThisUserAds = async () => {
        const response = await getUserAdsR();
        setAds(response.data);
        setFilteredAds(response.data.slice(0, itemsPerPage));
        setTotalItems(response.data.length);
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

    const handleNextPage = () => {
        const nextPage = page + 1;
        if ((nextPage - 1) * itemsPerPage < totalItems) {
            setPage(nextPage);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    return (
        <div>
            <div>
                <h1>Мои Обьявления</h1>
                <div>
                    {filteredAds.map((ad) => (
                        <div key={ad.id} onClick={() => navigate(`/ad/${ad.id}`)} style={{cursor: "pointer"}}>
                            <img src={ad.photoUrl} alt={ad.breed}/>
                            <h2>{ad.breed} ({ad.animal})</h2>
                            <p>Возраст: {calculateAgeInMonths(ad.birthDate)} ({calculateAgeInYears(calculateAgeInMonths(ad.birthDate))})</p>
                            <p>Регион Продажи: {ad.region}</p>
                            <p>Цена: {ad.price} som</p>
                        </div>
                    ))}
                </div>
                <button onClick={handlePrevPage} disabled={page === 1}>Назад</button>
                <p>{page}/{totalPages} </p>
                <button onClick={handleNextPage} disabled={page * itemsPerPage >= totalItems}>Вперед</button>
            </div>
        </div>
    );
};

export default UserAdsPage;
