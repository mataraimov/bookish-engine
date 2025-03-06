import React from 'react';
import './ProfilePageStyle.css'
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App.jsx';
// import {getUserAds, getUserProfile} from "../../app/api.js";
// sdfdsfsdfsasdasd

const ProfilePage = () => {
    const { id } = useParams();
    const [user] = useContext(UserContext);
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [ads, setAds] = useState([]);
    const [allAds, setAllAds] = useState([]); // Store all ads
    const [hasMoreAds, setHasMoreAds] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (id) {
            fetchProfile(id);
        } else {
            fetchOwnProfile();
        }
    }, [id, user]);

    const fetchProfile = async (profileId) => {
        try {
            console.log('Fetching profile for user:', profileId);
            await new Promise(resolve => setTimeout(resolve, 500));

            const dummyProfile = {
                id: profileId,
                username: `Пользователь ${profileId}`,
                phone: '+996 555 123 456',
                photo: 'https://via.placeholder.com/100',
                allAds: [ // Full list of ads
                    { id: '1', animal: 'Корова', breed: 'Ангус', price: '200,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '2', animal: 'Лошадь', breed: 'Ахалтекинская', price: '500,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '3', animal: 'Овца', breed: 'Меринос', price: '30,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '4', animal: 'Коза', breed: 'Альпийская', price: '25,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '5', animal: 'Верблюд', breed: 'Бактриан', price: '1,200,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '6', animal: 'Бык', breed: 'Шароле', price: '450,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '7', animal: 'Курица', breed: 'Леггорн', price: '5,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '8', animal: 'Утка', breed: 'Мускусная', price: '7,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '9', animal: 'Гусь', breed: 'Тулузский', price: '12,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '10', animal: 'Кролик', breed: 'Фландр', price: '10,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '11', animal: 'Лама', breed: 'Гуанако', price: '600,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '12', animal: 'Индейка', breed: 'Бронзовая', price: '15,000 KGS', photo: 'https://via.placeholder.com/150' }
                ]
            };

            setProfile(dummyProfile);
            setAllAds(dummyProfile.allAds); // Store all ads
            setAds(dummyProfile.allAds.slice(0, 10)); // Display only first 10
            if (dummyProfile.allAds.length > 10) {
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
            console.log('Fetching own profile...');
            await new Promise(resolve => setTimeout(resolve, 500));

            const dummyOwnProfile = {
                id: user?.id || 'me',
                username: user?.username || 'Мой профиль',
                phone: user?.phone || '+996 777 888 999',
                photo: user?.photo || 'https://via.placeholder.com/100',
                allAds: [ // Full list of ads
                    { id: '1', animal: 'Корова', breed: 'Ангус', price: '200,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '2', animal: 'Лошадь', breed: 'Ахалтекинская', price: '500,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '3', animal: 'Овца', breed: 'Меринос', price: '30,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '4', animal: 'Коза', breed: 'Альпийская', price: '25,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '5', animal: 'Верблюд', breed: 'Бактриан', price: '1,200,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '6', animal: 'Бык', breed: 'Шароле', price: '450,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '7', animal: 'Курица', breed: 'Леггорн', price: '5,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '8', animal: 'Утка', breed: 'Мускусная', price: '7,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '9', animal: 'Гусь', breed: 'Тулузский', price: '12,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '10', animal: 'Кролик', breed: 'Фландр', price: '10,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '11', animal: 'Корова', breed: 'Ангус', price: '200,000 KGS', photo: 'https://via.placeholder.com/150' },
                    { id: '12', animal: 'Лошадь', breed: 'Ахалтекинская', price: '500,000 KGS', photo: 'https://via.placeholder.com/150' },

                ]
            };

            setProfile(dummyOwnProfile);
            setAllAds(dummyOwnProfile.allAds); // Store all ads
            setAds(dummyOwnProfile.allAds.slice(0, 10)); // Display only first 10
            if (dummyOwnProfile.allAds.length > 10) {
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

// Function to replace displayed ads with stored ones
    const restoreAllAds = () => {
        setAds(allAds); // Replace ads with stored ones
        setHasMoreAds(false); // No more ads to load
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
                        <button onClick={() => navigate('/user/edit')}>Изменить профиль</button>
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
