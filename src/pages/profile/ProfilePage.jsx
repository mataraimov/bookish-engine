import React from 'react';
import './ProfilePageStyle.css'
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App.jsx';
import {getUserByIdR, getUserR} from "../../app/tempApi.js";
// import {getUserAds, getUserProfile} from "../../app/api.js";

const ProfilePage = () => {
    const { id } = useParams();
    const [user] = useContext(UserContext);
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [ads, setAds] = useState([]);
    const [allAds, setAllAds] = useState([]); // Store all ads
    const [hasMoreAds, setHasMoreAds] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("access_token")

    useEffect(() => {
        setLoading(true);
        if (id) {
            fetchProfile(id);
        } else {
            fetchOwnProfile();
        }
    }, [id, user]);

    const fetchProfile = async (id) => {
        try {
            const response = await getUserByIdR(id,token)

            setProfile(response.data);
            setAllAds(response.data.all_ads);
            setAds(response.data.all_ads.slice(0, 10));
            if (response.data.all_ads.length > 10) {
                setHasMoreAds(true);
            } else {
                setHasMoreAds(false);
            }
        } catch (error) {
            console.error('Ошибка загрузки профиля:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOwnProfile = async () => {
        try {
            const ownResponse = await getUserR(token)
            setProfile(ownResponse.data);
            setAllAds(ownResponse.data.all_ads);
            setAds(ownResponse.data.all_ads.slice(0, 10));
            if (ownResponse.data.all_ads.length > 10) {
                setHasMoreAds(true);
            } else {
                setHasMoreAds(false);
            }
        } catch (error) {
            console.error('Ошибка загрузки собственного профиля:', error);
        } finally {
            setLoading(false);
        }
    };

    const restoreAllAds = () => {
        setAds(allAds);
        setHasMoreAds(false);
    };

    if (loading) {
        return <p>Загрузка...</p>;
    }

    return (
        <div>
            <div className="profile-header">
                <img src={profile?.photo} alt={profile?.username} className="profile-photo"/>
                <div>
                    <h2>{profile?.username}</h2>
                    <p>📞 {profile?.phone}</p>
                    {!id && ( // Only show for own profile
                        <button onClick={() => navigate('/user/change')}>Изменить профиль</button>
                    )}
                </div>
            </div>

            <h3>Объявления пользователя</h3>
            <div className="ads-container">
                {ads.map(ad => (
                    <div key={ad.id} className="ad-card" onClick={() => navigate(`/ad/${ad.id}`)}>
                        <img src={ad.photo} alt={`${ad.animal} ${ad.breed}`}/>
                        <p>{ad.animal} {ad.breed}</p>
                        <p><strong>{ad.price}</strong></p>
                    </div>
                ))}
            </div>

            {hasMoreAds && (
                <button onClick={restoreAllAds}>Показать еще</button>
            )}
        </div>
    );
};

export default ProfilePage;
