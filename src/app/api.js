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
    return axios.get(`/regauth/user-info/`);
};

export const getUserProfile = async (token) => {
    setAuthToken(token);
    return axios.get('/user/profile')
}
export const getUserAds = async (id,token) => {
    setAuthToken(token);
    return axios.get(`/user/${id}/ads/`);
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

export default {
    getUser,
    loginUserData,
    getArticle,
    getAllArticles,
    contactUs,
};