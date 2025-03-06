import {Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home/HomePage.jsx';
import AllAdsPage from "../pages/allads/AllAdsPage.jsx";
import ChangeAdPage from "../pages/changead/ChangeAdPage.jsx";
import EmailPage from "../pages/email/EmailPage.jsx";
import LoginPage from "../pages/login/LoginPage.jsx";
import OneAdPage from "../pages/onead/OneAdPage.jsx";
import PostAdPage from "../pages/postad/PostAdPage.jsx";
import ProfilePage from "../pages/profile/ProfilePage.jsx";
import RegisterPage from "../pages/register/RegisterPage.jsx";
import ForgotPage from "../pages/forgot/ForgotPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import ChangeProfilePage from "../pages/changeprofile/ChangeProfilePage.jsx";
import ChatPage from "../pages/chat/ChatPage.jsx";
import FavoriteAdsPage from "../pages/favoriteads/FavoriteAdsPage.jsx";
import UserAdsPage from "../pages/userads/UserAdsPage.jsx";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ad/:id" element={<OneAdPage />} />
            <Route path="/ad/all-ads" element={<AllAdsPage />} />
            <Route path="/ad/my-ads" element={<UserAdsPage />} />
            <Route path="/ad/favorites" element={<FavoriteAdsPage />} />
            <Route path="/ad/post" element={<PostAdPage />} />
            <Route path="/ad/change/:id" element={<ChangeAdPage />} />
            <Route path="/login/sign-in" element={<LoginPage />} />
            <Route path="/login/register" element={<RegisterPage />} />
            <Route path="/login/confirm-email" element={<EmailPage />} />
            <Route path="/login/forgot-password" element={<ForgotPage />} />
            <Route path="/user/" element={<ProfilePage />} />
            <Route path="/user/:id" element={<ProfilePage />} />
            <Route path="/user/change" element={<ChangeProfilePage />} />
            <Route path="/chat/" element={<ChatPage />} />
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default Routers