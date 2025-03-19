// ad related requests
export const fetchTopAdsR = async () => {
    return {
        data:[
            { id: '1', animal: 'Корова', breed: 'Ангус', price: '200,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
            { id: '2', animal: 'Лошадь', breed: 'Ахалтекинская', price: '500,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
            { id: '3', animal: 'Овца', breed: 'Меринос', price: '30,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
            { id: '4', animal: 'Коза', breed: 'Альпийская', price: '25,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
            { id: '5', animal: 'Верблюд', breed: 'Бактриан', price: '1,200,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
            { id: '6', animal: 'Бык', breed: 'Шароле', price: '450,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
            { id: '7', animal: 'Курица', breed: 'Леггорн', price: '5,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
            { id: '8', animal: 'Утка', breed: 'Мускусная', price: '7,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
            { id: '9', animal: 'Гусь', breed: 'Тулузский', price: '12,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
            { id: '10', animal: 'Кролик', breed: 'Фландр', price: '10,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
            { id: '11', animal: 'Лама', breed: 'Гуанако', price: '600,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
            { id: '12', animal: 'Индейка', breed: 'Бронзовая', price: '15,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' }
        ],
        status:200,
    }
}


// 2025-12-23
// Year-MM-DD
export const getAllAdsR = async () => {
    const regions = ["Город Бишкек", "Город Ош", "Чуйская Область", "Таласская Область", "Нарынская Область", "Иссык-Кульская Область", "Жалал-Абадская область", "Баткенская Область", "Ошская Область"];
    const getRandomBirthDate = () => {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setFullYear(today.getFullYear() - Math.floor(Math.random() * 5));
        pastDate.setMonth(today.getMonth() - Math.floor(Math.random() * 12));
        return pastDate.toISOString();
    };
    return Array.from({length: 60}, (_, i) => ({
        id: i + 1,
        animal: i % 2 === 0 ? "Корова" : "Лошадь",
        breed: i % 2 === 0 ? "Ангус" : "Арабская",
        birthDate: getRandomBirthDate(),
        region: regions[i % regions.length],
        price: 30000 + (i * 2000),
        photoUrl: `https://example.com/photos/animal${i + 1}.jpg`,
    }));
};
export const getFavoriteAdsR = async (token) => {
    console.log(token)
    const regions = ["Город Бишкек", "Город Ош", "Чуйская Область", "Таласская Область", "Нарынская Область", "Иссык-Кульская Область", "Жалал-Абадская область", "Баткенская Область", "Ошская Область"];
    const getRandomBirthDate = () => {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setFullYear(today.getFullYear() - Math.floor(Math.random() * 5));
        pastDate.setMonth(today.getMonth() - Math.floor(Math.random() * 12));
        return pastDate.toISOString();
    };
    return Array.from({length: 60}, (_, i) => ({
        id: i + 1,
        animal: i % 2 === 0 ? "Корова" : "Лошадь",
        breed: i % 2 === 0 ? "Ангус" : "Арабская",
        birthDate: getRandomBirthDate(),
        region: regions[i % regions.length],
        price: 30000 + (i * 2000),
        photoUrl: `https://example.com/photos/animal${i + 1}.jpg`,
    }));
}
export const getUserAdsR = async (token) => {
    console.log(token)
    const regions = ["Город Бишкек", "Город Ош", "Чуйская Область", "Таласская Область", "Нарынская Область", "Иссык-Кульская Область", "Жалал-Абадская область", "Баткенская Область", "Ошская Область"];
    const getRandomBirthDate = () => {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setFullYear(today.getFullYear() - Math.floor(Math.random() * 5));
        pastDate.setMonth(today.getMonth() - Math.floor(Math.random() * 12));
        return pastDate.toISOString();
    };
    return Array.from({length: 60}, (_, i) => ({
        id: i + 1,
        animal: i % 2 === 0 ? "Корова" : "Лошадь",
        breed: i % 2 === 0 ? "Ангус" : "Арабская",
        birthDate: getRandomBirthDate(),
        region: regions[i % regions.length],
        price: 30000 + (i * 2000),
        photoUrl: `https://example.com/photos/animal${i + 1}.jpg`,
    }));
}
export const getAdR = async (id,token) =>{
    console.log(id,token)
    return {
        status:200,
        data:{
            id: id,
            animal: "Лошадь",
            breed: "Корейская Коротка",
            age: "2014-02-31",
            region: "Город Бишкек",
            description: "Продаю корейскую лошадь коротку",
            seller: {
                id: "2012",
                name: "человек",
                phone: "0706182355",
                profilePic: null,
            },
            photos: [],
        }
    }
}
export const updateAdR = async (adId,token,formData) => {
    console.log(adId, token, formData);
    return {
        status:200,
    }
}
export const postAdR = async (token,formData)=>{
    console.log(token,formData)
    return {
        status:200,
    }
}


// other get requests
export const getAnimalsListR = async (token) => {
    console.log(token)
    return {
        data:["Корова", "Овца", "Курица", "Осел", "Лошадь"],
        status:200,
    }
}
export const getNewMessagesCountR = async (token) => {
    console.log(token)
    return {
        status:200,
        data:[
            
        ]
    }
}
export const getUserNotificationsR = async (token) => {
    console.log(token);
    return {
        status:200,
        data:[
            {
                message:'у одного из ваших избранных объявлений изменилась цена',
                ad: 'Продаю Корова Ангус 40000 сом',
                link:'ad/1',
            },{
                message: 'ваш аккаунт был подтвержден',
            },{
                message: 'у вашего аккаунта был изменен пароль, если это были не вы измените его',
                ad:'профиль',
                link: 'user/change',
            }
        ]
    }
}


// login related requests
export const loginUserR = async (formdata) => {
    console.log(formdata)
    return {
        status:200,
        data:{
            token:'afe68a613b28cce68333f9355282f727645fb38c',
        }
    }
}
export const registerUserR = async (formData)=>{
    console.log(formData)
    return{
        status:200,
    }
}
export const sendPasswordResetR = async (formdata) => {
    console.log(formdata)
    return {
        status:200,
    }
}


// profile related requests
export const updateUserProfileR = async (token, formData) => {
    console.log(token,formData)
    return {
        status:200,
    }
}
export const getUserR = async (token)=>{
    console.log(token)
    return {
        status:200,
        data:{
            id: 1,
            username: `Пользователь Вы`,
            phone: '+996 555 123 456',
            photo: 'https://via.placeholder.com/100',
            all_ads: [
                { id: '1', animal: 'Корова', breed: 'Ангус', price: '200,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                { id: '2', animal: 'Лошадь', breed: 'Ахалтекинская', price: '500,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                { id: '3', animal: 'Овца', breed: 'Меринос', price: '30,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                { id: '4', animal: 'Коза', breed: 'Альпийская', price: '25,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                { id: '5', animal: 'Верблюд', breed: 'Бактриан', price: '1,200,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                { id: '6', animal: 'Бык', breed: 'Шароле', price: '450,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                { id: '7', animal: 'Курица', breed: 'Леггорн', price: '5,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                { id: '8', animal: 'Утка', breed: 'Мускусная', price: '7,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                { id: '9', animal: 'Гусь', breed: 'Тулузский', price: '12,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                { id: '10', animal: 'Кролик', breed: 'Фландр', price: '10,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                { id: '11', animal: 'Лама', breed: 'Гуанако', price: '600,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                { id: '12', animal: 'Индейка', breed: 'Бронзовая', price: '15,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' }
            ]
        }
    }
}
export const getUserByIdR = async (id,token)=>{
    console.log(id,token)
    return{
        status:200,
        data:{
                id: '1',
                username: `Пользователь ManEater55`,
                phone: '+996 555 123 456',
                photo: 'https://via.placeholder.com/100',
                all_ads: [
                    { id: '1', animal: 'Корова', breed: 'Ангус', price: '200,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                    { id: '2', animal: 'Лошадь', breed: 'Ахалтекинская', price: '500,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                    { id: '3', animal: 'Овца', breed: 'Меринос', price: '30,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                    { id: '4', animal: 'Коза', breed: 'Альпийская', price: '25,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                    { id: '5', animal: 'Верблюд', breed: 'Бактриан', price: '1,200,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                    { id: '6', animal: 'Бык', breed: 'Шароле', price: '450,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                    { id: '7', animal: 'Курица', breed: 'Леггорн', price: '5,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                    { id: '8', animal: 'Утка', breed: 'Мускусная', price: '7,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                    { id: '9', animal: 'Гусь', breed: 'Тулузский', price: '12,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                    { id: '10', animal: 'Кролик', breed: 'Фландр', price: '10,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                    { id: '11', animal: 'Лама', breed: 'Гуанако', price: '600,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' },
                    { id: '12', animal: 'Индейка', breed: 'Бронзовая', price: '15,000 KGS', photo: 'https://t3.ftcdn.net/jpg/03/26/50/04/360_F_326500445_ZD1zFSz2cMT1qOOjDy7C5xCD4shawQfM.jpg' }
                ],
        },
    }
}


// chat related requests (in progress)
export const getChatIdR = async (id,token) => {
    console.log(id,token)
    return{
        status:200,
        data:{
            chat_id:'d8ec3b207b905f39dfc52895c7787a831909e51a',
        }
    }
}