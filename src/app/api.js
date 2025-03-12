import axios from 'axios';

axios.defaults.baseURL = 'http://217.151.230.35:888/api/v1/';

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
export const getNewMessagesCountR = async (token) => {
    setAuthToken(token);
    return axios.get('/user/messages')
}

export const getUserNotificationsR = async (token) => {
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

export const fetchTopAdsR = async ()=>{
    return axios.get(`/ad/top-ads`)
}
export const sendPasswordResetR = async (formData) => {
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