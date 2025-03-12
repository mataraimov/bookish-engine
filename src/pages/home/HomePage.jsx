import React, {useEffect, useState} from 'react';
import'./HomePageStyle.css'
import {useNavigate} from "react-router-dom";
import {fetchTopAdsR} from "../../app/tempApi.js";

const HomePage = () => {
    const [ads, setAds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAds = async () => {
            try {
                const response = await fetchTopAdsR();
                if (response.status === 200||response.status === 201) {
                    setAds(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getAds();
    }, [])
    return (
        <div>
            <div className="ads-container">
                {ads.map(ad => (
                    <div key={ad.id} className="ad-card" onClick={() => navigate(`/ad/${ad.id}`)}>
                        <img src={ad.photo} alt={`${ad.animal} ${ad.breed}`}/>
                        <p>{ad.animal} {ad.breed}</p>
                        <p><strong>{ad.price}</strong></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
