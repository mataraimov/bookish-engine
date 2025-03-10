import React from 'react';
import './FavoriteAdsPageStyle.css'
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const FavoriteAdsPage = () => {
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
    const itemsPerPage = 7;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const navigate = useNavigate();

    useEffect(() => {
        generateDummyAds();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filter, page, ads]);

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

    const applyFilters = () => {
        let filtered = ads.filter(ad =>
            (filter.animal ? ad.animal.toLowerCase() === filter.animal.toLowerCase() : true) &&
            (filter.breed ? ad.breed.toLowerCase() === filter.breed.toLowerCase() : true) &&
            (filter.minAge ? checkMinAge(ad.age, filter.minAge) : true) &&
            (filter.maxAge ? checkMaxAge(ad.age, filter.maxAge) : true) &&
            (filter.region ? ad.region.toLowerCase() === filter.region.toLowerCase() : true) &&
            (filter.minPrice ? ad.price >= parseInt(filter.minPrice) : true) &&
            (filter.maxPrice ? ad.price <= parseInt(filter.maxPrice) : true)
        );
        setTotalItems(filtered.length);
        const startIndex = (page - 1) * itemsPerPage;
        setFilteredAds(filtered.slice(startIndex, startIndex + itemsPerPage));
    };

    const checkMinAge = (adAge, minAge) => {
        const ageOrder = ["3 months", "6 months", "9 months", "1 year", "1.5 years", "2 years", "3 years", "3+"];
        return ageOrder.indexOf(adAge) >= ageOrder.indexOf(minAge);
    };

    const checkMaxAge = (adAge, maxAge) => {
        const ageOrder = ["3 months", "6 months", "9 months", "1 year", "1.5 years", "2 years", "3 years", "3+"];
        return ageOrder.indexOf(adAge) <= ageOrder.indexOf(maxAge);
    };

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
            <h1>Избранные Обьявления</h1>
            <div>
                <label>
                    Animal:
                    <select value={filter.animal}
                            onChange={e => setFilter({...filter, animal: e.target.value, breed: ""})}>
                        <option value="">All</option>
                        {uniqueValues("animal").map(animal => (
                            <option key={animal} value={animal}>{animal}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Breed:
                    <select value={filter.breed} disabled={!filter.animal}
                            onChange={e => setFilter({...filter, breed: e.target.value})}>
                        <option value="">All</option>
                        {uniqueValues("breed").filter(breed => ads.find(ad => ad.animal === filter.animal && ad.breed === breed)).map(breed => (
                            <option key={breed} value={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Min Age:
                    <select value={filter.minAge} onChange={e => setFilter({...filter, minAge: e.target.value})}>
                        <option value="">Any</option>
                        {["3 months", "6 months", "9 months", "1 year", "1.5 years", "2 years", "3 years", "3+"].map(age => (
                            <option key={age} value={age}>{age}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Max Age:
                    <select value={filter.maxAge} onChange={e => setFilter({...filter, maxAge: e.target.value})}>
                        <option value="">Any</option>
                        {["3 months", "6 months", "9 months", "1 year", "1.5 years", "2 years", "3 years", "3+"].map(age => (
                            <option key={age} value={age}>{age}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Region:
                    <select value={filter.region} onChange={e => setFilter({...filter, region: e.target.value})}>
                        <option value="">All</option>
                        {uniqueValues("region").map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Min Price:
                    <input type="number" value={filter.minPrice}
                           onChange={e => setFilter({...filter, minPrice: e.target.value})}/>
                </label>
                <label>
                    Max Price:
                    <input type="number" value={filter.maxPrice}
                           onChange={e => setFilter({...filter, maxPrice: e.target.value})}/>
                </label>
            </div>
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
    );
};

export default FavoriteAdsPage;
