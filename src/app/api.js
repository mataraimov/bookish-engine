import axios from 'axios';

axios.defaults.baseURL = 'http://217.151.230.35:888/api/v1/';

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};


// ad related requests
export const fetchTopAdsRequest = async () => {
    return axios.get('/ad/top-ads');
}
export const getAllAdsRequest = async () => {
    return axios.get('/ad/all-ads');
}
export const getFavoriteAdsRequest = async (token) => {
    setAuthToken(token);
    return axios.get('/ad/favorite-ads');
}
export const getUserAdsRequest = async (token) => {
    setAuthToken(token);
    return axios.get('/ad/user-ads');
}
export const getAdRequest = async (id,token) => {
    setAuthToken(token);
    return axios.get(`/ad/${id}`);
}
export const updateAdRequest = async (id,token,formData) => {
    setAuthToken(token);
    return axios.put(`/ad/change/${id}`, formData);
}
export const postAdRequest = async (token,formData) => {
    setAuthToken(token);
    return axios.post(`/ad/post`, formData);
}


//other get requests
export const getAnimalsListRequest = async (token) => {
    setAuthToken(token);
    return axios.get(`/ad/animals-list`);
}
export const getNewMessagesCountRequest = async (token) => {
    setAuthToken(token);
    return axios.get(`/user/messages`);
}
export const getUserNotificationsRequest = async (token) => {
    setAuthToken(token);
    return axios.get(`/user/notifications`);
}


//login related requests
export const loginUserRequest = async (formData)=>{
    return axios.post(`/login/sign-in`, formData);
}
export const registerUserRequest = async (formData) => {
    return axios.post(`/login/register`, formData);
}
export const sendPasswordResetRequest = async (formData)=>{
    return axios.post(`/login/forgot-password`, formData);
}


//profile related requests
export const updateUserProfileRequest = async (token, formData) => {
    setAuthToken(token);
    return axios.put(`/user/change`, formData);
}
export const getUserRequest = async (token)=>{
    setAuthToken(token);
    return axios.get('user/profile')
}
export const getUserByIdRequest = async (id,token)=>{
    setAuthToken(token);
    return axios.get(`/user/${id}`);
}


//chat related requests (in progress)
export const getChatIdRequest = async (id,token)=>{
    setAuthToken(token);
    return axios.get(`/chat/get-chat/${id}`);
}