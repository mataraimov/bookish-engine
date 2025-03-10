import React, {useState} from 'react';
import './UserAdsPageStyle.css'
import { useEffect} from "react";
import {useNavigate} from "react-router-dom";

const UserAdsPage = () => {
    const [ads, setAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();
    const itemsPerPage = 7;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    useEffect(() => {
        generateDummyAds();
    }, []);
    useEffect(() => {
        checkAds();
    }, [page, ads]);

    const checkAds = () => {
        const startIndex = (page - 1) * itemsPerPage;
        setFilteredAds(ads.slice(startIndex, startIndex + itemsPerPage));
    }

    const generateDummyAds = () => {
        const regions = ["Bishkek", "Osh", "Chuy", "Talas", "Naryn", "Issyk-Kul", "Jalal-Abad", "Batken", "Osh Region"];
        const ages = ["3 months", "6 months", "9 months", "1 year", "1.5 years", "2 years", "3 years", "3+"];
        const allAds = Array.from({length: 35}, (_, i) => ({
            id: i + 1,
            animal: i % 2 === 0 ? "Cow" : "Horse",
            breed: i % 2 === 0 ? "Angus" : "Arabian",
            age: ages[i % ages.length],
            region: regions[i % regions.length],
            price: 30000 + (i * 2000),
            photoUrl: `https://example.com/photos/animal${i + 1}.jpg`,
        }));
        setAds(allAds);
        setFilteredAds(allAds.slice(0, itemsPerPage));
        setTotalItems(allAds.length);
    };

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
    // const fetchAds = async (currentPage) => {
    //     try {
    //         const response = await fetch(`https://api.example.com/ads?page=${currentPage}&limit=${itemsPerPage}`);
    //         const data = await response.json();
    //         setAds(data.ads);
    //         setTotalItems(data.totalItems);
    //     } catch (error) {
    //         console.error("Error fetching ads:", error);
    //     }
    // };
    return (
        <div>
            <div>
                <h1>Мои Обьявления</h1>
                <div>
                    {filteredAds.map((ad) => (
                        <div key={ad.id} onClick={() => navigate(`/ad/${ad.id}`)} style={{cursor: "pointer"}}>
                            <img src={ad.photoUrl} alt={ad.breed}/>
                            <h2>{ad.breed} ({ad.animal})</h2>
                            <p>Age: {ad.age}</p>
                            <p>Region: {ad.region}</p>
                            <p>Price: {ad.price} som</p>
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
