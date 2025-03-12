// imports
import './AllAdsPageStyle.css'
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {getAllAdsR} from "../../app/tempApi.js";

const AllAdsPage = () => {
    // variables
    const [ads, setAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [filter, setFilter] = useState({
        animal: "",
        breed: "",
        minAge: "",
        maxAge: "",
        region: "",
        minPrice: "",
        maxPrice: ""
    });
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const navigate = useNavigate();

    // UseEffects
    useEffect(() => {
        getAllAds();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filter, page, ads]);

    useEffect(() => {
        setPage(1);
    }, [filter]);

    // Functions
    const getAllAds = async () => {
        const allAds = getAllAdsR();
        setAds(await allAds);
        setFilteredAds(allAds.slice(0, itemsPerPage));
        setTotalItems(allAds.length);
    };

    const applyFilters = () => {
        let filtered = ads.filter(ad =>
            (filter.animal ? ad.animal.toLowerCase() === filter.animal.toLowerCase() : true) &&
            (filter.breed ? ad.breed.toLowerCase() === filter.breed.toLowerCase() : true) &&
            (filter.minAge ? checkMinAge(calculateAgeInMonths(ad.birthDate), filter.minAge, ads) : true) &&
            (filter.maxAge ? checkMaxAge(calculateAgeInMonths(ad.birthDate), filter.maxAge, ads) : true) &&
            (filter.region ? ad.region.toLowerCase() === filter.region.toLowerCase() : true) &&
            (filter.minPrice ? ad.price >= parseInt(filter.minPrice) : true) &&
            (filter.maxPrice ? ad.price <= parseInt(filter.maxPrice) : true)
        );
        setTotalItems(filtered.length);
        const startIndex = (page - 1) * itemsPerPage;
        setFilteredAds(filtered.slice(startIndex, startIndex + itemsPerPage));
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

    const checkMinAge = (adAge, minAge, ads) => {
        const ageOrder = uniqueAges(ads);
        return ageOrder.indexOf(adAge) >= ageOrder.indexOf(minAge);
    };

    const checkMaxAge = (adAge, maxAge, ads) => {
        const ageOrder = uniqueAges(ads);
        return ageOrder.indexOf(adAge) <= ageOrder.indexOf(maxAge);
    };

    const uniqueAges = (ads) => [...new Set(ads.map(ad => calculateAgeInMonths(ad.birthDate)))].sort((a, b) => a - b);

    const uniqueValues = (key) => [...new Set(ads.map(ad => ad[key]))];

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

    // Page
    return (
        <div>
            <h1>Все Объявления</h1>
            <div>
                <label>
                    Животное:
                    <select value={filter.animal}
                            onChange={e => setFilter({...filter, animal: e.target.value, breed: ""})}>
                        <option value="">Любое</option>
                        {uniqueValues("animal").map(animal => (
                            <option key={animal} value={animal}>{animal}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Порода:
                    <select value={filter.breed} disabled={!filter.animal}
                            onChange={e => setFilter({...filter, breed: e.target.value})}>
                        <option value="">Любая</option>
                        {uniqueValues("breed").filter(breed => ads.find(ad => ad.animal === filter.animal && ad.breed === breed)).map(breed => (
                            <option key={breed} value={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Возраст от:
                    <select value={filter.minAge}
                        onChange={e => setFilter({...filter, minAge: Number(e.target.value)})}>
                        <option value="">-</option>
                        {uniqueAges(ads).map(age => (
                            <option key={age} value={age}>{age} месяцев</option>
                        ))}
                    </select>
                </label>
                <label>
                    до:
                    <select value={filter.maxAge}
                        onChange={e => setFilter({...filter, maxAge: Number(e.target.value)})}>
                        <option value="">-</option>
                        {uniqueAges(ads).map(age => (
                            <option key={age} value={age}>{age} месяцев</option>
                        ))}
                    </select>
                </label>
                <label>
                    Регион:
                    <select value={filter.region} onChange={e => setFilter({...filter, region: e.target.value})}>
                        <option value="">Все</option>
                        {uniqueValues("region").map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Цена от:
                    <input type="number" value={filter.minPrice}
                           onChange={e => setFilter({...filter, minPrice: e.target.value})}/>
                </label>
                <label>
                    до:
                    <input type="number" value={filter.maxPrice}
                           onChange={e => setFilter({...filter, maxPrice: e.target.value})}/>
                </label>
            </div>
            <div>
                {filteredAds.map((ad) => (
                    <div key={ad.id} onClick={() => navigate(`/ad/${ad.id}`)} style={{cursor: "pointer"}}>
                        <img src={ad.photoUrl} alt={ad.breed}/>
                        <h2>{ad.breed} ({ad.animal})</h2>
                        <p>Возраст: {calculateAgeInMonths(ad.birthDate)} Месяцев ({calculateAgeInYears(calculateAgeInMonths(ad.birthDate))})</p>
                        <p>Регион: {ad.region}</p>
                        <p>Цена: {ad.price} сом</p>
                    </div>
                ))}
            </div>
            <button onClick={handlePrevPage} disabled={page === 1}>Назад</button>
            <p>{page}/{totalPages} </p>
            <button onClick={handleNextPage} disabled={page * itemsPerPage >= totalItems}>Вперед</button>
        </div>
    );
};
export default AllAdsPage;