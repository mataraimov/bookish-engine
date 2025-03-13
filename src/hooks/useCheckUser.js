import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App.jsx";
import {getUserR} from "../app/tempApi.js";

export const useCheckUser = () => {
    const [, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const access = localStorage.getItem('access_token');
            if (access) {
                try {
                    const response = await getUserR(access);
                    setUser(response.data);
                } catch (error) {
                    console.error('Ошибка:', error.message);
                    localStorage.removeItem('access_token');
                    navigate('/login/sign-in');
                }
            } else {
                navigate('/login/register');
            }
        };

        checkUser();
    }, [navigate, setUser]);
};
