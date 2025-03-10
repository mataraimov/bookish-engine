import axios from 'axios';

// Базовый URL для всех запросов
axios.defaults.baseURL = 'http://217.151.230.35:888/api/v1/';

// Функция для установки токена авторизации в заголовок запроса
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const loginUserData = (userData) => {
    return axios.post('/register/register/', userData);
};
export const getNewMessagesCount = async (token) => {
    setAuthToken(token);
    return axios.get('/user/messages')
}

export const getUserNotifications = async (token) => {
    setAuthToken(token);
    return axios.get('/user/notifications')
}
export const getUser = (token) => {
    setAuthToken(token);
    return axios.get(`/login/`);
};
export const loginUser = () => {
    return axios.get(`/login/sign-in`);
};
export const registerUser = (userData) => {
    return axios.post('/login/register', userData);
}

export const getUserProfile = async (token) => {
    setAuthToken(token);
    return axios.get('/user/profile')
}
export const getUserAds = async (id,token) => {
    setAuthToken(token);
    return axios.get(`/user/${id}/ads/`);
}

export const updateUserProfile = async (token, formData) => {
    setAuthToken(token);
    return axios.patch(`/user/change`, formData)
}

export const getChatId = (id,token) => {
    setAuthToken(token);
    return axios.get(`/chat/chat/${id}`);
}

export const getAllArticles = (token) => {
    setAuthToken(token)
    return axios.get(`/article/get-all-articles/`)
};

export const getArticle = async (token,id) => {
    setAuthToken(token)
    return axios.get(`/article/get-article/${id}`)
};

export const contactUs = (token, formData) => {
    setAuthToken(token)
    return axios.post('/contact/', formData)
}
export const postAd =  (token,formData) => {
    setAuthToken(token);
    return axios.post(`/ad/post`, formData)
}

export const getAdById = async (id, token) => {
    setAuthToken(token);
    const tempanimal = {
        animal: '',
        breed: '',
        age: '',
        price: '',
        description: '',
        photos: [],
    }
    return tempanimal
    // return axios.get(`/ad/${id}`)
}

export const fetchTopAds = async ()=>{
    // return axios.get(`/ad/top-ads`)
    return [
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
}
export const sendPasswordReset = async (formData) => {
    return axios.post(`/login/forgot-password`, formData)
}

export const getAnimalsList = async () => {
    // setAuthToken(token);
    // return axios.get('/ad/get-animals-list')
    return ["Lion", "Elephant", "Tiger", "Giraffe", "Zebra"];
}
export const updateAd = async (id, formData,token) => {
    setAuthToken(token);
    return axios.patch(`/ad/change/${id}`, formData)
}